import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../utils/animations";
import { useState } from "react";

const services = [
  {
    id: 1,
    title: "Transformación Comercial",
    tagline: "Revenue Growth & Sales Excellence",
    description:
      "Diseño de modelos comerciales end-to-end, playbooks para squads de venta y aceleradores de revenue.",
    details: [
      "Modelos comerciales B2B, B2C y B2B2C",
      "Sales playbooks y metodologías de venta consultiva",
      "Pricing dinámico y optimización de márgenes",
      "KPIs comerciales y dashboards de performance",
      "Programas de incentivos y compensación variable"
    ],
    icon: "💼",
    color: "from-blue-500 to-cyan-500",
    impact: "+40% Revenue Growth"
  },
  {
    id: 2,
    title: "Rediseño Operacional",
    tagline: "Process Excellence & EBITDA Liberation",
    description:
      "Procesos lean, automatización y governance para liberar EBITDA y escalar con visibilidad completa.",
    details: [
      "Mapeo y optimización de procesos end-to-end",
      "Implementación de metodologías Lean y Six Sigma",
      "Automatización RPA y digitalización de workflows",
      "Governance y modelos de accountability claros",
      "KPIs operacionales y tableros de control"
    ],
    icon: "⚙️",
    color: "from-purple-500 to-pink-500",
    impact: "+25% EBITDA Margin"
  },
  {
    id: 3,
    title: "Estrategia de Go-to-Market",
    tagline: "Market Entry & Product Launch",
    description:
      "Research de mercados, pricing dinámico y canales digitales para lanzar y escalar productos.",
    details: [
      "Market sizing y análisis competitivo profundo",
      "Segmentación de clientes y value proposition design",
      "Estrategia de canales (directo, distribuidor, digital)",
      "Plan de lanzamiento y roadmap de escalamiento",
      "Customer journey y experiencia omnicanal"
    ],
    icon: "🚀",
    color: "from-green-500 to-emerald-500",
    impact: "60% Faster Time-to-Market"
  },
  {
    id: 4,
    title: "Expansión Internacional",
    tagline: "Global Growth & Market Penetration",
    description:
      "Landing en LATAM & US, set up legal/comercial y representación ejecutiva para entrada acelerada.",
    details: [
      "Due diligence de mercados objetivo",
      "Set up legal, fiscal y comercial país por país",
      "Identificación y negociación con distribuidores",
      "Representación ejecutiva local con governance",
      "Acompañamiento en primeros deals y scaling"
    ],
    icon: "🌎",
    color: "from-orange-500 to-red-500",
    impact: "3-5 New Markets/Year"
  },
  {
    id: 5,
    title: "Optimización de Performance",
    tagline: "Data-Driven Decision Making",
    description:
      "PMO ágil, tableros de performance y analítica avanzada para capturar valor cada trimestre.",
    details: [
      "Implementación de PMO corporativa y ágil",
      "OKRs y cascade de objetivos por área",
      "Business Intelligence y advanced analytics",
      "Dashboards ejecutivos con data en tiempo real",
      "Cultura de accountability y mejora continua"
    ],
    icon: "📊",
    color: "from-indigo-500 to-purple-500",
    impact: "+98% Goal Achievement"
  },
];

const methodologySteps = [
  { step: "01", name: "Diagnóstico", description: "Due diligence financiero y operacional" },
  { step: "02", name: "Diseño", description: "Roadmap accionable con quick wins" },
  { step: "03", name: "Implementación", description: "Ejecución con squads dedicados" },
  { step: "04", name: "Escalamiento", description: "Captura de valor sostenible" },
];

