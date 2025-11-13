import IntranetLayout from "../../components/intranet/IntranetLayout";

export default function Activities() {
  return (
    <IntranetLayout>
      <div className="text-center py-20">
        <div className="text-6xl mb-6">📅</div>
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Actividades
        </h1>
        <p className="text-gray-600 mb-8">
          Módulo de actividades, tareas y seguimiento en desarrollo
        </p>
        <div className="bg-white border border-gray-200 rounded-xl p-8 max-w-2xl mx-auto shadow-sm">
          <h3 className="text-xl font-bold mb-4 text-gray-900">Próximamente:</h3>
          <ul className="text-left space-y-2 text-gray-700">
            <li>• Calendario de actividades</li>
            <li>• Gestión de tareas y to-dos</li>
            <li>• Historial de llamadas y reuniones</li>
            <li>• Recordatorios automáticos</li>
            <li>• Timeline de actividades por deal/contacto</li>
          </ul>
        </div>
      </div>
    </IntranetLayout>
  );
}
