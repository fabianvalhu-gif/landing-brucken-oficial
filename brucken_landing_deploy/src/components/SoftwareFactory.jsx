import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, staggerContainer } from "../utils/animations";

const capabilities = [
  {
    id: "web",
    label: "Desarrollo web",
    icon: "💻",
    summary: "Arquitecturas headless, microfrontends y plataformas B2B2C con performance enterprise.",
    bullets: [
      "React/Next.js + Vite con Tailwind UI systems",
      "Design systems escalables y componentes reutilizables",
      "Accesibilidad AA y optimización SEO"
    ],
    metrics: [
      { value: "3-4", label: "squads frontend", description: "Especialistas full-stack" },
      { value: "4-6 Sem", label: "release promedio", description: "MVP funcional" },
      { value: "99.8%", label: "uptime", description: "Infraestructura cloud" },
      { value: "+95%", label: "Lighthouse score", description: "Performance optimizado" },
    ],
  },
  {
    id: "mobile",
    label: "Aplicaciones móviles",
    icon: "📱",
    summary: "Apps nativas e híbridas centradas en omnicanalidad y experiencias self-service de alto rendimiento.",
    bullets: [
      "Flutter y React Native para iOS/Android",
      "Product discovery + UX research basado en datos",
      "Growth loops in-app y analytics integrados"
    ],
    metrics: [
      { value: "2-3", label: "squads móvil", description: "iOS + Android nativos" },
      { value: "8-10 Sem", label: "release promedio", description: "App stores publicada" },
      { value: "24/7", label: "monitoreo", description: "Crashlytics + analytics" },
      { value: "+97%", label: "crash-free rate", description: "Estabilidad garantizada" },
    ],
  },
  {
    id: "ia",
    label: "Integración IA",
    icon: "🤖",
    summary: "Modelos propietarios y stack de IA aplicada a operaciones, customer experience y revenue optimization.",
    bullets: [
      "AI Agents & copilots personalizados",
      "NLP en español neutro para LATAM",
      "Automations + data fabric con ML"
    ],
    metrics: [
      { value: "1-2", label: "data scientists", description: "Expertos en ML/AI" },
      { value: "6-8 Sem", label: "release promedio", description: "Modelo productivo" },
      { value: "Real-time", label: "inferencia", description: "Latencia < 200ms" },
      { value: "+85%", label: "accuracy promedio", description: "Modelos optimizados" },
    ],
  },
  {
    id: "crm",
    label: "CRM",
    icon: "📊",
    summary: "Estrategia y despliegue de CRM 360° con playbooks por industria y dashboards ejecutivos en tiempo real.",
    bullets: [
      "Salesforce, HubSpot, Microsoft Dynamics",
      "Integraciones ERP/BI y data warehousing",
      "KPIs personalizados y reporting real-time"
    ],
    metrics: [
      { value: "2-3", label: "squads CRM", description: "Consultores certificados" },
      { value: "10-12 Sem", label: "release promedio", description: "Implementación completa" },
      { value: "100%", label: "data integration", description: "ERP/BI conectado" },
      { value: "+92%", label: "user adoption", description: "Training incluido" },
    ],
  },
  {
    id: "internal",
    label: "Sistemas operativos internos",
    icon: "⚙️",
    summary: "Command centers para operaciones, logística y performance financiero con visibilidad 360°.",
    bullets: [
      "Process mining y optimización de flujos",
      "Digital twins para simulación de escenarios",
      "Alertas inteligentes y predicción de anomalías"
    ],
    metrics: [
      { value: "2-4", label: "squads dedicados", description: "Backend + DevOps" },
      { value: "12-16 Sem", label: "release promedio", description: "Sistema enterprise" },
      { value: "24/7", label: "observabilidad", description: "Monitoreo continuo" },
      { value: "+98%", label: "SLA cumplimiento", description: "Garantía de calidad" },
    ],
  },
];

export default function SoftwareFactory() {
  const [activeId, setActiveId] = useState(capabilities[0].id);
  const activeCapability = capabilities.find((cap) => cap.id === activeId);

  return (
    <section id="software" className="section-padding bg-gradient-to-b from-black via-petrol/20 to-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-20 w-96 h-96 bg-electric/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer()}
      >
        <motion.div variants={fadeIn("up")} className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            className="inline-block mb-6"
          >
            <div className="px-6 py-2 rounded-full bg-gradient-to-r from-electric/20 to-purple-500/20 border border-electric/30">
              <p className="text-xs uppercase tracking-[0.4em] text-electric font-semibold">
                Software Factory
              </p>
            </div>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-5xl mx-auto">
            Ingeniería + producto + <span className="gradient-text">IA aplicada.</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Equipos nearshore dedicados para LATAM y mercados globales.
          </p>
        </motion.div>

        <motion.div className="glass-card p-8 lg:p-12" variants={fadeIn("up", 0.2)}>
          <div className="flex flex-wrap gap-3 mb-10 justify-center">
            {capabilities.map((cap, index) => (
              <motion.button
                key={cap.id}
                type="button"
                onClick={() => setActiveId(cap.id)}
                className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 \${
                  activeId === cap.id
                    ? "bg-electric text-black shadow-lg shadow-electric/30 scale-105"
                    : "bg-white/5 text-white/70 hover:text-white hover:bg-white/10"
                }`}
                whileHover={{ scale: activeId === cap.id ? 1.05 : 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="text-xl">{cap.icon}</span>
                {cap.label}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCapability.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid gap-8 lg:grid-cols-2"
            >
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-5xl">{activeCapability.icon}</span>
                    <h3 className="text-2xl font-bold text-white">{activeCapability.label}</h3>
                  </div>
                  <p className="text-lg text-white/80 leading-relaxed">
                    {activeCapability.summary}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-4">
                    Capacidades Clave
                  </p>
                  <ul className="space-y-4">
                    {activeCapability.bullets.map((bullet, index) => (
                      <motion.li
                        key={bullet}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.06 }}
                        className="flex items-start gap-3 text-white/80"
                      >
                        <motion.span
                          className="mt-1.5 h-2 w-2 rounded-full bg-electric flex-shrink-0"
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                        />
                        <span>{bullet}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              <motion.div
                className="rounded-3xl border border-white/10 p-8 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-xs uppercase tracking-[0.4em] text-white/50 mb-6">
                  Modelo de Delivery
                </p>

                <div className="mb-8">
                  <div className="flex items-center justify-between text-sm text-white/80 mb-2">
                    {["Discovery", "Diseño", "Build", "Escalamiento"].map((step, index) => (
                      <motion.div
                        key={step}
                        className="text-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        <div className="text-white font-semibold">{step}</div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-electric to-purple-500"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  {activeCapability.metrics.map((metric, index) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="group"
                    >
                      <p className="text-white font-bold text-3xl mb-1 group-hover:text-electric transition-colors">
                        {metric.value}
                      </p>
                      <p className="text-white/70 text-sm font-medium mb-1">{metric.label}</p>
                      <p className="text-white/50 text-xs">{metric.description}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-6 border-t border-white/10">
                  <p className="text-sm text-white/60 leading-relaxed">
                    <strong className="text-white/80">Integrado con PMO Brucken:</strong> compliance,
                    governance y trazabilidad completa para garantizar seguridad, calidad y soporte ejecutivo continuo.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <motion.a
            href="#contacto"
            className="cta-button bg-electric text-black hover:bg-white inline-flex items-center gap-3 text-lg px-10 py-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Habla con nuestro equipo técnico
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