export default function Services() {
  const [expandedService, setExpandedService] = useState(null);

  return (
    <section id="consultoria" className="section-padding relative overflow-hidden bg-gradient-to-b from-black via-black to-petrol/20">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-40 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.header
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer()}
          className="mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            className="inline-block mb-6"
          >
            <div className="px-6 py-2 rounded-full bg-gradient-to-r from-electric/20 to-purple-500/20 border border-electric/30">
              <p className="text-xs uppercase tracking-[0.4em] text-electric font-semibold">
                Consultoría Estratégica
              </p>
            </div>
          </motion.div>

          <motion.h2
            variants={fadeIn("up", 0.1)}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl"
          >
            Inteligencia de negocio con ejecución de{" "}
            <span className="gradient-text">clase mundial.</span>
          </motion.h2>

          <motion.p
            variants={fadeIn("up", 0.2)}
            className="text-lg md:text-xl text-white/70 max-w-3xl leading-relaxed"
          >
            Combinamos diagnósticos estratégicos profundos con metodologías de ejecución probadas 
            para generar impacto real en EBIT, revenue y eficiencia operacional. Soluciones 
            personalizadas que priorizan creación de valor y resultados medibles.
          </motion.p>
        </motion.header>

        {/* Services Grid */}
        <motion.div
          className="grid gap-6 mb-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer(0.1, 0.1)}
        >
          {services.map((service, index) => (
            <motion.article
              key={service.id}
              variants={fadeIn("up", index * 0.05)}
              className="group relative"
              onHoverStart={() => setExpandedService(service.id)}
              onHoverEnd={() => setExpandedService(null)}
            >
              {/* Gradient glow on hover */}
              <motion.div
                className={`absolute -inset-1 bg-gradient-to-r ${service.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500`}
              />

              {/* Card */}
              <motion.div
                className="relative glass-card p-8 overflow-hidden"
                whileHover={{ 
                  y: -4,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  {/* Left side - Title & Description */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-4">
                      {/* Icon */}
                      <motion.div
                        className="text-5xl"
                        animate={{
                          scale: expandedService === service.id ? [1, 1.2, 1] : 1,
                          rotate: expandedService === service.id ? [0, 10, -10, 0] : 0,
                        }}
                        transition={{ duration: 0.4 }}
                      >
                        {service.icon}
                      </motion.div>

                      <div className="flex-1">
                        {/* Number */}
                        <p className="text-white/40 text-xs uppercase tracking-[0.4em] mb-2">
                          {String(service.id).padStart(2, "0")}
                        </p>

                        {/* Title */}
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-electric transition-colors">
                          {service.title}
                        </h3>

                        {/* Tagline */}
                        <p className="text-sm text-electric uppercase tracking-wider font-semibold mb-3">
                          {service.tagline}
                        </p>

                        {/* Description */}
                        <p className="text-white/70 leading-relaxed mb-4">
                          {service.description}
                        </p>

                        {/* Impact Badge */}
                        <motion.div
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${service.color} text-white text-sm font-bold`}
                          animate={{
                            scale: expandedService === service.id ? 1.05 : 1,
                          }}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                            <polyline points="16 7 22 7 22 13"></polyline>
                          </svg>
                          {service.impact}
                        </motion.div>
                      </div>
                    </div>

                    {/* Expandable Details */}
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: expandedService === service.id ? "auto" : 0,
                        opacity: expandedService === service.id ? 1 : 0,
                      }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 border-t border-white/10 mt-4">
                        <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-4">
                          Servicios Incluidos
                        </p>
                        <ul className="grid md:grid-cols-2 gap-3">
                          {service.details.map((detail, idx) => (
                            <motion.li
                              key={detail}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ 
                                opacity: expandedService === service.id ? 1 : 0,
                                x: expandedService === service.id ? 0 : -10,
                              }}
                              transition={{ delay: idx * 0.05 }}
                              className="flex items-start gap-3 text-white/80 text-sm"
                            >
                              <motion.span 
                                className="mt-1 h-1.5 w-1.5 rounded-full bg-electric flex-shrink-0"
                                animate={{
                                  scale: expandedService === service.id ? [1, 1.5, 1] : 1,
                                }}
                                transition={{ 
                                  duration: 1.5, 
                                  repeat: expandedService === service.id ? Infinity : 0,
                                  delay: idx * 0.1 
                                }}
                              />
                              {detail}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </div>

                  {/* Right side - Expand indicator */}
                  <motion.div
                    className="text-white/40 group-hover:text-electric transition-colors cursor-pointer"
                    animate={{
                      rotate: expandedService === service.id ? 180 : 0,
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </motion.div>
                </div>
              </motion.div>
            </motion.article>
          ))}
        </motion.div>

        {/* Methodology Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 md:p-12"
        >
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.4em] text-electric mb-4">
              Nuestra Metodología
            </p>
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              De la estrategia a los <span className="gradient-text">resultados</span>
            </h3>
            <p className="text-white/70 max-w-2xl mx-auto">
              Un proceso probado que garantiza ejecución, trazabilidad y captura de valor en cada fase.
            </p>
          </div>

          {/* Methodology Steps */}
          <div className="grid md:grid-cols-4 gap-6">
            {methodologySteps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <motion.div
                  className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-electric to-purple-500 flex items-center justify-center text-black font-bold text-xl"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {item.step}
                </motion.div>
                <h4 className="text-white font-bold mb-2 group-hover:text-electric transition-colors">
                  {item.name}
                </h4>
                <p className="text-white/60 text-sm">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <motion.a
              href="#contacto"
              className="cta-button bg-electric text-black hover:bg-white inline-flex items-center gap-3 text-lg px-10 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Agenda una sesión estratégica
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
