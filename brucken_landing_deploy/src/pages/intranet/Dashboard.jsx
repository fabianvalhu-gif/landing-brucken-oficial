import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../../lib/supabase";
import IntranetLayout from "../../components/intranet/IntranetLayout";

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
    { label: "Oportunidades", value: stats.deals, icon: "�", link: "/intranet/pipeline" },
    { label: "Revenue", value: `$${stats.revenue.toLocaleString()}`, icon: "💰", link: "/intranet/pipeline" },
    { label: "Actividades", value: stats.activities, icon: "✓", link: "/intranet/activities" },
  ];

  return (
    <IntranetLayout>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Bienvenido al CRM Interno
        </h1>
        <p className="text-gray-600">Gestiona tus negocios desde un solo lugar</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              to={stat.link}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-lg transition-all group block"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-3xl">{stat.icon}</span>
              </div>
              <h3 className="text-3xl font-bold mb-1 text-gray-900 group-hover:text-blue-600 transition-colors">
                {stat.value}
              </h3>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
        >
          <h2 className="text-xl font-bold mb-6 text-gray-900">Acciones Rápidas</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/intranet/contacts" className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl hover:shadow-md transition-all text-left group">
              <div className="text-3xl mb-3">➕</div>
              <p className="font-semibold text-blue-700 group-hover:text-blue-800 transition-colors">
                Nuevo Contacto
              </p>
            </Link>
            <Link to="/intranet/pipeline" className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl hover:shadow-md transition-all text-left group">
              <div className="text-3xl mb-3">📊</div>
              <p className="font-semibold text-purple-700 group-hover:text-purple-800 transition-colors">
                Ver Pipeline
              </p>
            </Link>
            <Link to="/intranet/boards" className="p-6 bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl hover:shadow-md transition-all text-left group">
              <div className="text-3xl mb-3">�</div>
              <p className="font-semibold text-green-700 group-hover:text-green-800 transition-colors">
                Mis Boards
              </p>
            </Link>
            <Link to="/intranet/analytics" className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-xl hover:shadow-md transition-all text-left group">
              <div className="text-3xl mb-3">📈</div>
              <p className="font-semibold text-orange-700 group-hover:text-orange-800 transition-colors">
                Ver Analytics
              </p>
            </Link>
          </div>
        </motion.div>

        {/* Getting Started */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
        >
          <h2 className="text-xl font-bold mb-6 text-gray-900">Primeros Pasos</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                1
              </div>
              <div>
                <p className="font-medium text-gray-900 mb-1">Crea tu primer contacto</p>
                <p className="text-sm text-gray-600">Agrega empresas y personas a tu CRM</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                2
              </div>
              <div>
                <p className="font-medium text-gray-900 mb-1">Crea una oportunidad</p>
                <p className="text-sm text-gray-600">Gestiona tus deals en el pipeline</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                3
              </div>
              <div>
                <p className="font-medium text-gray-900 mb-1">Programa actividades</p>
                <p className="text-sm text-gray-600">Nunca pierdas el seguimiento</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Features Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-8 text-center shadow-sm"
      >
        <h3 className="text-2xl font-bold mb-2 text-gray-900">
          🚀 CRM Completo Estilo Pipedrive + Asana
        </h3>
        <p className="text-gray-700 mb-4">
          Gestión visual de pipeline, boards, contactos, empresas, y colaboración en tiempo real
        </p>
        <div className="flex flex-wrap justify-center gap-2 text-sm">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium border border-blue-200">Pipeline Visual</span>
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-medium border border-purple-200">Kanban Boards</span>
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium border border-green-200">Drag & Drop</span>
          <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full font-medium border border-orange-200">Gestión de Contactos</span>
          <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full font-medium border border-pink-200">Analytics</span>
        </div>
      </motion.div>
    </IntranetLayout>
  );
}
