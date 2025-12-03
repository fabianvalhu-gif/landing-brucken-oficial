import { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../utils/animations";

const steps = [
  { 
    number: "01",
    title: "Abrimos mercados", 
    detail: "Inteligencia comercial, hunting y due diligence local.",
    icon: "🌎",
  },
  { 
    number: "02",
    title: "Negociamos", 
    detail: "Equipo senior con experiencia C-level y metodologías consultoras.",
    icon: "🤝",
  },
  {
    number: "03",
    title: "Gestionamos distribuidores",
    detail: "Onboarding, incentivos y governance KPI-driven en cada país.",
    icon: "📊",
  },
  { 
    number: "04",
    title: "Construimos presencia regional", 
    detail: "PR, marketing account-based y eventos privados.",
    icon: "🚀",
  },
  { 
    number: "05",
    title: "KPI-driven execution", 
    detail: "Dashboards ejecutivos conectados al pipeline y revenue.",
    icon: "📈",
  },
  { 
    number: "06",
    title: "Escalamos resultados", 
    detail: "Optimización continua y expansión a nuevos territorios con modelo probado.",
    icon: "⚡",
  },
];

const trust = [
  { label: "Marcas globales representadas", value: "20+" },
  { label: "Países cubiertos", value: "8" },
  { label: "Ciclos de negocio", value: "6-12m" },
];

export default function Representation() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id="representacion" className="relative py-16 sm:py-20 lg:py-24 bg-[#f8f9fa]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(27,118,255,0.06),transparent_30%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(124,58,237,0.05),transparent_26%)]" />
      <div className="relative section-container">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer()}
          className="space-y-10"
        >
          <motion.div variants={fadeIn("up", 0.05)} className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="pill-badge mx-auto">Representación Comercial</div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-petrol">
              Ejecutamos expansión con presencia en terreno,{" "}
              <span className="gradient-text">governance y accountability</span> semanal.
            </h2>
            <p className="text-lg text-muted">
              Proceso estructurado de 6 pasos para abrir mercados, negociar y escalar resultados con visibilidad ejecutiva.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                variants={fadeIn("up", index * 0.07)}
                className="relative group"
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
              >
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-electric to-purple-500 opacity-0 group-hover:opacity-5 transition-opacity"
                />
                <motion.div
                  className="glass-card p-6 h-full flex flex-col gap-3"
                  whileHover={{ y: -6 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-3xl" aria-hidden>
                      {step.icon}
                    </div>
                    <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-neutral-100 text-neutral-700">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-petrol group-hover:text-electric transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed flex-1">{step.detail}</p>
                  <motion.div
                    className="text-electric text-sm font-semibold opacity-0 group-hover:opacity-100 flex items-center gap-1"
                    initial={{ x: -6, opacity: 0 }}
                    animate={{
                      x: hoveredIndex === index ? 0 : -6,
                      opacity: hoveredIndex === index ? 1 : 0,
                    }}
                  >
                    Ver proceso →
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={fadeIn("up", 0.2)}
            className="glass-card p-7 sm:p-9 flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
              {trust.map((item) => (
                <div key={item.label} className="rounded-xl border border-neutral-200 bg-white p-4 text-center shadow-soft">
                  <p className="text-2xl font-bold text-petrol">{item.value}</p>
                  <p className="text-sm text-neutral-600">{item.label}</p>
                </div>
              ))}
            </div>
            <a href="#contacto" className="cta-button cta-primary">
              Hablemos de tu expansión
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
