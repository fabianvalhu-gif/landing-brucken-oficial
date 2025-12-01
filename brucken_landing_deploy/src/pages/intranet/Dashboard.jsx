import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../../lib/supabase";
import IntranetLayout from "../../components/intranet/IntranetLayout";
import PageHeader from "../../components/intranet/PageHeader";

export default function Dashboard() {
  const [stats, setStats] = useState({
    leads: 0,
    deals: 0,
    revenue: 0,
    activities: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      // Contar deals activos
      const { count: dealsCount } = await supabase
        .from("deals")
        .select("*", { count: "exact", head: true })
        .eq("status", "open");

      // Sumar revenue de deals activos
      const { data: dealsData } = await supabase
        .from("deals")
        .select("value")
        .eq("status", "open");

      const totalRevenue = dealsData?.reduce((sum, deal) => sum + (deal.value || 0), 0) || 0;

      // Contar contactos
      const { count: contactsCount } = await supabase
        .from("contacts")
        .select("*", { count: "exact", head: true });

      // Contar actividades pendientes
      const { count: activitiesCount } = await supabase
        .from("activities")
        .select("*", { count: "exact", head: true })
        .eq("is_done", false);

      setStats({
        leads: contactsCount || 0,
        deals: dealsCount || 0,
        revenue: totalRevenue,
        activities: activitiesCount || 0,
      });
    } catch (error) {
      console.error("Error loading stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statsCards = [
    { label: "Contactos", value: stats.leads, icon: "👥", link: "/intranet/contacts" },
    { label: "Oportunidades", value: stats.deals, icon: "🧭", link: "/intranet/pipeline" },
    { label: "Revenue", value: `$${stats.revenue.toLocaleString()}`, icon: "💰", link: "/intranet/pipeline" },
    { label: "Actividades", value: stats.activities, icon: "✓", link: "/intranet/activities" },
  ];

  return (
    <IntranetLayout>
      <PageHeader
        title="CRM Brucken"
        subtitle="Panel central con métricas clave y accesos rápidos."
        badge="Inicio"
        meta={[
          { label: "Contactos", value: stats.leads, icon: "👥" },
          { label: "Oportunidades", value: stats.deals, icon: "🧭" },
          { label: "Revenue", value: `$${stats.revenue.toLocaleString()}`, icon: "💰" },
          { label: "Actividades", value: stats.activities, icon: "🗓️" },
        ]}
        actions={[
          { label: "Ir al pipeline", to: "/intranet/pipeline", icon: "🚀", variant: "primary" },
          { label: "Nuevo contacto", to: "/intranet/contacts", icon: "➕" },
        ]}
      />

      <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsCards.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                to={stat.link}
                className="crm-card p-6 hover:-translate-y-1 transition-all block"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{stat.icon}</span>
                </div>
                <h3 className="text-3xl font-bold mb-1 text-petrol">
                  {stat.value}
                </h3>
                <p className="text-sm text-neutral-500">{stat.label}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="crm-card p-6"
          >
            <h2 className="text-xl font-bold mb-6 text-petrol">Acciones rápidas</h2>
            <div className="grid grid-cols-2 gap-4">
              <Link to="/intranet/contacts" className="p-5 crm-card-muted border border-neutral-200/60 rounded-2xl hover:-translate-y-0.5 transition-all text-left group shadow-soft">
                <div className="text-3xl mb-3">➕</div>
                <p className="font-semibold text-petrol group-hover:text-electric transition-colors">
                  Nuevo contacto
                </p>
              </Link>
              <Link to="/intranet/pipeline" className="p-5 crm-card-muted border border-neutral-200/60 rounded-2xl hover:-translate-y-0.5 transition-all text-left group shadow-soft">
                <div className="text-3xl mb-3">📊</div>
                <p className="font-semibold text-petrol group-hover:text-electric transition-colors">
                  Ver pipeline
                </p>
              </Link>
              <Link to="/intranet/boards" className="p-5 crm-card-muted border border-neutral-200/60 rounded-2xl hover:-translate-y-0.5 transition-all text-left group shadow-soft">
                <div className="text-3xl mb-3">🗂️</div>
                <p className="font-semibold text-petrol group-hover:text-electric transition-colors">
                  Mis boards
                </p>
              </Link>
              <Link to="/intranet/analytics" className="p-5 crm-card-muted border border-neutral-200/60 rounded-2xl hover:-translate-y-0.5 transition-all text-left group shadow-soft">
                <div className="text-3xl mb-3">📈</div>
                <p className="font-semibold text-petrol group-hover:text-electric transition-colors">
                  Ver analytics
                </p>
              </Link>
            </div>
          </motion.div>

          {/* Getting Started */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="crm-card p-6"
          >
            <h2 className="text-xl font-bold mb-6 text-petrol">Primeros pasos</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-electric text-black flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <div>
                  <p className="font-medium text-petrol mb-1">Crea tu primer contacto</p>
                  <p className="text-sm text-neutral-600">Agrega empresas y personas a tu CRM</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-petrol text-white flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <div>
                  <p className="font-medium text-petrol mb-1">Crea una oportunidad</p>
                  <p className="text-sm text-neutral-600">Gestiona tus deals en el pipeline</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <div>
                  <p className="font-medium text-petrol mb-1">Programa actividades</p>
                  <p className="text-sm text-neutral-600">Nunca pierdas el seguimiento</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="crm-card p-8 text-center"
        >
          <h3 className="text-2xl font-bold mb-2 text-petrol">
            🚀 CRM Brucken: Pipeline + Boards + Analytics
          </h3>
          <p className="text-neutral-600 mb-4">
            Gestión visual de pipeline, boards, contactos y empresas con seguimiento en tiempo real.
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-sm">
            <span className="px-3 py-1 bg-electric/10 text-electric rounded-full font-medium border border-electric/20">Pipeline Visual</span>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-medium border border-purple-200">Kanban Boards</span>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium border border-green-200">Drag & Drop</span>
            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full font-medium border border-orange-200">Gestión de Contactos</span>
            <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full font-medium border border-pink-200">Analytics</span>
          </div>
        </motion.div>
      </div>
    </IntranetLayout>
  );
}
