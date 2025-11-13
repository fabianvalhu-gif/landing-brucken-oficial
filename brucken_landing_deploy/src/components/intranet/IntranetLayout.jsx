import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../../lib/supabase";
import "../../styles/intranet-light.css";

export default function IntranetLayout({ children }) {
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState({ ventas: true, relaciones: true, insights: false });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
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
    if (path === "/intranet") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="crm-shell">
      <div className="min-h-screen flex">
        {/* Sidebar */}
        <aside className={`hidden lg:flex flex-col ${sidebarExpanded ? "w-72" : "w-24"} transition-all duration-300 bg-white/80 backdrop-blur-xl border-r border-neutral-200 py-6`}>
          <div className="px-4 flex items-center justify-between">
            <Link to="/" className="w-12 h-12 rounded-2xl bg-petrol text-white flex items-center justify-center font-semibold shadow-glow">
              B
            </Link>
            <button
              onClick={() => setSidebarExpanded((v) => !v)}
              className="ml-2 p-2 rounded-xl bg-white shadow-soft text-neutral-600 hidden lg:inline-flex"
              aria-label="Toggle sidebar"
            >
              {sidebarExpanded ? "«" : "»"}
            </button>
          </div>

          <nav className="mt-6 flex-1 overflow-y-auto">
            <div className="px-3 space-y-3">
              {navGroups.map((group) => (
                <div key={group.id} className="">
                  <button
                    onClick={() => setExpandedGroups((g) => ({ ...g, [group.id]: !g[group.id] }))}
                    className={`w-full flex items-center ${sidebarExpanded ? "justify-between" : "justify-center"} gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-neutral-500 hover:bg-white`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-neutral-400">▸</span>
                      {sidebarExpanded && group.label}
                    </span>
                    {sidebarExpanded && (
                      <span className="text-xs text-neutral-400">{expandedGroups[group.id] ? "Ocultar" : "Mostrar"}</span>
                    )}
                  </button>

                  <div className={`${expandedGroups[group.id] ? "grid" : "hidden"} mt-1 gap-1`}> 
                    {group.items.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center ${sidebarExpanded ? "justify-start gap-3 px-3 py-2" : "justify-center p-3"} rounded-xl font-semibold transition-colors ${
                          isActive(item.path) ? "bg-electric text-white shadow-glow" : "text-neutral-500 hover:bg-white"
                        }`}
                        title={item.name}
                      >
                        <span className="text-lg">{item.icon}</span>
                        {sidebarExpanded && <span className="text-sm">{item.name}</span>}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </nav>

          <button
            onClick={handleLogout}
            className={`mx-4 mt-auto mb-2 ${sidebarExpanded ? "px-4 py-2" : "p-2"} rounded-xl bg-white shadow-soft text-neutral-600 text-sm hover:text-petrol`}
          >
            Cerrar sesión
          </button>
        </aside>

        {/* Mobile top nav */}
        <div className="lg:hidden w-full border-b border-neutral-200 bg-white/90 backdrop-blur-md sticky top-0 z-50">
          <div className="px-4 py-3 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <span className="w-10 h-10 rounded-2xl bg-petrol text-white flex items-center justify-center font-semibold shadow-glow">
                B
              </span>
              <span className="text-sm font-semibold text-neutral-500">Brucken CRM</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-2 rounded-xl bg-neutral-100 text-neutral-600"
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              className="px-4 pb-4 grid gap-2"
            >
              {navGroups.flatMap((g) => g.items).map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-semibold ${
                    isActive(item.path) ? "bg-electric text-white" : "bg-neutral-100 text-neutral-600"
                  }`}
                >
                  <span>{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </motion.div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <header className="px-4 sm:px-6 lg:px-12 py-5 border-b border-neutral-200 bg-white/70 backdrop-blur-lg sticky top-0 z-40">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.4em] text-neutral-400">CRM Overview</p>
                  <h1 className="text-3xl font-semibold text-petrol">Brucken AG Global</h1>
                </div>
                <div className="flex items-center gap-3">
                  <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 text-neutral-500">
                    <span>🔍</span>
                    <input
                      type="search"
                      placeholder="Buscar contactos, deals, empresas..."
                      className="bg-transparent focus:outline-none text-sm placeholder-neutral-500"
                    />
                  </div>
                  <button className="w-11 h-11 rounded-2xl bg-white shadow-soft flex items-center justify-center text-petrol">
                    🔔
                  </button>
                  <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white shadow-soft">
                    <div className="hidden sm:block">
                      <p className="text-sm font-semibold text-neutral-700">{user?.email?.split("@")[0]}</p>
                      <p className="text-xs text-neutral-400">Admin</p>
                    </div>
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-electric to-petrol text-white flex items-center justify-center font-semibold">
                      {user?.email?.[0]?.toUpperCase() || "B"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 px-3 sm:px-6 lg:px-12 py-6 sm:py-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
