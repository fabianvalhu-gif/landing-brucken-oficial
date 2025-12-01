import { Link } from "react-router-dom";

export default function PageHeader({
  title,
  subtitle,
  badge,
  meta = [],
  actions = [],
}) {
  return (
    <div className="crm-card px-6 sm:px-8 py-6 shadow-glow">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-3">
          {badge && (
            <span className="crm-pill text-electric bg-electric/10 border-electric/40">
              {badge}
            </span>
          )}
          <div>
            <h1 className="crm-page-title">{title}</h1>
            {subtitle && <p className="crm-subtitle mt-1">{subtitle}</p>}
          </div>
          {meta.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {meta.map((item) => (
                <span
                  key={item.label}
                  className="crm-tag flex items-center gap-2 bg-white/70"
                >
                  {item.icon && <span>{item.icon}</span>}
                  <span className="font-semibold">{item.value}</span>
                  <span className="text-neutral-500">{item.label}</span>
                </span>
              ))}
            </div>
          )}
        </div>

        {actions.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-end">
            {actions.map((action) => {
              const classes =
                action.variant === "primary"
                  ? "bg-electric text-black hover:bg-white shadow-glow"
                  : "bg-white/70 text-petrol border border-neutral-200 hover:border-electric/50";

              const content = (
                <span className="inline-flex items-center gap-2">
                  {action.icon && <span>{action.icon}</span>}
                  <span className="font-semibold">{action.label}</span>
                </span>
              );

              if (action.to) {
                return (
                  <Link
                    key={action.label}
                    to={action.to}
                    className={`px-4 py-2 rounded-xl transition-all ${classes}`}
                  >
                    {content}
                  </Link>
                );
              }

              return (
                <button
                  key={action.label}
                  type="button"
                  onClick={action.onClick}
                  className={`px-4 py-2 rounded-xl transition-all ${classes}`}
                >
                  {content}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
