import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../lib/supabase";
import IntranetLayout from "../../components/intranet/IntranetLayout";
import DetailsSidebar from "../../components/intranet/DetailsSidebar";

export default function Companies() {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);

  const [formData, setFormData] = useState({
    // Información Básica
    name: "",
    legal_name: "",
    industry: "",
    company_type: "",
    founded_year: "",
    // Legal & Tax
    tax_id: "",
    // Contacto
    website: "",
    phone: "",
    email: "",
    primary_contact_name: "",
    primary_contact_email: "",
    primary_contact_phone: "",
    // Dirección
    address: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    // Información Empresarial
    employees_count: "",
    annual_revenue: "",
    // Redes Sociales
    linkedin_url: "",
    twitter_url: "",
    facebook_url: "",
    // Adicionales
    tags: "",
    notes: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const shouldCreatePrimaryContact = () =>
    formData.primary_contact_name || formData.primary_contact_email || formData.primary_contact_phone;

  const createPrimaryContactForCompany = async (companyRecord) => {
    if (!companyRecord || !shouldCreatePrimaryContact()) return;

    const rawName = formData.primary_contact_name?.trim() || companyRecord.primary_contact_name?.trim() || "";
    const [firstName, ...rest] = rawName.length ? rawName.split(" ") : ["Contacto"];
    const lastName = rest.join(" ") || companyRecord.name || "Brucken";

    const payload = {
      company_id: companyRecord.id,
      first_name: firstName || "Contacto",
      last_name,
      email: formData.primary_contact_email || companyRecord.email || null,
      phone: formData.primary_contact_phone || companyRecord.phone || null,
      position: "Contacto Principal",
      preferred_contact_method: "email",
      tags: ["primary-contact"],
    };

    try {
      const { error } = await supabase.from("contacts").insert([payload]);
      if (error) {
        console.error("Error creating linked contact:", error);
      }
    } catch (contactError) {
      console.error("Linked contact creation exception:", contactError);
    }
  };

  const loadData = async () => {
    try {
      const { data, error } = await supabase
        .from("companies")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setCompanies(data || []);
    } catch (error) {
      console.error("Error loading companies:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dataToSave = {
        ...formData,
        employees_count: formData.employees_count ? parseInt(formData.employees_count) : null,
        annual_revenue: formData.annual_revenue ? parseFloat(formData.annual_revenue) : null,
        founded_year: formData.founded_year ? parseInt(formData.founded_year) : null,
        tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(t => t) : [],
      };

      if (editingCompany) {
        const { error } = await supabase
          .from("companies")
          .update(dataToSave)
          .eq("id", editingCompany.id);

        if (error) throw error;
      } else {
        const { data: createdCompany, error } = await supabase
          .from("companies")
          .insert([dataToSave])
          .select()
          .single();

        if (error) throw error;

        await createPrimaryContactForCompany(createdCompany);
      }

      await loadData();
      closeModal();
    } catch (error) {
      console.error("Error saving company:", error);
      alert("Error al guardar empresa: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Estás seguro de eliminar esta empresa?")) return;

    try {
      const { error } = await supabase.from("companies").delete().eq("id", id);

      if (error) throw error;

      await loadData();
    } catch (error) {
      console.error("Error deleting company:", error);
      alert("Error al eliminar empresa: " + error.message);
    }
  };

  const openModal = (company = null) => {
    if (company) {
      setEditingCompany(company);
      setFormData({
        name: company.name || "",
        legal_name: company.legal_name || "",
        industry: company.industry || "",
        company_type: company.company_type || "",
        founded_year: company.founded_year || "",
        tax_id: company.tax_id || "",
        website: company.website || "",
        phone: company.phone || "",
        email: company.email || "",
        primary_contact_name: company.primary_contact_name || "",
        primary_contact_email: company.primary_contact_email || "",
        primary_contact_phone: company.primary_contact_phone || "",
        address: company.address || "",
        city: company.city || "",
        state: company.state || "",
        postal_code: company.postal_code || "",
        country: company.country || "",
        employees_count: company.employees_count || "",
        annual_revenue: company.annual_revenue || "",
        linkedin_url: company.linkedin_url || "",
        twitter_url: company.twitter_url || "",
        facebook_url: company.facebook_url || "",
        tags: company.tags ? company.tags.join(', ') : "",
        notes: company.notes || "",
      });
    } else {
      setEditingCompany(null);
      setFormData({
        name: "",
        legal_name: "",
        industry: "",
        company_type: "",
        founded_year: "",
        tax_id: "",
        website: "",
        phone: "",
        email: "",
        primary_contact_name: "",
        primary_contact_email: "",
        primary_contact_phone: "",
        address: "",
        city: "",
        state: "",
        postal_code: "",
        country: "",
        employees_count: "",
        annual_revenue: "",
        linkedin_url: "",
        twitter_url: "",
        facebook_url: "",
        tags: "",
        notes: "",
      });
    }
    setShowModal(true);
    setShowSidebar(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCompany(null);
  };

  const openSidebar = (company) => {
    setSelectedCompany(company);
    setShowSidebar(true);
  };

  const filteredCompanies = companies.filter((company) =>
    `${company.name} ${company.industry || ""} ${company.city || ""}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  if (loading && companies.length === 0) {
    return (
      <IntranetLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Cargando empresas...</p>
          </div>
        </div>
      </IntranetLayout>
    );
  }

  return (
    <IntranetLayout>
  {/* Hero + KPIs */}
  <div className="grid gap-6 md:grid-cols-[2fr,1fr] lg:grid-cols-[2.2fr,1fr] mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="stat-card relative overflow-hidden"
        >
          <div className="max-w-xl">
            <p className="text-sm uppercase tracking-[0.5em] text-neutral-400">Representación LATAM</p>
            <h1 className="text-4xl font-semibold text-petrol mt-3 mb-4 leading-tight">
              Directorio corporativo de clientes y aliados estratégicos.
            </h1>
            <p className="text-neutral-500">
              Gestiona expansión, gobernanza y playbooks comerciales desde un único panel inspirado en firmas consultoras.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() => openModal()}
              className="cta-button cta-button-primary text-sm"
            >
              + Nueva Empresa
            </button>
            <button
              onClick={() => navigate("/intranet/contacts")}
              className="cta-button cta-button-outline text-sm"
            >
              Contactos vinculados
            </button>
          </div>
          <div className="absolute -right-12 top-0 h-48 w-48 bg-electric/10 rounded-full blur-3xl" />
        </motion.div>

        <div className="grid gap-4">
          {[
            { label: "Empresas activas", value: filteredCompanies.length, badge: "+5 este mes" },
            {
              label: "Con contacto primario",
              value: companies.filter((c) => c.primary_contact_email).length,
              badge: "Listas para outreach",
            },
            {
              label: "Ingresos reportados",
              value: `$${companies.reduce((sum, c) => sum + (c.annual_revenue || 0), 0).toLocaleString()}`,
              badge: "Forecast agregado",
            },
          ].map((stat) => (
            <div key={stat.label} className="glass-card p-5">
              <p className="text-sm text-neutral-500 mb-1">{stat.label}</p>
              <p className="text-2xl font-semibold text-petrol">{stat.value}</p>
              <p className="text-xs text-emerald-500 mt-1">{stat.badge}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Search + filters */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <div className="flex-1 min-w-[260px] flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/90 border border-neutral-200 shadow-soft">
          <span className="text-neutral-400 text-xl">🔎</span>
          <input
            type="text"
            placeholder="Buscar por nombre, industria o ciudad..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent text-sm text-neutral-700 placeholder-neutral-400 focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {["Todas", "Tech", "Retail", "Industrial"].map((pill) => (
            <button
              key={pill}
              className={`pill-filter ${pill === "Todas" ? "pill-filter-active" : ""}`}
            >
              {pill}
            </button>
          ))}
        </div>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCompanies.map((company, index) => (
          <motion.div
            key={company.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
            onClick={() => openSidebar(company)}
            className="glass-card p-6 flex flex-col gap-4 cursor-pointer group"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cream to-sand flex items-center justify-center text-xl text-petrol shadow-soft">
                  🏢
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-petrol group-hover:text-electric transition-colors">
                    {company.name}
                  </h3>
                  <p className="text-sm text-neutral-500">{company.industry || "Industria no definida"}</p>
                </div>
              </div>
              <span className="text-xs uppercase tracking-[0.3em] text-neutral-400">
                {company.company_type || "ORG"}
              </span>
            </div>

            <div className="text-sm text-neutral-500 space-y-2">
              {company.city && company.country && <p>📍 {company.city}, {company.country}</p>}
              {company.website && (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 text-electric hover:underline"
                >
                  🌐 {company.website}
                </a>
              )}
              {company.email && (
                <a
                  href={`mailto:${company.email}`}
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 hover:text-electric transition-colors"
                >
                  ✉️ {company.email}
                </a>
              )}
            </div>

            {company.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {company.tags.map((tag) => (
                  <span key={tag} className="text-xs font-semibold px-3 py-1 rounded-full bg-neutral-100 text-neutral-600">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-dashed border-neutral-200">
              <div>
                <p className="text-xs text-neutral-400">Empleados</p>
                <p className="text-lg font-semibold text-petrol">{company.employees_count || "—"}</p>
              </div>
              <div>
                <p className="text-xs text-neutral-400">Revenue</p>
                <p className="text-lg font-semibold text-emerald-600">
                  {company.annual_revenue ? `$${company.annual_revenue.toLocaleString()}` : "—"}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openModal(company);
                }}
                className="flex-1 px-4 py-2 rounded-full bg-neutral-100 text-sm font-semibold text-neutral-600 hover:bg-neutral-200 transition-colors"
              >
                Editar
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(company.id);
                }}
                className="flex-1 px-4 py-2 rounded-full bg-red-50 text-sm font-semibold text-red-600 hover:bg-red-100 transition-colors"
              >
                Eliminar
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredCompanies.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No se encontraron empresas</p>
          <button
            onClick={() => openModal()}
            className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            Crear primera empresa
          </button>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
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
              className="bg-white rounded-2xl p-6 sm:p-8 max-w-full sm:max-w-xl md:max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-900">
                {editingCompany ? "Editar Empresa" : "Nueva Empresa"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* SECCIÓN: INFORMACIÓN BÁSICA */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span>🏢</span> Información Básica
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre Comercial *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900"
                        placeholder="ej: Brucken AG Global"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Razón Social
                        </label>
                        <input
                          type="text"
                          value={formData.legal_name}
                          onChange={(e) => setFormData({ ...formData, legal_name: e.target.value })}
                          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900"
                          placeholder="ej: Brucken AG Global SpA"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          RUT/Tax ID
                        </label>
                        <input
                          type="text"
                          value={formData.tax_id}
                          onChange={(e) => setFormData({ ...formData, tax_id: e.target.value })}
                          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900"
                          placeholder="ej: 76.123.456-7"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Industria
                        </label>
                        <select
                          value={formData.industry}
                          onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900"
                        >
                          <option value="">Seleccionar</option>
                          <option value="Tecnología">Tecnología</option>
                          <option value="Software">Software</option>
                          <option value="Consultoría">Consultoría</option>
                          <option value="Retail">Retail</option>
                          <option value="Manufactura">Manufactura</option>
                          <option value="Servicios">Servicios</option>
                          <option value="Salud">Salud</option>
                          <option value="Educación">Educación</option>
                          <option value="Finanzas">Finanzas</option>
                          <option value="Otro">Otro</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tipo de Empresa
                        </label>
                        <select
                          value={formData.company_type}
                          onChange={(e) => setFormData({ ...formData, company_type: e.target.value })}
                          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900"
                        >
                          <option value="">Seleccionar</option>
                          <option value="SpA">SpA</option>
                          <option value="SA">S.A.</option>
                          <option value="Ltda">Ltda</option>
                          <option value="SRL">S.R.L.</option>
                          <option value="LLC">LLC</option>
                          <option value="Corp">Corp</option>
                          <option value="Otro">Otro</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Año Fundación
                        </label>
                        <input
                          type="number"
                          min="1800"
                          max={new Date().getFullYear()}
                          value={formData.founded_year}
                          onChange={(e) => setFormData({ ...formData, founded_year: e.target.value })}
                          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900"
                          placeholder="2020"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECCIÓN: CONTACTO */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span>📞</span> Información de Contacto
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Sitio Web
                        </label>
                        <input
                          type="url"
                          value={formData.website}
                          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900"
                          placeholder="https://example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Teléfono Principal
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900"
                          placeholder="+56 2 1234 5678"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email General
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900"
                        placeholder="contacto@example.com"
                      />
                    </div>

                    <div className="pt-2 border-t border-gray-300">
                      <p className="text-sm font-medium text-gray-700 mb-3">Contacto Principal</p>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs text-gray-600 mb-2">Nombre</label>
                          <input
                            type="text"
                            value={formData.primary_contact_name}
                            onChange={(e) => setFormData({ ...formData, primary_contact_name: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900 text-sm"
                            placeholder="Juan Pérez"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-2">Email</label>
                          <input
                            type="email"
                            value={formData.primary_contact_email}
                            onChange={(e) => setFormData({ ...formData, primary_contact_email: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900 text-sm"
                            placeholder="juan@example.com"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-2">Teléfono</label>
                          <input
                            type="tel"
                            value={formData.primary_contact_phone}
                            onChange={(e) => setFormData({ ...formData, primary_contact_phone: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900 text-sm"
                            placeholder="+56 9 8765 4321"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECCIÓN: DIRECCIÓN */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span>📍</span> Dirección
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Dirección
                      </label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900"
                        placeholder="Av. Principal 1234"
                      />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ciudad
                        </label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900"
                          placeholder="Santiago"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Estado/Región
                        </label>
                        <input
                          type="text"
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900"
                          placeholder="RM"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Código Postal
                        </label>
                        <input
                          type="text"
                          value={formData.postal_code}
                          onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900"
                          placeholder="7500000"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          País
                        </label>
                        <input
                          type="text"
                          value={formData.country}
                          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900"
                          placeholder="Chile"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECCIÓN: INFORMACIÓN EMPRESARIAL */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span>📊</span> Información Empresarial
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Número de Empleados
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={formData.employees_count}
                        onChange={(e) => setFormData({ ...formData, employees_count: e.target.value })}
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900"
                        placeholder="50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Revenue Anual (USD)
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.annual_revenue}
                        onChange={(e) => setFormData({ ...formData, annual_revenue: e.target.value })}
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900"
                        placeholder="1000000"
                      />
                    </div>
                  </div>
                </div>

                {/* SECCIÓN: REDES SOCIALES */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span>🌐</span> Redes Sociales
                  </h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <span className="text-blue-600">🔗</span> LinkedIn
                      </label>
                      <input
                        type="url"
                        value={formData.linkedin_url}
                        onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900"
                        placeholder="https://linkedin.com/company/..."
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                          <span className="text-blue-400">🐦</span> Twitter/X
                        </label>
                        <input
                          type="url"
                          value={formData.twitter_url}
                          onChange={(e) => setFormData({ ...formData, twitter_url: e.target.value })}
                          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900"
                          placeholder="https://x.com/..."
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                          <span className="text-blue-600">📘</span> Facebook
                        </label>
                        <input
                          type="url"
                          value={formData.facebook_url}
                          onChange={(e) => setFormData({ ...formData, facebook_url: e.target.value })}
                          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900"
                          placeholder="https://facebook.com/..."
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECCIÓN: ADICIONALES */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span>✨</span> Información Adicional
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tags (separados por coma)
                      </label>
                      <input
                        type="text"
                        value={formData.tags}
                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900"
                        placeholder="ej: cliente-premium, tecnología, internacional"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        💡 Usa tags para categorizar y filtrar empresas fácilmente
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Notas
                      </label>
                      <textarea
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        rows="3"
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900 resize-none"
                        placeholder="Información adicional, observaciones, historial..."
                      />
                    </div>
                  </div>
                </div>

                {/* BOTONES */}
                <div className="flex gap-3 pt-4 border-t border-gray-300">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 shadow-sm"
                  >
                    {loading ? "Guardando..." : editingCompany ? "Actualizar Empresa" : "Crear Empresa"}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Details Sidebar */}
      <DetailsSidebar
        isOpen={showSidebar}
        onClose={() => setShowSidebar(false)}
        data={selectedCompany}
        type="company"
        onEdit={(company) => {
          setShowSidebar(false);
          openModal(company);
        }}
        onDelete={handleDelete}
        onAddContact={(company) => {
          setShowSidebar(false);
          navigate(`/intranet/contacts?company_id=${company.id}&company_name=${encodeURIComponent(company.name)}`);
        }}
      />
    </IntranetLayout>
  );
}
