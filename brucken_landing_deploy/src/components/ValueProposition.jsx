import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../utils/animations";
import { useState } from "react";

const pillars = [
  {
    id: 1,
    title: "Precisión estratégica",
    subtitle: "Estrategia basada en datos",
    description:
      "Diagnósticos ejecutivos, modelos financieros y roadmaps accionables que priorizan EBIT real y creación de valor.",
    icon: "🎯",
    color: "from-blue-500 via-cyan-500 to-blue-600",
    lightColor: "bg-blue-500/20",
    stats: ["EBIT-focused", "Financial modeling", "Executive roadmaps"],
  },
  {
    id: 2,
    title: "Velocidad operativa",
    subtitle: "Ejecución ágil garantizada",
    description:
      "Squads híbridos que conectan consultores senior con delivery ágil para capturar valor en ciclos mensuales.",
    icon: "⚡",
    color: "from-purple-500 via-pink-500 to-purple-600",
    lightColor: "bg-purple-500/20",
    stats: ["Monthly cycles", "Hybrid squads", "Fast delivery"],
  },
  {
    id: 3,
    title: "Innovación aplicada",
    subtitle: "Tecnología que escala",
    description:
      "Tecnología, datos e IA integradas en procesos comerciales, operativos y productos digitales.",
    icon: "🚀",
    color: "from-orange-500 via-red-500 to-orange-600",
    lightColor: "bg-orange-500/20",
    stats: ["AI-powered", "Data-driven", "Digital products"],
  },
];

export default function ValueProposition() {
  const [hoveredPillar, setHoveredPillar] = useState(null);

  return (
    <section className="section-padding relative overflow-hidden bg-gradient-to-b from-black via-petrol/10 to-black">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-20 w-96 h-96 bg-electric/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Header */}
        <motion.div
          variants={fadeIn("up")}
          className="text-center mb-20"
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
                Nuestra Fórmula
              </p>
            </div>
          </motion.div>

          <motion.h2 
            variants={fadeIn("up", 0.1)} 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-5xl mx-auto"
          >
            Tres pilares para generar soluciones{" "}
            <span className="gradient-text">corporativas</span> de alto impacto.
          </motion.h2>
          
          <motion.p 
            variants={fadeIn("up", 0.2)} 
            className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed"
          >
            Diseñamos sistemas completos donde la estrategia, la tecnología y la ejecución comercial se
            alimentan en tiempo real para capturar oportunidades en LATAM y mercados globales.
          </motion.p>
        </motion.div>

        {/* Pillars - Interactive Cards */}
        <div className="grid gap-8 lg:grid-cols-3 mb-16">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              onHoverStart={() => setHoveredPillar(pillar.id)}
              onHoverEnd={() => setHoveredPillar(null)}
              className="group relative"
            >
              {/* Gradient glow effect */}
              <motion.div
                className={`absolute -inset-1 bg-gradient-to-r ${pillar.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`}
                animate={{
                  opacity: hoveredPillar === pillar.id ? 0.6 : 0,
                }}
              />

              {/* Card */}
              <motion.div
                className="relative glass-card p-8 h-full flex flex-col"
                whileHover={{ 
                  y: -12,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              >
                {/* Icon with animated background */}
                <div className="mb-6 relative">
                  <motion.div
                    className={`absolute inset-0 ${pillar.lightColor} rounded-full blur-2xl`}
                    animate={{
                      scale: hoveredPillar === pillar.id ? [1, 1.3, 1] : 1,
                    }}
                    transition={{ duration: 1, repeat: hoveredPillar === pillar.id ? Infinity : 0 }}
                  />
                  <motion.div
                    className="relative text-7xl"
                    animate={{
                      scale: hoveredPillar === pillar.id ? [1, 1.1, 1] : 1,
                      rotate: hoveredPillar === pillar.id ? [0, 10, -10, 0] : 0,
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    {pillar.icon}
                  </motion.div>
                </div>

                {/* Number badge */}
                <motion.div
                  className={`inline-block px-4 py-1 rounded-full text-xs font-bold mb-4 bg-gradient-to-r ${pillar.color} text-white w-fit`}
                  animate={{
                    scale: hoveredPillar === pillar.id ? 1.1 : 1,
                  }}
                >
                  PILAR {String(pillar.id).padStart(2, '0')}
                </motion.div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-electric transition-colors duration-300">
                  {pillar.title}
                </h3>

                {/* Subtitle */}
                <p className="text-sm text-electric uppercase tracking-wider mb-4 font-semibold">
                  {pillar.subtitle}
                </p>

                {/* Description */}
                <p className="text-white/70 text-sm leading-relaxed mb-6 flex-grow">
                  {pillar.description}
                </p>

                {/* Stats pills */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                  {pillar.stats.map((stat, idx) => (
                    <motion.span
                      key={stat}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + idx * 0.1 }}
                      className="px-3 py-1 rounded-full bg-white/5 text-white/60 text-xs font-medium hover:bg-white/10 hover:text-white transition-all"
                    >
                      {stat}
                    </motion.span>
                  ))}
                </div>

                {/* Hover arrow */}
                <motion.div
                  className="absolute bottom-6 right-6 text-electric"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{
                    opacity: hoveredPillar === pillar.id ? 1 : 0,
                    x: hoveredPillar === pillar.id ? 0 : -10,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7V17"/>
                  </svg>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Connection visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="glass-card p-8 md:p-12 text-center"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 mb-6">
            <motion.div
              className="flex items-center gap-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-2xl">
                🎯
              </div>
              <span className="text-white font-semibold">Estrategia</span>
            </motion.div>

            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-electric text-2xl hidden md:block"
            >
              +
            </motion.div>

            <motion.div
              className="flex items-center gap-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-2xl">
                ⚡
              </div>
              <span className="text-white font-semibold">Velocidad</span>
            </motion.div>

            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              className="text-electric text-2xl hidden md:block"
            >
              +
            </motion.div>

            <motion.div
              className="flex items-center gap-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-2xl">
                🚀
              </div>
              <span className="text-white font-semibold">Innovación</span>
            </motion.div>

            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="text-electric text-2xl hidden md:block"
            >
              =
            </motion.div>

            <motion.div
              className="flex items-center gap-4 px-6 py-3 rounded-full bg-gradient-to-r from-electric/20 to-purple-500/20 border border-electric"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-electric font-bold text-lg">Alto Impacto</span>
              <span className="text-2xl">💎</span>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="text-white/60 text-sm max-w-2xl mx-auto"
          >
            La sinergia de nuestros tres pilares crea un ecosistema completo que acelera resultados y 
            maximiza el retorno de inversión en cada proyecto.
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}
