import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../lib/supabase";
import IntranetLayout from "../../components/intranet/IntranetLayout";
import DetailsSidebar from "../../components/intranet/DetailsSidebar";
import { useLocation, useNavigate } from "react-router-dom";

export default function Contacts() {
  const location = useLocation();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);

  // Check if coming from company page
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const companyId = params.get('company_id');
    const companyName = params.get('company_name');
    
    if (companyId && companyName) {
      // Open modal with company pre-selected
      setTimeout(() => {
        const modal = {
          company_id: companyId
        };
        openModal(null, modal);
      }, 500);
    }
  }, [location]);

  const [formData, setFormData] = useState({
    // Información Personal
    first_name: "",
    last_name: "",
    title: "", // Mr., Mrs., Dr.
    birth_date: "",
    // Información Profesional
    position: "",
    department: "",
    company_id: "",
    // Contacto Principal
    email: "",
    phone: "",
    mobile: "",
    // Contacto Secundario
    email_secondary: "",
    phone_secondary: "",
    // Ubicación
    address: "",
    city: "",
    country: "",
    // Redes Sociales
    linkedin_url: "",
    twitter_url: "",
    // Idiomas e Intereses
    languages: "", // Separado por comas
    interests: "", // Separado por comas
    // Preferencias y Tags
    preferred_contact_method: "email",
    tags: "",
    notes: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Cargar contactos con sus empresas
      const { data: contactsData, error: contactsError } = await supabase
        .from("contacts")
        .select(`
          *,
          company:companies(id, name)
        `)
        .order("created_at", { ascending: false });

      if (contactsError) throw contactsError;

      // Cargar empresas para el select
      const { data: companiesData, error: companiesError } = await supabase
        .from("companies")
        .select("id, name")
        .order("name");

      if (companiesError) throw companiesError;

      setContacts(contactsData || []);
      setCompanies(companiesData || []);
    } catch (error) {
      console.error("Error loading data:", error);
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
        birth_date: formData.birth_date || null, // Convertir string vacío a null
        languages: formData.languages ? formData.languages.split(',').map(l => l.trim()).filter(l => l) : [],
        interests: formData.interests ? formData.interests.split(',').map(i => i.trim()).filter(i => i) : [],
        tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(t => t) : [],
      };

      if (editingContact) {
        // Update
        const { error } = await supabase
          .from("contacts")
          .update(dataToSave)
          .eq("id", editingContact.id);

        if (error) throw error;
      } else {
        // Insert
        const { error } = await supabase.from("contacts").insert([dataToSave]);

        if (error) throw error;
      }

      // Reload data
      await loadData();
      closeModal();
    } catch (error) {
      console.error("Error saving contact:", error);
      alert("Error al guardar contacto: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Estás seguro de eliminar este contacto?")) return;

    try {
      const { error } = await supabase.from("contacts").delete().eq("id", id);

      if (error) throw error;

      await loadData();
    } catch (error) {
      console.error("Error deleting contact:", error);
      alert("Error al eliminar contacto: " + error.message);
    }
  };

  const openModal = (contact = null, preselected = null) => {
    if (contact) {
      setEditingContact(contact);
      setFormData({
        first_name: contact.first_name || "",
        last_name: contact.last_name || "",
        title: contact.title || "",
        birth_date: contact.birth_date || "",
        position: contact.position || "",
        department: contact.department || "",
        company_id: contact.company_id || "",
        email: contact.email || "",
        phone: contact.phone || "",
        mobile: contact.mobile || "",
        email_secondary: contact.email_secondary || "",
        phone_secondary: contact.phone_secondary || "",
        address: contact.address || "",
        city: contact.city || "",
        country: contact.country || "",
        linkedin_url: contact.linkedin_url || "",
        twitter_url: contact.twitter_url || "",
        languages: contact.languages ? contact.languages.join(', ') : "",
        interests: contact.interests ? contact.interests.join(', ') : "",
        preferred_contact_method: contact.preferred_contact_method || "email",
        tags: contact.tags ? contact.tags.join(', ') : "",
        notes: contact.notes || "",
      });
    } else {
      setEditingContact(null);
      setFormData({
        first_name: "",
        last_name: "",
        title: "",
        birth_date: "",
        position: "",
        department: "",
        company_id: preselected?.company_id || "",
        email: "",
        phone: "",
        mobile: "",
        email_secondary: "",
        phone_secondary: "",
        address: "",
        city: "",
        country: "",
        linkedin_url: "",
        twitter_url: "",
        languages: "",
        interests: "",
        preferred_contact_method: "email",
        tags: "",
        notes: "",
      });
    }
    setShowModal(true);
    setShowSidebar(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingContact(null);
  };

  const openSidebar = (contact) => {
    setSelectedContact(contact);
    setShowSidebar(true);
  };

  const filteredContacts = contacts.filter((contact) =>
    `${contact.first_name} ${contact.last_name} ${contact.email} ${contact.company?.name || ""}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const getInitials = (firstName, lastName) => {
    return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
  };

  if (loading && contacts.length === 0) {
    return (
      <IntranetLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Cargando contactos...</p>
          </div>
        </div>
      </IntranetLayout>
    );
  }

  return (
    <IntranetLayout>
      {/* Hero + CTA */}
      <div className="grid gap-6 lg:grid-cols-[2.2fr,1fr] mb-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="stat-card">
          <p className="text-sm uppercase tracking-[0.5em] text-neutral-400">People Intelligence</p>
          <h1 className="text-4xl font-semibold text-petrol mt-3 mb-4 leading-tight">
            Conecta decisiones con relaciones clave en LATAM y mercados globales.
          </h1>
          <p className="text-neutral-500 mb-6">Centraliza datos de ejecutivos, agendas y preferencias de contacto para coordinar tus squads comerciales.</p>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => openModal()} className="cta-button cta-button-primary text-sm">
              + Nuevo Contacto
            </button>
            <button onClick={() => navigate("/intranet/companies")} className="cta-button cta-button-outline text-sm">
              Ver Empresas
            </button>
          </div>
        </motion.div>
        <div className="grid gap-4">
          {[
            { label: "Contactos Totales", value: filteredContacts.length, badge: "+12 nuevos" },
            { label: "Con empresa asignada", value: contacts.filter((c) => c.company).length, badge: "Sincronizados" },
            { label: "Idiomas registrados", value: new Set(contacts.flatMap((c) => c.languages || [])).size, badge: "Diversidad" },
          ].map((stat) => (
            <div key={stat.label} className="glass-card p-5">
              <p className="text-sm text-neutral-500 mb-1">{stat.label}</p>
              <p className="text-2xl font-semibold text-petrol">{stat.value || 0}</p>
              <p className="text-xs text-emerald-500 mt-1">{stat.badge}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 mb-8">
        <div className="flex-1 min-w-[260px] flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/90 border border-neutral-200 shadow-soft">
          <span className="text-neutral-400 text-xl">🔎</span>
          <input
            type="text"
            placeholder="Buscar por nombre, email o empresa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent text-sm text-neutral-700 placeholder-neutral-400 focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {["Todos", "C-Level", "Decision maker", "Influencer"].map((pill) => (
            <button key={pill} className={`pill-filter ${pill === "Todos" ? "pill-filter-active" : ""}`}>
              {pill}
            </button>
          ))}
        </div>
      </div>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredContacts.map((contact, index) => (
          <motion.div
            key={contact.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
            onClick={() => openSidebar(contact)}
            className="glass-card p-6 flex flex-col gap-4 cursor-pointer group"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-electric/15 to-petrol/15 text-petrol flex items-center justify-center font-semibold">
                  {getInitials(contact.first_name, contact.last_name)}
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-petrol group-hover:text-electric transition-colors">
                    {contact.first_name} {contact.last_name}
                  </h3>
                  <p className="text-sm text-neutral-500">{contact.position || "Sin cargo"}</p>
                </div>
              </div>
              <span className="text-xs uppercase tracking-[0.3em] text-neutral-400">
                {contact.department || "TEAM"}
              </span>
            </div>

            {contact.company && (
              <div className="flex items-center gap-2 text-sm text-neutral-500">
                <span>🏢</span>
                <span>{contact.company.name}</span>
              </div>
            )}

            <div className="space-y-2 text-sm text-neutral-500">
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 hover:text-electric transition-colors"
                >
                  ✉️ {contact.email}
                </a>
              )}
              {contact.phone && <p>📞 {contact.phone}</p>}
              {contact.languages?.length > 0 && <p>🗣️ {contact.languages.join(", ")}</p>}
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 text-neutral-600">
                {contact.preferred_contact_method || "email"}
              </span>
              {contact.tags?.slice(0, 2).map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full text-xs font-semibold bg-electric/10 text-electric">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openModal(contact);
                }}
                className="flex-1 px-4 py-2 rounded-full bg-neutral-100 text-sm font-semibold text-neutral-600 hover:bg-neutral-200 transition-colors"
              >
                Editar
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(contact.id);
                }}
                className="flex-1 px-4 py-2 rounded-full bg-red-50 text-sm font-semibold text-red-600 hover:bg-red-100 transition-colors"
              >
                Eliminar
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredContacts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No se encontraron contactos</p>
          <button
            onClick={() => openModal()}
            className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            Crear primer contacto
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
              className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-900">
                {editingContact ? "Editar Contacto" : "Nuevo Contacto"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* SECCIÓN: INFORMACIÓN PERSONAL */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span>👤</span> Información Personal
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tratamiento
                        </label>
                        <select
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900"
                        >
                          <option value="">Seleccionar</option>
                          <option value="Sr.">Sr.</option>
                          <option value="Sra.">Sra.</option>
                          <option value="Dr.">Dr.</option>
                          <option value="Dra.">Dra.</option>
                          <option value="Ing.">Ing.</option>
                          <option value="Lic.">Lic.</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nombre *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.first_name}
                          onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900"
                          placeholder="Juan"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Apellido *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.last_name}
                          onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900"
                          placeholder="Pérez"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fecha de Nacimiento
                      </label>
                      <input
                        type="date"
                        value={formData.birth_date}
                        onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })}
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900"
                      />
                    </div>
                  </div>
                </div>

                {/* SECCIÓN: INFORMACIÓN PROFESIONAL */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span>💼</span> Información Profesional
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Empresa</label>
                      <select
                        value={formData.company_id}
                        onChange={(e) => setFormData({ ...formData, company_id: e.target.value })}
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900"
                      >
                        <option value="">Sin empresa</option>
                        {companies.map((company) => (
                          <option key={company.id} value={company.id}>
                            {company.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cargo/Posición
                        </label>
                        <input
                          type="text"
                          value={formData.position}
                          onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900"
                          placeholder="ej: Gerente de Ventas"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Departamento
                        </label>
                        <input
                          type="text"
                          value={formData.department}
                          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900"
                          placeholder="ej: Comercial, IT, RRHH"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECCIÓN: INFORMACIÓN DE CONTACTO */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span>📞</span> Información de Contacto
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Principal
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900"
                          placeholder="juan@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Secundario
                        </label>
                        <input
                          type="email"
                          value={formData.email_secondary}
                          onChange={(e) => setFormData({ ...formData, email_secondary: e.target.value })}
                          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900"
                          placeholder="juan.personal@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Teléfono Fijo
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900"
                          placeholder="+56 2 1234 5678"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Móvil Principal
                        </label>
                        <input
                          type="tel"
                          value={formData.mobile}
                          onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900"
                          placeholder="+56 9 8765 4321"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Móvil Secundario
                        </label>
                        <input
                          type="tel"
                          value={formData.phone_secondary}
                          onChange={(e) => setFormData({ ...formData, phone_secondary: e.target.value })}
                          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900"
                          placeholder="+56 9 1111 2222"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Método de Contacto Preferido
                      </label>
                      <select
                        value={formData.preferred_contact_method}
                        onChange={(e) => setFormData({ ...formData, preferred_contact_method: e.target.value })}
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900"
                      >
                        <option value="email">📧 Email</option>
                        <option value="phone">📞 Teléfono</option>
                        <option value="mobile">📱 Móvil</option>
                        <option value="whatsapp">💬 WhatsApp</option>
                        <option value="linkedin">🔗 LinkedIn</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* SECCIÓN: UBICACIÓN */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span>📍</span> Ubicación
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

                    <div className="grid grid-cols-2 gap-4">
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

                {/* SECCIÓN: REDES SOCIALES */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span>🌐</span> Redes Sociales
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <span className="text-blue-600">🔗</span> LinkedIn
                      </label>
                      <input
                        type="url"
                        value={formData.linkedin_url}
                        onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900"
                        placeholder="https://linkedin.com/in/..."
                      />
                    </div>
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
                  </div>
                </div>

                {/* SECCIÓN: IDIOMAS E INTERESES */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span>🗣️</span> Idiomas e Intereses
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Idiomas (separados por coma)
                      </label>
                      <input
                        type="text"
                        value={formData.languages}
                        onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900"
                        placeholder="ej: Español, Inglés, Alemán"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Intereses (separados por coma)
                      </label>
                      <input
                        type="text"
                        value={formData.interests}
                        onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900"
                        placeholder="ej: Golf, Tecnología, Viajes"
                      />
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
                        placeholder="ej: vip, decision-maker, tecnología"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        💡 Usa tags para categorizar y filtrar contactos fácilmente
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
                        placeholder="Información adicional, preferencias, historial de interacciones..."
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
                    {loading ? "Guardando..." : editingContact ? "Actualizar Contacto" : "Crear Contacto"}
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
        data={selectedContact}
        type="contact"
        onEdit={(contact) => {
          setShowSidebar(false);
          openModal(contact);
        }}
        onDelete={handleDelete}
      />
    </IntranetLayout>
  );
}
