import IntranetLayout from "../../components/intranet/IntranetLayout";

export default function Analytics() {
  return (
    <IntranetLayout>
      <div className="text-center py-20">
        <div className="text-6xl mb-6">📊</div>
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Analytics & Reportes
        </h1>
        <p className="text-gray-600 mb-8">
          Módulo de analytics y reportes BI en desarrollo
        </p>
        <div className="bg-white border border-gray-200 rounded-xl p-8 max-w-2xl mx-auto shadow-sm">
          <h3 className="text-xl font-bold mb-4 text-gray-900">Próximamente:</h3>
          <ul className="text-left space-y-2 text-gray-700">
            <li>• Dashboard de métricas clave (KPIs)</li>
            <li>• Forecast de ventas</li>
            <li>• Tasa de conversión por etapa</li>
            <li>• Win rate y análisis de pérdidas</li>
            <li>• Revenue por fuente/industria</li>
            <li>• Gráficos interactivos con filtros</li>
          </ul>
        </div>
      </div>
    </IntranetLayout>
  );
}
