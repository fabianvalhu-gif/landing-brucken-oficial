import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { supabase } from "../../lib/supabase";
import IntranetLayout from "../../components/intranet/IntranetLayout";
import DealCard from "../../components/intranet/DealCard";
import StageColumn from "../../components/intranet/StageColumn";
import PageHeader from "../../components/intranet/PageHeader";

const labelOptions = [
  { id: "prioridad", label: "Prioridad", color: "bg-red-100 text-red-600" },
  { id: "demo", label: "Demo agendada", color: "bg-electric/20 text-electric" },
  { id: "expansion", label: "Expansión", color: "bg-emerald-100 text-emerald-600" },
  { id: "software", label: "Software Factory", color: "bg-purple-100 text-purple-600" },
  { id: "representacion", label: "Representación", color: "bg-sand text-petrol" },
];

export default function Pipeline() {
  const navigate = useNavigate();
  const [stages, setStages] = useState([]);
  const [deals, setDeals] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState(null);
  const [showNewDealModal, setShowNewDealModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    company_id: "",
    contact_id: "",
    stage_id: "",
    value: "",
    currency: "USD",
    expected_close_date: "",
    probability: "",
    notes: "",
    labels: [],
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Cargar stages
      const { data: stagesData, error: stagesError } = await supabase
        .from("stages")
        .select("*")
        .order("position");

      if (stagesError) throw stagesError;

      // Cargar deals con relaciones
      const { data: dealsData, error: dealsError } = await supabase
        .from("deals")
        .select(`
          *,
          company:companies(id, name),
          contact:contacts(id, first_name, last_name)
        `)
        .eq("status", "open")
        .order("created_at", { ascending: false });

      if (dealsError) throw dealsError;

      // Cargar companies para select
      const { data: companiesData, error: companiesError } = await supabase
        .from("companies")
        .select("id, name")
        .order("name");

      if (companiesError) throw companiesError;

      // Cargar contacts para select
      const { data: contactsData, error: contactsError } = await supabase
        .from("contacts")
        .select("id, first_name, last_name, company_id")
        .order("first_name");

      if (contactsError) throw contactsError;

      setStages(stagesData || []);
      setDeals(
        (dealsData || []).map((deal) => ({
          ...deal,
          labels: deal.labels || [],
        }))
      );
      setCompanies(companiesData || []);
      setContacts(contactsData || []);
      
      // Set default stage if available
      if (stagesData && stagesData.length > 0 && !formData.stage_id) {
        setFormData(prev => ({ ...prev, stage_id: stagesData[0].id }));
      }
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeDeal = deals.find((d) => d.id === active.id);
    const overStageId = over.id;

    if (activeDeal && activeDeal.stage_id !== overStageId) {
      setDeals((deals) =>
        deals.map((deal) =>
          deal.id === active.id ? { ...deal, stage_id: overStageId } : deal
        )
      );
    }
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const deal = deals.find((d) => d.id === active.id);
    const newStageId = over.id;

    if (deal && deal.stage_id !== newStageId) {
      // Actualizar en Supabase
      const { error } = await supabase
        .from("deals")
        .update({ stage_id: newStageId, updated_at: new Date().toISOString() })
        .eq("id", deal.id);

      if (error) {
        console.error("Error updating deal:", error);
        // Revertir cambio en caso de error
        loadData();
      }
    }
  };

  const getDealsByStage = (stageId) => {
    return deals.filter((deal) => deal.stage_id === stageId);
  };

  const getStageTotal = (stageId) => {
    const stageDeals = getDealsByStage(stageId);
    return stageDeals.reduce((sum, deal) => sum + (deal.value || 0), 0);
  };

  const handleSubmitDeal = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dataToSave = {
        ...formData,
        value: formData.value ? parseFloat(formData.value) : 0,
        probability: formData.probability ? parseInt(formData.probability) : 0,
        pipeline_id: stages[0]?.pipeline_id, // Usar el pipeline del primer stage
        labels: formData.labels,
      };

      const { error } = await supabase.from("deals").insert([dataToSave]);

      if (error) throw error;

      await loadData();
      closeModal();
    } catch (error) {
      console.error("Error creating deal:", error);
      alert("Error al crear oportunidad: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowNewDealModal(false);
    setFormData({
      title: "",
      company_id: "",
      contact_id: "",
      stage_id: stages[0]?.id || "",
      value: "",
      currency: "USD",
      expected_close_date: "",
      probability: "",
      notes: "",
      labels: [],
    });
  };

  const filteredContacts = formData.company_id
    ? contacts.filter((c) => c.company_id === formData.company_id)
    : contacts;

  const toggleLabel = (labelId) => {
    setFormData((prev) => {
      const exists = prev.labels.includes(labelId);
      return {
        ...prev,
        labels: exists ? prev.labels.filter((l) => l !== labelId) : [...prev.labels, labelId],
      };
    });
  };

  const activeDeal = deals.find((d) => d.id === activeId);

  if (loading) {
    return (
      <IntranetLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Cargando pipeline...</p>
          </div>
        </div>
      </IntranetLayout>
    );
  }

  const totalValue = deals.reduce((sum, d) => sum + (d.value || 0), 0);
  const avgTicket = deals.length ? Math.round(totalValue / deals.length) : 0;
  const activeCompanies = new Set(deals.map((d) => d.company?.name).filter(Boolean)).size;
  const heroStats = [
    { label: "Valor total", value: `$${totalValue.toLocaleString()}` },
    { label: "Ticket promedio", value: `$${avgTicket.toLocaleString()}` },
    { label: "Empresas activas", value: activeCompanies },
  ];

  return (
    <IntranetLayout>
      <PageHeader
        title="Pipeline de ventas"
        subtitle="Visualiza etapas, revenue y prioridades; arrastra oportunidades entre columnas."
        badge="Ventas"
        meta={heroStats.map((s) => ({ ...s, icon: "📌" }))}
        actions={[
          { label: "Nueva oportunidad", onClick: () => setShowNewDealModal(true), icon: "➕", variant: "primary" },
          { label: "Boards por cliente", to: "/intranet/boards", icon: "🗂️" },
        ]}
      />

      <div className="space-y-6">
        <div className="crm-card p-5 lg:p-6 flex flex-wrap items-center gap-3">
          <span className="crm-tag bg-electric/10 text-electric border-electric/20">
            {deals.length} oportunidades activas
          </span>
          <div className="flex gap-2 flex-wrap">
            {stages.map((stage) => (
              <span
                key={stage.id}
                className="crm-tag bg-white/70 border-neutral-200 text-neutral-700"
              >
                {stage.name}
              </span>
            ))}
          </div>
        </div>

        {/* Pipeline Kanban */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="crm-card p-3 lg:p-4">
            <div className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2 snap-x snap-mandatory">
              {stages.map((stage) => {
                const stageDeals = getDealsByStage(stage.id);
                const stageTotal = getStageTotal(stage.id);

                return (
                  <StageColumn
                    key={stage.id}
                    stage={stage}
                    deals={stageDeals}
                    total={stageTotal}
                  />
                );
              })}
            </div>
          </div>

          <DragOverlay>
            {activeId && activeDeal ? <DealCard deal={activeDeal} isDragging /> : null}
          </DragOverlay>
        </DndContext>

        {/* Stats Footer */}
        <div className="crm-card p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stages.slice(0, 4).map((stage) => {
            const stageDeals = getDealsByStage(stage.id);
            const stageTotal = getStageTotal(stage.id);
            return (
              <div key={stage.id} className="bg-white rounded-2xl shadow-soft border border-neutral-100 p-4">
                <p className="text-sm text-neutral-500 mb-1">{stage.name}</p>
                <p className="text-2xl font-bold text-petrol">{stageDeals.length}</p>
                <p className="text-sm text-electric font-semibold">${stageTotal.toLocaleString()}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal Nueva Oportunidad */}
      <AnimatePresence>
        {showNewDealModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 sm:p-8 max-w-full sm:max-w-xl md:max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                <span>🎯</span> Nueva Oportunidad de Negocio
              </h2>

              <form onSubmit={handleSubmitDeal} className="space-y-6">
                {/* SECCIÓN: INFORMACIÓN BÁSICA */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span>📋</span> Información Básica
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Título de la Oportunidad *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900"
                        placeholder="ej: Implementación CRM - Empresa XYZ"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Empresa *
                        </label>
                        <select
                          required
                          value={formData.company_id}
                          onChange={(e) => setFormData({ ...formData, company_id: e.target.value, contact_id: "" })}
                          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900"
                        >
                          <option value="">Seleccionar empresa</option>
                          {companies.map((company) => (
                            <option key={company.id} value={company.id}>
                              {company.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Contacto
                        </label>
                        <select
                          value={formData.contact_id}
                          onChange={(e) => setFormData({ ...formData, contact_id: e.target.value })}
                          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900"
                          disabled={!formData.company_id}
                        >
                          <option value="">Sin contacto</option>
                          {filteredContacts.map((contact) => (
                            <option key={contact.id} value={contact.id}>
                              {contact.first_name} {contact.last_name}
                            </option>
                          ))}
                        </select>
                        {!formData.company_id && (
                          <p className="text-xs text-gray-500 mt-1">
                            Selecciona una empresa primero
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECCIÓN: DETALLES COMERCIALES */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span>💰</span> Detalles Comerciales
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Valor del Negocio *
                        </label>
                        <input
                          type="number"
                          required
                          min="0"
                          step="0.01"
                          value={formData.value}
                          onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900"
                          placeholder="100000"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Moneda
                        </label>
                        <select
                          value={formData.currency}
                          onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900"
                        >
                          <option value="USD">USD ($)</option>
                          <option value="CLP">CLP ($)</option>
                          <option value="EUR">EUR (€)</option>
                          <option value="GBP">GBP (£)</option>
                          <option value="MXN">MXN ($)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Etapa del Pipeline *
                        </label>
                        <select
                          required
                          value={formData.stage_id}
                          onChange={(e) => setFormData({ ...formData, stage_id: e.target.value })}
                          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900"
                        >
                          {stages.map((stage) => (
                            <option key={stage.id} value={stage.id}>
                              {stage.name} ({stage.probability}%)
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Probabilidad de Cierre (%)
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={formData.probability}
                          onChange={(e) => setFormData({ ...formData, probability: e.target.value })}
                          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900"
                          placeholder="50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fecha Estimada de Cierre
                      </label>
                      <input
                        type="date"
                        value={formData.expected_close_date}
                        onChange={(e) => setFormData({ ...formData, expected_close_date: e.target.value })}
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900"
                      />
                    </div>
                  </div>
                </div>

                {/* SECCIÓN: ETIQUETAS */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span>🏷️</span> Etiquetas de color
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    Usa etiquetas para resaltar prioridades, iniciativas o squads responsables.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {labelOptions.map((tag) => {
                      const isActive = formData.labels.includes(tag.id);
                      return (
                        <button
                          key={tag.id}
                          type="button"
                          onClick={() => toggleLabel(tag.id)}
                          className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                            isActive
                              ? `${tag.color} border-transparent shadow-soft`
                              : "bg-white border-gray-200 text-gray-500 hover:border-gray-400"
                          }`}
                        >
                          {tag.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* SECCIÓN: NOTAS */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span>📝</span> Notas y Observaciones
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Detalles de la Oportunidad
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      rows="4"
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900 resize-none"
                      placeholder="Requisitos específicos, próximos pasos, información relevante..."
                    />
                  </div>
                </div>

                {/* BOTONES */}
                <div className="flex gap-3 pt-4 border-t border-gray-300">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-6 py-3 rounded-full bg-electric text-white font-semibold shadow-soft hover:bg-petrol transition-colors disabled:opacity-60"
                  >
                    {loading ? "Creando..." : "Crear Oportunidad"}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-6 py-3 rounded-full bg-neutral-100 text-neutral-600 font-semibold hover:bg-neutral-200 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </IntranetLayout>
  );
}
