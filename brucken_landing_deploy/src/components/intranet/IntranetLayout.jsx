import { useState, useEffect, useMemo } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../lib/supabase";
import LanguageSwitcher from "../LanguageSwitcher";

export default function IntranetLayout({ children }) {
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [expandedGroups, setExpandedGroups] = useState({
    ventas: true,
    relaciones: true,
    insights: true,
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const navGroups = [
    {
      id: "ventas",
      label: "Ventas",
      items: [
        { name: "Pipeline", path: "/intranet/pipeline", icon: "📈" },
        { name: "Boards", path: "/intranet/boards", icon: "🗂️" },
        { name: "Leads", path: "/intranet/leads", icon: "🧲" },
      ],
    },
    {
      id: "relaciones",
      label: "Relaciones",
      items: [
        { name: "Contactos", path: "/intranet/contacts", icon: "👥" },
        { name: "Empresas", path: "/intranet/companies", icon: "🏢" },
      ],
    },
    {
      id: "insights",
      label: "Insights",
      items: [
        { name: "Dashboard", path: "/intranet", icon: "🏠" },
        { name: "Actividades", path: "/intranet/activities", icon: "🗓️" },
        { name: "Analytics", path: "/intranet/analytics", icon: "📊" },
      ],
    },
  ];

  const isActive = (path) => {
    if (path === "/intranet") return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const currentSection = useMemo(() => {
    const all = navGroups.flatMap((g) => g.items);
    return all.find((i) => isActive(i.path))?.name || "CRM";
  }, [navGroups, location.pathname]);

  return (
    <div className="crm-shell">
      <div className="min-h-screen flex">
        {/* Sidebar */}
        <aside
          className={`hidden lg:flex flex-col ${
            sidebarExpanded ? "w-72" : "w-24"
          } transition-all duration-300 bg-white/75 backdrop-blur-xl border-r border-neutral-200/70 py-6`}
        >
          <div className="px-4 flex items-center justify-between">
            <Link
              to="/"
              className="w-12 h-12 rounded-2xl bg-gradient-to-br from-electric to-petrol text-white flex items-center justify-center font-semibold shadow-glow"
            >
              B
            </Link>
            <button
              onClick={() => setSidebarExpanded((v) => !v)}
              className="ml-2 p-2 rounded-xl bg-white shadow-soft text-neutral-600 hidden lg:inline-flex"
              aria-label="Alternar barra lateral"
            >
              {sidebarExpanded ? "«" : "»"}
            </button>
          </div>

          <nav className="mt-8 flex-1 overflow-y-auto px-3 space-y-5">
            {navGroups.map((group) => (
              <div key={group.id}>
                <button
                  onClick={() =>
                    setExpandedGroups((g) => ({
                      ...g,
                      [group.id]: !g[group.id],
                    }))
                  }
                  className={`w-full flex items-center ${
                    sidebarExpanded ? "justify-between" : "justify-center"
                  } gap-2 px-3 py-2 rounded-xl text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500 hover:bg-white/80`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-neutral-400">
                      {expandedGroups[group.id] ? "▾" : "▸"}
                    </span>
                    {sidebarExpanded && group.label}
                  </span>
                  {sidebarExpanded && (
                    <span className="text-[11px] text-neutral-400">
                      {group.items.length} módulos
                    </span>
                  )}
                </button>

                <div
                  className={`${
                    expandedGroups[group.id] ? "grid" : "hidden"
                  } mt-2 gap-1`}
                >
                  {group.items.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`crm-nav-button ${
                        isActive(item.path) ? "is-active" : ""
                      } ${sidebarExpanded ? "" : "justify-center"}`}
                      title={item.name}
                    >
                      <span className="text-lg">{item.icon}</span>
                      {sidebarExpanded && <span>{item.name}</span>}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          <div className="px-4 mt-auto space-y-3">
            <div className="crm-card p-4 flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-electric to-petrol text-white flex items-center justify-center font-semibold">
                {user?.email?.[0]?.toUpperCase() || "B"}
              </div>
              {sidebarExpanded && (
                <div>
                  <p className="font-semibold text-petrol">
                    {user?.email?.split("@")[0] || "Usuario"}
                  </p>
                  <p className="text-xs text-neutral-500">Acceso seguro</p>
                </div>
              )}
            </div>
            <button
              onClick={handleLogout}
              className="w-full rounded-xl bg-white text-petrol border border-neutral-200 py-2 font-semibold hover:border-electric/50"
            >
              Cerrar sesión
            </button>
          </div>
        </aside>

        {/* Mobile nav */}
        <div className="lg:hidden w-full crm-header">
          <div className="px-4 py-3 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-gradient-to-br from-electric to-petrol text-white flex items-center justify-center font-semibold shadow-glow">
                B
              </span>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-petrol">
                  Brucken CRM
                </span>
                <span className="text-[11px] text-neutral-500">Portal</span>
              </div>
            </Link>
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-2 rounded-xl bg-white shadow-soft text-neutral-700"
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="px-4 pb-4 grid gap-2"
              >
                {navGroups
                  .flatMap((g) => g.items)
                  .map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-semibold ${
                        isActive(item.path)
                          ? "bg-electric text-white"
                          : "bg-white text-petrol border border-neutral-200"
                      }`}
                    >
                      <span>{item.icon}</span>
                      {item.name}
                    </Link>
                  ))}
                <button
                  onClick={handleLogout}
                  className="px-4 py-3 rounded-2xl bg-neutral-900 text-white font-semibold"
                >
                  Cerrar sesión
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <header className="crm-header">
            <div className="crm-page px-4 sm:px-6 lg:px-10 py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="crm-pill text-petrol bg-white/70 border-neutral-200">
                  Portal CRM
                </span>
                <p className="text-sm font-semibold text-neutral-600">
                  {currentSection}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-soft border border-neutral-200 text-neutral-500">
                  <span>🔎</span>
                  <input
                    type="search"
                    placeholder="Buscar contactos, deals, empresas..."
                    className="bg-transparent focus:outline-none text-sm placeholder-neutral-500 w-56"
                  />
                </div>
                <LanguageSwitcher variant="light" />
                <Link
                  to="/intranet/pipeline"
                  className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-electric text-black font-semibold shadow-glow hover:bg-white transition-colors"
                >
                  🚀 Pipeline
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-10 h-10 rounded-2xl bg-white border border-neutral-200 shadow-soft flex items-center justify-center text-neutral-600"
                >
                  ⏻
                </button>
                <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-white shadow-soft border border-neutral-200">
                  <div className="hidden sm:block">
                    <p className="text-sm font-semibold text-neutral-800">
                      {user?.email?.split("@")[0]}
                    </p>
                    <p className="text-xs text-neutral-500">Conectado</p>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-electric to-petrol text-white flex items-center justify-center font-semibold">
                    {user?.email?.[0]?.toUpperCase() || "B"}
                  </div>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 px-3 sm:px-6 lg:px-10 py-6 sm:py-8">
            <div className="crm-page space-y-6">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
