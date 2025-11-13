import { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer, floatVariant } from "../utils/animations";

const stats = [
  { label: "Áreas de consultoría", value: "5", detail: "Estrategia a ejecución" },
  { label: "Marcas globales", value: "20+", detail: "Representadas en LATAM" },
  { label: "Tiempo promedio", value: "6-12m", detail: "Proyectos estratégicos" },
];

export default function Hero() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - left) / width - 0.5) * 4;
    const y = ((event.clientY - top) / height - 0.5) * 4;
    setTilt({ x, y });
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-b from-black via-ebony to-black pt-36 pb-24"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_top,_#1b76ff33,_transparent_50%)]" />
      <div className="absolute inset-y-0 left-1/2 w-1/2 bg-hero-grid bg-[length:140px_140px] opacity-40" />
      <div className="relative z-10 section-padding grid gap-12 lg:grid-cols-2 lg:items-center">
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="space-y-8"
        >
          <motion.span
            variants={fadeIn("up", 0)}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.4em] text-white/60"
          >
            Inteligencia + Ejecución + Tecnología
          </motion.span>
          <motion.h1
            variants={fadeIn("up", 0.1)}
            className="text-4xl leading-tight font-semibold text-white md:text-5xl lg:text-6xl"
          >
            Consultoría estratégica, innovación digital y representación comercial para
            <span className="gradient-text"> LATAM & Global Markets</span>.
          </motion.h1>
          <motion.p
            variants={fadeIn("up", 0.2)}
            className="text-lg text-white/70 max-w-xl"
          >
            Aceleramos crecimiento, optimizamos operaciones y construimos soluciones tecnológicas
            de clase mundial para organizaciones que buscan dominar los mercados más competitivos.
          </motion.p>
          <motion.div
            variants={fadeIn("up", 0.3)}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#contacto"
              className="cta-button bg-electric text-black shadow-glow hover:bg-white"
            >
              Agenda una reunión
            </a>
          </motion.div>
        </motion.div>

        <div className="relative">
          <motion.div
            className="glass-card p-10 rounded-[32px]"
            style={{
              transform: `perspective(1200px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
            }}
            variants={fadeIn("left", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
          >
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.3em] text-white/60">
                Playbook Brucken
              </p>
              <h2 className="text-3xl font-semibold">
                Precisión estratégica + <span className="gradient-text">Software factory de alto desempeño</span> + Ejecución comercial.
              </h2>
              <p className="text-sm text-white/70 leading-relaxed">
                Modelamos, priorizamos y ejecutamos iniciativas con squads híbridos que conectan
                consultores senior, diseñadores de producto y arquitectos de negocio.
              </p>
            </div>
            <motion.div className="mt-10 grid gap-6 md:grid-cols-3" variants={staggerContainer(0.1, 0.4)}>
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={fadeIn("up", index * 0.1)}
                  className="border border-white/10 rounded-2xl px-4 py-3"
                >
                  <p className="text-2xl font-semibold text-white">{stat.value}</p>
                  <p className="text-xs uppercase tracking-wide text-white/60">
                    {stat.label}
                  </p>
                  <p className="text-[11px] text-white/50 mt-1">{stat.detail}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          <motion.div
            className="absolute -right-12 -bottom-12 w-32 h-32 rounded-full bg-electric blur-3xl opacity-50"
            {...floatVariant}
          />
        </div>
      </div>
    </section>
  );
}
