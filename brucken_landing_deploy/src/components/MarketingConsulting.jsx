import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../utils/animations";

const marketingServices = [
  {
    title: "Estrategia de crecimiento",
    subtitle: "Growth marketing & performance",
    bullets: [
      "Funnels full-funnel con adquisición, activación y retención",
      "Paid media multicanal (Meta, Google, LinkedIn, TikTok)",
      "Experimentación continua (A/B, multivariante, incrementality)",
    ],
  },
  {
    title: "Contenido + RRSS",
    subtitle: "Brand + social + influencers",
    bullets: [
      "Calendarios editoriales y playbooks por red",
      "Influencer marketing y UGC con medición clara",
      "Live commerce, short-form video y comunidades",
    ],
  },
  {
    title: "SEO / ASO / CRO",
    subtitle: "Tráfico orgánico y conversión",
    bullets: [
      "SEO técnico + contenidos E-E-A-T",
      "ASO para stores (keywords, creatividades, rating)",
      "Optimización de conversión y velocidad (CRO/UX)",
    ],
  },
  {
    title: "Automatización & CRM",
    subtitle: "Lifecycle & revenue ops",
    bullets: [
      "Automations en email/WhatsApp/SMS con segmentación",
      "Lead scoring, nurturing y playbooks de ventas",
      "Integración con CRM/CDP y journeys omnicanal",
    ],
  },
  {
    title: "Analítica avanzada",
    subtitle: "Data & atribución",
    bullets: [
      "Atribución media mix, GA4 + server-side tracking",
      "Dashboards ejecutivos y alertas en tiempo real",
      "Modelos de propensión, LTV y churn prevention",
    ],
  },
  {
    title: "Estrategia de negocio",
    subtitle: "Go-to-market & pricing",
    bullets: [
      "Definición de ICP y propuestas de valor",
      "Pricing dinámico y bundles por segmento",
      "ABM para B2B y alianzas estratégicas",
    ],
  },
];

export default function MarketingConsulting() {
  return (
    <section id="marketing" className="relative py-16 sm:py-20 lg:py-24 bg-[#f8f9fa]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(161,0,255,0.08),transparent_32%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_12%,rgba(255,75,139,0.08),transparent_32%)]" />
      <div className="relative section-container">
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-10"
        >
          <motion.div variants={fadeIn("up")} className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="pill-badge mx-auto">Consultoría de Marketing</div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-petrol">
              Marketing, RRSS y analítica avanzada para crecer con precisión.
            </h2>
            <p className="text-lg text-muted">
              Estrategias en tendencia: growth, performance, contenido, automatización, data y pricing para acelerar revenue.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {marketingServices.map((service, index) => (
              <motion.article
                key={service.title}
                variants={fadeIn("up", index * 0.05)}
                className="rounded-2xl bg-white border border-neutral-200 shadow-soft p-6 space-y-3"
                whileHover={{ y: -6 }}
              >
                <h3 className="text-xl font-bold text-petrol">{service.title}</h3>
                <p className="text-sm font-semibold text-electric uppercase tracking-[0.16em]">{service.subtitle}</p>
                <ul className="space-y-2 text-sm text-[#374151] text-left">
                  {service.bullets.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-[#a100ff]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
