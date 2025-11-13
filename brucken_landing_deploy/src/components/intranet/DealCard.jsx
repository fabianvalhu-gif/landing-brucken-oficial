import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";

const tagColors = {
  prioridad: "bg-red-100 text-red-600",
  demo: "bg-electric/10 text-electric",
  expansion: "bg-emerald-100 text-emerald-600",
  software: "bg-purple-100 text-purple-600",
  representacion: "bg-sand text-petrol",
};

const labelOptionsMap = {
  prioridad: "Prioridad",
  demo: "Demo agendada",
  expansion: "Expansión",
  software: "Software Factory",
  representacion: "Representación",
};

export default function DealCard({ deal, isDragging = false }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: deal.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging || isSortableDragging ? 0.5 : 1,
  };

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`rounded-2xl p-3 sm:p-4 cursor-grab active:cursor-grabbing transition-all group bg-white shadow-soft border border-transparent ${
        isDragging ? "shadow-glow scale-105 border-electric" : "hover:border-electric/40"
      }`}
    >
      {/* Deal Title */}
      <h3 className="font-semibold text-petrol mb-2 group-hover:text-electric transition-colors text-sm sm:text-base truncate">
        {deal.title}
      </h3>

      {/* Company/Contact */}
      <div className="flex items-center gap-2 mb-3">
        {deal.company && (
          <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-500 truncate">
            <span className="text-lg">🏢</span>
            <span className="truncate max-w-[120px] sm:max-w-[160px]">{deal.company.name}</span>
          </div>
        )}
        {deal.contact && (
          <div className="flex items-center gap-1 text-sm text-neutral-500">
            <div className="w-6 h-6 rounded-full bg-electric/10 flex items-center justify-center text-xs text-electric font-medium">
              {getInitials(`${deal.contact.first_name} ${deal.contact.last_name}`)}
            </div>
            <span className="text-xs">
              {deal.contact.first_name} {deal.contact.last_name}
            </span>
          </div>
        )}
      </div>

      {/* Tags */}
      {deal.labels?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {deal.labels.map((label) => (
            <span
              key={label}
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                tagColors[label] || "bg-neutral-100 text-neutral-600"
              }`}
            >
              {labelOptionsMap[label] || label}
            </span>
          ))}
        </div>
      )}

      {/* Value */}
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-electric">
          ${deal.value?.toLocaleString() || "0"}
        </span>
        
        {deal.expected_close_date && (
          <span className="text-xs text-gray-500">
            {new Date(deal.expected_close_date).toLocaleDateString("es-ES", {
              month: "short",
              day: "numeric",
            })}
          </span>
        )}
      </div>

      {/* Probability indicator */}
      {deal.probability > 0 && (
        <div className="mt-3 pt-3 border-t border-dashed border-neutral-200">
          <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
            <span>Probabilidad</span>
            <span>{deal.probability}%</span>
          </div>
          <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-electric rounded-full transition-all"
              style={{ width: `${deal.probability}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
