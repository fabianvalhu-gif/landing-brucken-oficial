import { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../utils/animations";

const services = [
  {
    id: 1,
    title: "Transformación Comercial",
    tagline: "Revenue Growth & Sales Excellence",
    description:
      "Modelos comerciales end-to-end, playbooks de venta consultiva y aceleradores de revenue.",
    details: [
      "Modelos comerciales B2B, B2C y B2B2C",
      "Sales playbooks y metodologías de venta consultiva",
      "Pricing dinámico y optimización de márgenes",
      "KPIs comerciales y dashboards de performance",
      "Programas de incentivos y compensación variable",
    ],
    icon: "💼",
    impact: "+40% Revenue Growth",
    accent: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    title: "Rediseño Operacional",
    tagline: "Process Excellence & EBITDA Liberation",
    description:
      "Procesos lean, automatización y governance para liberar EBITDA con visibilidad completa.",
    details: [
      "Mapeo y optimización de procesos end-to-end",
      "Implementación de metodologías Lean y Six Sigma",
      "Automatización RPA y digitalización de workflows",
      "Governance y modelos de accountability claros",
      "KPIs operacionales y tableros de control",
    ],
    icon: "⚙️",
    impact: "+25% EBITDA Margin",
    accent: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    title: "Estrategia de Go-to-Market",
    tagline: "Market Entry & Product Launch",
    description:
      "Research, pricing y canales digitales para lanzar y escalar productos en tiempo récord.",
    details: [
      "Market sizing y análisis competitivo profundo",
      "Segmentación de clientes y value proposition design",
      "Estrategia de canales (directo, distribuidor, digital)",
      "Plan de lanzamiento y roadmap de escalamiento",
      "Customer journey y experiencia omnicanal",
    ],
    icon: "🚀",
    impact: "60% Faster Time-to-Market",
    accent: "from-green-500 to-emerald-500",
  },
  {
    id: 4,
    title: "Expansión Internacional",
    tagline: "Global Growth & Market Penetration",
    description:
      "Landing en LATAM & US con set up legal/comercial y representación ejecutiva local.",
    details: [
      "Due diligence de mercados objetivo",
      "Set up legal, fiscal y comercial país por país",
      "Identificación y negociación con distribuidores",
      "Representación ejecutiva local con governance",
      "Acompañamiento en primeros deals y scaling",
    ],
    icon: "🌎",
    impact: "3-5 New Markets/Year",
    accent: "from-orange-500 to-red-500",
  },
  {
    id: 5,
    title: "Optimización de Performance",
    tagline: "Data-Driven Decision Making",
    description:
      "PMO ágil, tableros y analítica avanzada para capturar valor cada trimestre.",
    details: [
      "Implementación de PMO corporativa y ágil",
      "OKRs y cascade de objetivos por área",
      "Business Intelligence y advanced analytics",
      "Dashboards ejecutivos con data en tiempo real",
      "Cultura de accountability y mejora continua",
    ],
    icon: "📊",
    impact: "+98% Goal Achievement",
    accent: "from-indigo-500 to-purple-500",
  },
];

export default function Services() {
  const [expanded, setExpanded] = useState(null);

  return (
    <section id="consultoria" className="relative py-16 sm:py-20 lg:py-24 bg-[#f8f9fa]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(155,172,216,0.12),transparent_30%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_5%,rgba(249,133,19,0.12),transparent_28%)]" />
      <div className="relative section-container">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer()}
          className="space-y-10"
        >
          <motion.div variants={fadeIn("up", 0.05)} className="space-y-4 max-w-3xl">
            <div className="pill-badge">Consultoría Estratégica</div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-petrol">
              Inteligencia de negocio con ejecución de{" "}
              <span className="gradient-text">clase mundial.</span>
            </h2>
            <p className="text-lg text-muted">
              Diagnósticos profundos + metodologías probadas para generar impacto real en EBIT, revenue y eficiencia
              operacional. Soluciones personalizadas orientadas a resultados medibles.
            </p>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-2">
            {services.map((service, index) => (
              <motion.article
                key={service.id}
                variants={fadeIn("up", index * 0.08)}
                className="group relative overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-soft"
                onMouseEnter={() => setExpanded(service.id)}
                onMouseLeave={() => setExpanded(null)}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity bg-gradient-to-r from-electric to-purple-500" />
                <div className="relative p-6 sm:p-7 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${service.accent} text-white flex items-center justify-center text-2xl shadow-soft`} aria-hidden>
                      {service.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-[11px] uppercase tracking-[0.28em] text-neutral-500 mb-1">
                        {String(service.id).padStart(2, "0")} • {service.tagline}
                      </p>
                      <h3 className="text-2xl font-bold text-petrol group-hover:text-electric transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm text-neutral-600 mt-2">
                        {service.description}
                      </p>
                      <div className="inline-flex items-center gap-2 px-3 py-2 mt-3 rounded-full bg-electric/10 border border-electric/30 text-sm font-semibold text-electric">
                        {service.impact}
                      </div>
                    </div>
                  </div>

                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: expanded === service.id ? "auto" : 0,
                      opacity: expanded === service.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 border-t border-neutral-200/90">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500 mb-3">
                        Servicios incluidos
                      </p>
                      <ul className="grid sm:grid-cols-2 gap-2 text-sm text-neutral-700">
                        {service.details.map((detail) => (
                          <li key={detail} className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-electric flex-shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div
            variants={fadeIn("up", 0.2)}
            className="glass-card p-7 sm:p-9 flex flex-col md:flex-row items-center gap-4 justify-between"
          >
            <div>
              <p className="text-lg font-semibold text-petrol">Nuestra metodología</p>
              <p className="text-sm text-muted">
                Diagnóstico → Diseño → Implementación → Escalamiento. Trazabilidad completa y captura de valor en cada fase.
              </p>
            </div>
            <a href="#contacto" className="cta-button cta-primary">
              Agenda una sesión estratégica
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
