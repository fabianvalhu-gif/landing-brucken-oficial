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
      "Accesibilidad AA y optimización SEO",
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
      "Growth loops in-app y analytics integrados",
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
      "Automations + data fabric con ML",
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
      "KPIs personalizados y reporting real-time",
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
      "Alertas inteligentes y predicción de anomalías",
    ],
    metrics: [
      { value: "2-4", label: "squads dedicados", description: "Backend + DevOps" },
      { value: "12-16 Sem", label: "release promedio", description: "Sistema enterprise" },
      { value: "24/7", label: "observabilidad", description: "Monitoreo continuo" },
      { value: "+98%", label: "SLA cumplimiento", description: "Garantía de calidad" },
    ],
  },
];

const process = [
  { step: "01", name: "Discovery", description: "Diagnóstico y value cases" },
  { step: "02", name: "Diseño", description: "Arquitectura + UX/UI" },
  { step: "03", name: "Build", description: "Sprints quincenales con QA" },
  { step: "04", name: "Escalamiento", description: "Observabilidad + growth" },
];

export default function SoftwareFactory() {
  const [activeId, setActiveId] = useState(capabilities[0].id);
  const activeCapability = capabilities.find((cap) => cap.id === activeId);

  return (
    <section id="software" className="relative py-16 sm:py-20 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(27,118,255,0.07),transparent_30%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_0%,rgba(124,58,237,0.05),transparent_32%)]" />
      <div className="relative section-container">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer()}
          className="space-y-10"
        >
          <motion.div variants={fadeIn("up", 0.05)} className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="pill-badge mx-auto">Software Factory</div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-petrol">
              Ingeniería + producto + <span className="gradient-text">IA aplicada.</span>
            </h2>
            <p className="text-lg text-muted">
              Equipos nearshore dedicados para LATAM y mercados globales. Delivery seguro con governance y trazabilidad.
            </p>
          </motion.div>

          <div className="glass-card p-6 sm:p-8 space-y-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {capabilities.map((cap) => (
                <motion.button
                  key={cap.id}
                  type="button"
                  onClick={() => setActiveId(cap.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 border ${
                    activeId === cap.id
                      ? "bg-electric text-white border-electric shadow-soft"
                      : "bg-white text-neutral-700 border-neutral-200 hover:border-electric/60 hover:text-petrol"
                  }`}
                  whileHover={{ scale: activeId === cap.id ? 1.03 : 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="mr-2">{cap.icon}</span>
                  {cap.label}
                </motion.button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCapability.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]"
              >
                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <div className="text-4xl" aria-hidden>{activeCapability.icon}</div>
                    <div>
                      <h3 className="text-2xl font-bold text-petrol">{activeCapability.label}</h3>
                      <p className="text-neutral-600 text-sm mt-1 uppercase tracking-[0.2em]">
                        Modelo de delivery
                      </p>
                    </div>
                  </div>
                  <p className="text-neutral-700 text-base leading-relaxed">
                    {activeCapability.summary}
                  </p>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-neutral-500 mb-3">
                      Capacidades clave
                    </p>
                    <ul className="space-y-3">
                      {activeCapability.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2 text-neutral-700">
                          <span className="mt-1 h-2 w-2 rounded-full bg-electric" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="rounded-2xl border border-neutral-200 bg-white shadow-soft p-6 space-y-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-neutral-500 mb-2">
                      Proceso de entrega
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {process.map((item) => (
                        <div key={item.step} className="p-3 rounded-xl border border-neutral-200 bg-neutral-50">
                          <p className="text-sm font-bold text-petrol">{item.step}</p>
                          <p className="text-xs text-neutral-600">{item.name}</p>
                          <p className="text-[11px] text-neutral-500 mt-1">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {activeCapability.metrics.map((metric) => (
                      <div key={metric.label} className="p-3 rounded-xl border border-neutral-200 bg-neutral-50">
                        <p className="text-xl font-semibold text-petrol">{metric.value}</p>
                        <p className="text-sm font-semibold text-neutral-700">{metric.label}</p>
                        <p className="text-xs text-neutral-500">{metric.description}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-electric/10 border border-electric/30 text-electric flex items-center justify-center font-bold">
                      QA
                    </div>
                    <p className="text-sm text-neutral-700">
                      Integrado con PMO Brucken: compliance, governance y trazabilidad completa para seguridad y calidad.
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
