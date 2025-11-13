import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import DealCard from "./DealCard";

export default function StageColumn({ stage, deals, total }) {
  const { setNodeRef, isOver } = useDroppable({
    id: stage.id,
  });

  return (
    <div className="flex-shrink-0 w-80">
      {/* Stage Header */}
      <div className="glass-card p-5 mb-3">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-petrol">{stage.name}</h3>
          <span className="text-xs uppercase tracking-[0.3em] text-neutral-400">{deals.length}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-electric font-bold">${total.toLocaleString()}</span>
          {stage.probability > 0 && (
            <span className="text-neutral-500">{stage.probability}% prob.</span>
          )}
        </div>
      </div>

      {/* Deals List */}
      <div
        ref={setNodeRef}
        className={`min-h-[400px] p-3 rounded-3xl border-2 border-dashed transition-colors ${
          isOver ? "border-electric bg-electric/10" : "border-neutral-200 bg-white/60"
        }`}
      >
        <SortableContext items={deals.map((d) => d.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {deals.length === 0 ? (
              <div className="text-center py-12 text-neutral-400">
                <p className="text-sm">Sin oportunidades</p>
                <p className="text-xs mt-1">Arrastra deals aquí</p>
              </div>
            ) : (
              deals.map((deal) => <DealCard key={deal.id} deal={deal} />)
            )}
          </div>
        </SortableContext>
      </div>
    </div>
  );
}
