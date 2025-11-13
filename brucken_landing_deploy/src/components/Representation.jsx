import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../utils/animations";
import { useState } from "react";

const steps = [
  { 
    number: "01",
    title: "Abrimos mercados", 
    detail: "Inteligencia comercial, hunting y due diligence local.",
    icon: "🌎",
    color: "from-blue-500 to-cyan-500"
  },
  { 
    number: "02",
    title: "Negociamos", 
    detail: "Equipo senior con experiencia C-level y metodologías consultoras.",
    icon: "🤝",
    color: "from-purple-500 to-pink-500"
  },
  {
    number: "03",
    title: "Gestionamos distribuidores",
    detail: "Onboarding, incentivos y governance KPI-driven en cada país.",
    icon: "📊",
    color: "from-green-500 to-emerald-500"
  },
  { 
    number: "04",
    title: "Construimos presencia regional", 
    detail: "PR, marketing account-based y eventos privados.",
    icon: "🚀",
    color: "from-orange-500 to-red-500"
  },
  { 
    number: "05",
    title: "KPI-driven execution", 
    detail: "Dashboards ejecutivos conectados al pipeline y revenue.",
    icon: "📈",
    color: "from-indigo-500 to-purple-500"
  },
  { 
    number: "06",
    title: "Escalamos resultados", 
    detail: "Optimización continua y expansión a nuevos territorios con modelo probado.",
    icon: "⚡",
    color: "from-yellow-500 to-orange-500"
  },
];

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95
  },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  })
};

export default function Representation() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id="representacion" className="section-padding bg-gradient-to-b from-black via-black/95 to-black">
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer()}
      >
        {/* Header */}
        <motion.div variants={fadeIn("up")} className="text-center mb-16">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            className="inline-block mb-6"
          >
            <div className="px-6 py-2 rounded-full bg-gradient-to-r from-electric/20 to-purple-500/20 border border-electric/30">
              <p className="text-xs uppercase tracking-[0.4em] text-electric font-semibold">
                Representación Comercial
              </p>
            </div>
          </motion.div>
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Ejecutamos expansión con presencia en terreno,{" "}
            <span className="gradient-text">governance y accountability</span> semanal.
          </motion.h2>
          <motion.p
            className="text-white/70 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Un proceso estructurado de 6 pasos para llevar tu empresa a nuevos mercados con éxito garantizado.
          </motion.p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="relative group"
            >
              {/* Gradient Border Effect */}
              <motion.div
                className="absolute -inset-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 rounded-3xl blur transition duration-500"
                style={{
                  backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
                }}
                animate={{
                  opacity: hoveredIndex === index ? 0.7 : 0,
                }}
              />
              
              {/* Card Content */}
              <motion.div
                className="relative glass-card p-8 h-full cursor-pointer"
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              >
                {/* Icon with Animation */}
                <motion.div 
                  className="text-6xl mb-4"
                  animate={{
                    scale: hoveredIndex === index ? [1, 1.2, 1] : 1,
                    rotate: hoveredIndex === index ? [0, 10, -10, 0] : 0,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {step.icon}
                </motion.div>

                {/* Number Badge */}
                <motion.div 
                  className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 bg-gradient-to-r ${step.color} text-white`}
                  animate={{
                    scale: hoveredIndex === index ? 1.1 : 1,
                  }}
                >
                  {step.number}
                </motion.div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-electric transition-colors duration-300">
                  {step.title}
                </h3>

                {/* Detail */}
                <p className="text-white/70 text-sm leading-relaxed">
                  {step.detail}
                </p>

                {/* Arrow Indicator */}
                <motion.div
                  className="absolute bottom-8 right-8 text-electric opacity-0 group-hover:opacity-100"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{
                    x: hoveredIndex === index ? 0 : -10,
                    opacity: hoveredIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.a
            href="#contacto"
            className="cta-button bg-electric text-black hover:bg-white inline-flex items-center gap-3 text-lg px-10 py-5"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Hablemos de tu expansión
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
