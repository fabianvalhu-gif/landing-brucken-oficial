import { motion } from "framer-motion";
import { fadeIn, staggerContainer, scaleFade } from "../utils/animations";

const projects = [
  {
    title: "Motrik",
    description: "Plataforma B2B para distribución de equipos industriales con pricing dinámico.",
    tags: ["E-commerce B2B", "CRM", "LATAM"],
  },
  {
    title: "Motrik Link",
    description: "Red de service partners conectada con IoT y tableros predictivos.",
    tags: ["IoT", "Predictive Ops"],
  },
  {
    title: "Marketplace Neumáticos",
    description: "Marketplace multimarcas con financiamiento integrado y logística orquestada.",
    tags: ["Marketplace", "Fintech"],
  },
  {
    title: "Sistema de postventa",
    description: "Suite para postventa automotriz con SLA tracking y asistentes IA.",
    tags: ["Customer Success", "IA"],
  },
  {
    title: "Dashboards empresariales",
    description: "Capa de inteligencia para CFOs con datos consolidados y alertas en tiempo real.",
    tags: ["BI", "Data Ops"],
  },
];

export default function Projects() {
  return (
    <section id="proyectos" className="section-padding">
      <motion.div
        className="max-w-6xl mx-auto"
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
      >
        <motion.header variants={fadeIn("up")} className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">
            Portafolio
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold mt-3">
            Casos y productos que trasladan estrategia a resultados concretos.
          </h2>
        </motion.header>

        <motion.div
          className="grid gap-6 md:grid-cols-2"
          variants={staggerContainer(0.15, 0.3)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              variants={scaleFade(index * 0.05)}
              className="glass-card p-6 flex flex-col justify-between hover:-translate-y-1.5"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-white/50 mb-2">
                  Proyecto {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="text-2xl font-semibold">{project.title}</h3>
                <p className="text-white/70 mt-3 text-sm">{project.description}</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs uppercase tracking-wide bg-white/10 px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
