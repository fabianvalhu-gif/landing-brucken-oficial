import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../lib/supabase";
import IntranetLayout from "../../components/intranet/IntranetLayout";
import PageHeader from "../../components/intranet/PageHeader";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Task Card Component
const categoryColors = {
  tarea: "bg-electric/10 text-electric",
  minuta: "bg-sand text-petrol",
  seguimiento: "bg-emerald-100 text-emerald-700",
};

function TaskCard({ task, onEdit, onDelete, isDragging = false }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const priorityColors = {
    high: "bg-red-100 text-red-700 border-red-200",
    medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
    low: "bg-green-100 text-green-700 border-green-200",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`glass-card border border-transparent p-4 cursor-grab active:cursor-grabbing transition-all group ${
        isDragging ? "shadow-glow scale-105 border-electric" : "hover:border-electric/40"
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="text-xs text-neutral-400 mb-1">
            {task.company?.name || "Sin cliente"}
          </p>
          <h4 className="font-semibold text-petrol text-sm group-hover:text-electric transition-colors">
            {task.title}
          </h4>
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(task);
            }}
            className="p-1.5 rounded-full bg-neutral-100 text-neutral-500 hover:text-electric"
          >
            ✏️
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task.id);
            }}
            className="p-1.5 rounded-full bg-neutral-100 text-neutral-500 hover:text-red-500"
          >
            🗑️
          </button>
        </div>
      </div>

      {task.description && (
        <p className="text-xs text-neutral-500 mb-3 line-clamp-2">{task.description}</p>
      )}

      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          {task.priority && (
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${priorityColors[task.priority]}`}>
              {task.priority === 'high' ? '🔴' : task.priority === 'medium' ? '🟡' : '🟢'} {task.priority}
            </span>
          )}
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${categoryColors[task.category || "tarea"] || "bg-neutral-100 text-neutral-600"}`}
          >
            {task.category === "minuta" ? "Minuta" : task.category === "seguimiento" ? "Seguimiento" : "Tarea"}
          </span>
          {task.assignee && (
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-electric to-petrol flex items-center justify-center text-white text-xs font-bold">
              {task.assignee[0].toUpperCase()}
            </div>
          )}
        </div>
        {task.due_date && (
          <span className="text-xs text-neutral-500">
            📅 {new Date(task.due_date).toLocaleDateString('es', { month: 'short', day: 'numeric' })}
          </span>
        )}
      </div>
    </div>
  );
}

export default function Boards() {
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [companyFilter, setCompanyFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [activeId, setActiveId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    assignee: "",
    due_date: "",
    status: "backlog",
    company_id: "",
    category: "tarea",
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  // Columnas estilo Asana
const columns = [
  { id: "backlog", name: "Backlog", icon: "📥", color: "gray" },
  { id: "todo", name: "To Do", icon: "📋", color: "blue" },
  { id: "in_progress", name: "En Progreso", icon: "🚀", color: "yellow" },
  { id: "review", name: "Revisión", icon: "👀", color: "purple" },
  { id: "done", name: "Completado", icon: "✅", color: "green" },
];

const categoryOptions = [
  { id: "tarea", label: "Tarea" },
  { id: "minuta", label: "Minuta" },
  { id: "seguimiento", label: "Seguimiento" },
];

  useEffect(() => {
    loadBoards();
  }, []);

  useEffect(() => {
    loadCompanies();
  }, []);

  useEffect(() => {
    if (selectedBoard) {
      loadTasks();
    }
  }, [selectedBoard]);

  const loadBoards = async () => {
    try {
      const { data, error } = await supabase
        .from("boards")
        .select("*")
        .eq("is_archived", false)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setBoards(data || []);
      if (data && data.length > 0 && !selectedBoard) {
        setSelectedBoard(data[0]);
      }
    } catch (error) {
      console.error("Error loading boards:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadCompanies = async () => {
    try {
      const { data, error } = await supabase
        .from("companies")
        .select("id, name")
        .order("name");

      if (error) throw error;
      setCompanies(data || []);
    } catch (error) {
      console.error("Error loading companies:", error);
    }
  };

  const loadTasks = async () => {
    if (!selectedBoard) return;
    
    try {
      const { data, error } = await supabase
        .from("tasks")
        .select(`
          *,
          company:companies(id, name)
        `)
        .eq("board_id", selectedBoard.id)
        .order("position", { ascending: true });

      if (error) throw error;

      setTasks(data || []);
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeTask = tasks.find((t) => t.id === active.id);
    const overColumnId = over.id;

    if (activeTask && activeTask.status !== overColumnId) {
      setTasks((tasks) =>
        tasks.map((task) =>
          task.id === active.id ? { ...task, status: overColumnId } : task
        )
      );
    }
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const task = tasks.find((t) => t.id === active.id);
    const newStatus = over.id;

    if (task && task.status !== newStatus) {
      try {
        const { error } = await supabase
          .from("tasks")
          .update({ status: newStatus, updated_at: new Date().toISOString() })
          .eq("id", task.id);

        if (error) throw error;
      } catch (error) {
        console.error("Error updating task:", error);
        loadTasks(); // Revertir si falla
      }
    }
  };

  const getTasksByColumn = (columnId) => {
    return tasks.filter((task) => {
      const matchesColumn = task.status === columnId;
      const matchesCompany = companyFilter === "all" || task.company_id === companyFilter;
      const matchesCategory = categoryFilter === "all" || (task.category || "tarea") === categoryFilter;
      return matchesColumn && matchesCompany && matchesCategory;
    });
  };

  const handleAddTask = (columnId) => {
    setSelectedColumn(columnId);
    setFormData({ ...formData, status: columnId });
    setEditingTask(null);
    setShowNewTaskModal(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title || "",
      description: task.description || "",
      priority: task.priority || "medium",
      assignee: task.assignee || "",
      due_date: task.due_date || "",
      status: task.status || "backlog",
      company_id: task.company_id || "",
      category: task.category || "tarea",
    });
    setShowNewTaskModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingTask) {
        // Update
        const { error } = await supabase
          .from("tasks")
          .update(formData)
          .eq("id", editingTask.id);

        if (error) throw error;
      } else {
        // Insert
        const { error } = await supabase
          .from("tasks")
          .insert([{ ...formData, board_id: selectedBoard.id }]);

        if (error) throw error;
      }

      await loadTasks();
      closeModal();
    } catch (error) {
      console.error("Error saving task:", error);
      alert("Error al guardar tarea: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Estás seguro de eliminar esta tarea?")) return;

    try {
      const { error } = await supabase.from("tasks").delete().eq("id", id);

      if (error) throw error;

      await loadTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Error al eliminar tarea: " + error.message);
    }
  };

  const closeModal = () => {
    setShowNewTaskModal(false);
    setEditingTask(null);
    setFormData({
      title: "",
      description: "",
      priority: "medium",
      assignee: "",
      due_date: "",
      status: "backlog",
      company_id: "",
      category: "tarea",
    });
  };

  const activeTask = tasks.find((t) => t.id === activeId);

  if (loading && boards.length === 0) {
    return (
      <IntranetLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Cargando boards...</p>
          </div>
        </div>
      </IntranetLayout>
    );
  }

  const totalTasks = tasks.length;
  const minutesCount = tasks.filter((task) => (task.category || "tarea") === "minuta").length;
  const clientsTracked = new Set(tasks.map((task) => task.company_id).filter(Boolean)).size;

  return (
    <IntranetLayout>
      <PageHeader
        title={selectedBoard?.name || "Boards por cliente"}
        subtitle={
          selectedBoard?.description ||
          "Coordina tareas, minutas y seguimiento por cliente, alineado al pipeline."
        }
        badge="Operaciones"
        meta={[
          { label: "Tareas activas", value: totalTasks, icon: "✅" },
          { label: "Minutas", value: minutesCount, icon: "📝" },
          { label: "Clientes con seguimiento", value: clientsTracked, icon: "🏢" },
        ]}
        actions={[
          { label: "Nueva tarea o minuta", onClick: () => handleAddTask("todo"), icon: "➕", variant: "primary" },
          boards.length > 1
            ? { label: "Ver pipeline", to: "/intranet/pipeline", icon: "📈" }
            : null,
        ].filter(Boolean)}
      />

      <div className="space-y-6">
        {boards.length > 1 && (
          <div className="crm-card p-4 flex gap-2 overflow-x-auto">
            {boards.map((board) => (
              <button
                key={board.id}
                onClick={() => setSelectedBoard(board)}
                className={`crm-tag ${selectedBoard?.id === board.id ? "bg-electric/10 border-electric/30 text-electric" : "bg-white/70"}`}
              >
                {board.name}
              </button>
            ))}
          </div>
        )}

        <div className="crm-card p-4 space-y-3">
          <div className="flex flex-wrap gap-3 items-center">
            <span className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              Clientes
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setCompanyFilter("all")}
                className={`crm-tag ${companyFilter === "all" ? "bg-electric/10 border-electric/30 text-electric" : "bg-white/70"}`}
              >
                Todos
              </button>
              {companies.map((company) => (
                <button
                  key={company.id}
                  onClick={() => setCompanyFilter(company.id)}
                  className={`crm-tag ${companyFilter === company.id ? "bg-electric/10 border-electric/30 text-electric" : "bg-white/70"}`}
                >
                  {company.name}
                </button>
              ))}
            </div>
          </div>

          <div className="crm-divider" />

          <div className="flex flex-wrap gap-3 items-center">
            <span className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              Tipo
            </span>
            <div className="flex flex-wrap gap-2">
              {categoryOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setCategoryFilter(option.id)}
                  className={`crm-tag ${categoryFilter === option.id ? "bg-electric/10 border-electric/30 text-electric" : "bg-white/70"}`}
                >
                  {option.label}
                </button>
              ))}
              <button
                onClick={() => setCategoryFilter("all")}
                className={`crm-tag ${categoryFilter === "all" ? "bg-electric/10 border-electric/30 text-electric" : "bg-white/70"}`}
              >
                Todos
              </button>
            </div>
          </div>
        </div>

        {/* Kanban Board */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="crm-card p-3 lg:p-4">
            <div className="flex gap-6 overflow-x-auto pb-6 -mx-2 px-2 snap-x snap-mandatory">
              {columns.map((column) => {
                const columnTasks = getTasksByColumn(column.id);
                
                return (
                  <div key={column.id} className="flex-shrink-0 min-w-[250px] w-72 md:w-80">
                    <div className="glass-card p-5 mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{column.icon}</span>
                          <h3 className="font-bold text-petrol">{column.name}</h3>
                          <span className="px-2 py-0.5 bg-neutral-100 text-neutral-500 rounded-full text-xs font-semibold">
                            {columnTasks.length}
                          </span>
                        </div>
                        <button
                          onClick={() => handleAddTask(column.id)}
                          className="p-1.5 rounded-full bg-neutral-100 text-neutral-500 hover:text-electric"
                        >
                          ➕
                        </button>
                      </div>
                    </div>

                    <SortableContext items={columnTasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
                      <div className="space-y-3 min-h-[200px] rounded-3xl p-3 border-2 border-dashed border-neutral-200 bg-white/80">
                        {columnTasks.length === 0 ? (
                          <div className="text-center py-12 text-neutral-400">
                            <p className="text-sm">Sin tareas</p>
                          </div>
                        ) : (
                          columnTasks.map((task) => (
                            <TaskCard 
                              key={task.id} 
                              task={task} 
                              onEdit={handleEditTask}
                              onDelete={handleDelete}
                            />
                          ))
                        )}
                      </div>
                    </SortableContext>
                  </div>
                );
              })}
            </div>
          </div>

          <DragOverlay>
            {activeId && activeTask ? (
              <TaskCard task={activeTask} isDragging onEdit={() => {}} onDelete={() => {}} />
            ) : null}
        </DragOverlay>
      </DndContext>

      {/* Stats Footer */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4">
        {columns.map((column) => {
          const columnTasks = getTasksByColumn(column.id);
          return (
            <div key={column.id} className="glass-card p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{column.icon}</span>
                <p className="text-xs text-neutral-500 font-medium">{column.name}</p>
              </div>
              <p className="text-2xl font-bold text-petrol">{columnTasks.length}</p>
              <p className="text-xs text-neutral-400 mt-1">tareas</p>
            </div>
          );
        })}
      </div>

      </div>

      {/* Modal Nueva/Editar Tarea */}
      <AnimatePresence>
        {showNewTaskModal && (
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
                {editingTask ? "Editar Tarea" : "Nueva Tarea"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título de la Tarea *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900"
                    placeholder="ej: Diseñar wireframes de la app"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows="3"
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900 resize-none"
                    placeholder="Detalles adicionales..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cliente relacionado
                    </label>
                    <select
                      value={formData.company_id}
                      onChange={(e) => setFormData({ ...formData, company_id: e.target.value })}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900"
                    >
                      <option value="">Sin cliente</option>
                      {companies.map((company) => (
                        <option key={company.id} value={company.id}>
                          {company.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {categoryOptions.map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, category: option.id })}
                          className={`px-4 py-2 rounded-full text-sm font-semibold border ${
                            formData.category === option.id
                              ? "bg-electric text-white border-transparent shadow-soft"
                              : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prioridad
                    </label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900"
                    >
                      <option value="low">🟢 Baja</option>
                      <option value="medium">🟡 Media</option>
                      <option value="high">🔴 Alta</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estado
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900"
                    >
                      <option value="backlog">📥 Backlog</option>
                      <option value="todo">📋 To Do</option>
                      <option value="in_progress">🚀 En Progreso</option>
                      <option value="review">👀 Revisión</option>
                      <option value="done">✅ Completado</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Asignado a
                    </label>
                    <input
                      type="text"
                      value={formData.assignee}
                      onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900"
                      placeholder="Nombre"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha de entrega
                    </label>
                    <input
                      type="date"
                      value={formData.due_date}
                      onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-6 py-3 rounded-full bg-electric text-white font-semibold shadow-soft hover:bg-petrol transition-colors disabled:opacity-50"
                  >
                    {loading ? "Guardando..." : editingTask ? "Actualizar" : "Crear Tarea"}
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
