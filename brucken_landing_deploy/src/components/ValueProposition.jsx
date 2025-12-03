import { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../utils/animations";

const pillars = [
  {
    id: 1,
    title: "Precisión estratégica",
    subtitle: "Estrategia basada en datos",
    description:
      "Diagnósticos ejecutivos, modelos financieros y roadmaps accionables priorizando EBIT y valor real.",
    icon: "🎯",
    accent: "from-blue-500 to-cyan-500",
    pill: "bg-blue-100 text-blue-900",
    stats: ["EBIT-focused", "Financial modeling", "Executive roadmaps"],
  },
  {
    id: 2,
    title: "Velocidad operativa",
    subtitle: "Ejecución ágil garantizada",
    description:
      "Squads senior + delivery ágil capturando valor en ciclos mensuales medibles.",
    icon: "⚡",
    accent: "from-purple-500 to-pink-500",
    pill: "bg-purple-100 text-purple-900",
    stats: ["Monthly cycles", "Hybrid squads", "Fast delivery"],
  },
  {
    id: 3,
    title: "Innovación aplicada",
    subtitle: "Tecnología que escala",
    description:
      "Tecnología, datos e IA integradas en procesos comerciales, operativos y productos digitales.",
    icon: "🚀",
    accent: "from-orange-500 to-red-500",
    pill: "bg-orange-100 text-orange-900",
    stats: ["AI-powered", "Data-driven", "Digital products"],
  },
];

export default function ValueProposition() {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="relative py-16 sm:py-20 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(27,118,255,0.07),transparent_32%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_10%,rgba(124,58,237,0.06),transparent_28%)]" />
      <div className="relative section-container">
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          className="space-y-10"
        >
          <motion.div variants={fadeIn("up")} className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="pill-badge mx-auto">Nuestra fórmula</div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-petrol">
              Tres pilares para generar soluciones{" "}
              <span className="gradient-text">corporativas</span> de alto impacto.
            </h2>
            <p className="text-lg text-muted">
              Diseñamos sistemas donde estrategia, tecnología y ejecución comercial se nutren en tiempo real para
              capturar oportunidades en LATAM y mercados globales.
            </p>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-3">
            {pillars.map((pillar, index) => (
              <motion.article
                key={pillar.id}
                variants={fadeIn("up", index * 0.1)}
                className="group relative"
                onHoverStart={() => setHovered(pillar.id)}
                onHoverEnd={() => setHovered(null)}
              >
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-opacity"
                  style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}
                />
                <motion.div
                  className="glass-card p-6 sm:p-7 h-full flex flex-col gap-4"
                  whileHover={{ y: -6 }}
                >
                  <div className="flex items-center justify-between">
                    <div className={`text-3xl rounded-full bg-gradient-to-r ${pillar.accent} text-white w-12 h-12 flex items-center justify-center shadow-soft`} aria-hidden>
                      {pillar.icon}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[11px] font-semibold ${pillar.pill}`}>
                      Pilar {String(pillar.id).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl md:text-2xl font-bold text-petrol group-hover:text-electric transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-sm font-semibold text-electric uppercase tracking-[0.18em]">
                      {pillar.subtitle}
                    </p>
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {pillar.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-3 border-t border-neutral-200/80">
                    {pillar.stats.map((stat) => (
                      <span
                        key={stat}
                        className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 text-xs font-semibold"
                      >
                        {stat}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.article>
            ))}
          </div>

          <motion.div
            variants={fadeIn("up", 0.2)}
            className="glass-card p-7 sm:p-9 flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-electric/10 border border-electric/30 flex items-center justify-center text-lg font-bold text-electric">
                360°
              </div>
              <div>
                <p className="text-lg font-semibold text-petrol">Estrategia + Velocidad + Innovación</p>
                <p className="text-sm text-muted">
                  Un ecosistema completo que acelera resultados y maximiza ROI en cada proyecto.
                </p>
              </div>
            </div>
            <a href="#contacto" className="cta-button cta-secondary">
              Conversemos
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
