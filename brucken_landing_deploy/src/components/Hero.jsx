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
      className="relative overflow-hidden -mt-16 lg:-mt-20 pt-40 lg:pt-48 pb-28 min-h-screen"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 bg-white" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(161,0,255,0.08),transparent_45%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,75,139,0.08),transparent_38%)]" />
      <div className="absolute inset-0 bg-[url('/hero.jpg')] bg-cover bg-center opacity-12 mix-blend-multiply" />
      <div className="absolute inset-x-0 bottom-[-10%] h-[70%] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(0,0,0,0.04),transparent)]" />

      <div className="relative z-10 section-container grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center text-white">
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="space-y-7"
        >
          <motion.div
            variants={fadeIn("up", 0)}
            className="pill-badge w-fit"
          >
            Inteligencia + Ejecución + Tecnología
          </motion.div>
          <motion.h1
            variants={fadeIn("up", 0.1)}
            className="text-4xl md:text-5xl lg:text-[56px] leading-[1.08] font-bold text-[#111827]"
          >
            Consultoría estratégica y software factory{" "}
            <span className="gradient-text">para LATAM & global.</span>
          </motion.h1>
          <motion.p
            variants={fadeIn("up", 0.2)}
            className="text-lg text-[#374151] max-w-2xl"
          >
            Aceleramos crecimiento, optimizamos operaciones y ejecutamos expansión comercial con squads
            híbridos senior + delivery ágil, desde la estrategia hasta el revenue.
          </motion.p>
          <motion.div
            variants={fadeIn("up", 0.3)}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#contacto"
              className="cta-button cta-primary"
            >
              Agenda una reunión
            </a>
            <a
              href="#consultoria"
              className="cta-button cta-secondary"
            >
              Ver consultoría
            </a>
          </motion.div>
          <motion.div
            variants={fadeIn("up", 0.35)}
            className="flex flex-wrap gap-4"
          >
            {["C-level advisory", "Playbooks de revenue", "IA aplicada"].map((item) => (
              <span
                key={item}
                className="px-3 py-2 rounded-full bg-[#f5f6fa] border border-[#e5e7eb] text-sm text-[#374151]"
              >
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative">
          <motion.div
            className="glass-card p-8 lg:p-10 rounded-3xl text-[#111827]"
            style={{
              transform: `perspective(1200px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
            }}
            variants={fadeIn("left", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
          >
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#374151]">
                Playbook Brucken
              </p>
              <h2 className="text-2xl font-semibold text-[#111827]">
                Precisión estratégica +{" "}
                <span className="gradient-text">software factory de alto desempeño</span> + ejecución comercial.
              </h2>
              <p className="text-sm text-[#374151] leading-relaxed">
                Modelamos, priorizamos y ejecutamos iniciativas con squads híbridos que conectan consultores
                senior, diseñadores de producto y arquitectos de negocio.
              </p>
            </div>
            <motion.div
              className="mt-8 grid gap-4 md:grid-cols-3"
              variants={staggerContainer(0.1, 0.4)}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={fadeIn("up", index * 0.1)}
                  className="rounded-2xl border border-[#e5e7eb] bg-[#f5f6fa] px-4 py-3 shadow-[0_12px_30px_rgba(17,24,39,0.08)]"
                >
                  <p className="text-2xl font-semibold text-[#a100ff]">{stat.value}</p>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[#374151]">
                    {stat.label}
                  </p>
                  <p className="text-[12px] text-[#374151] mt-1">{stat.detail}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          <motion.div
            className="absolute -right-12 -bottom-10 w-36 h-36 rounded-full bg-[rgba(161,0,255,0.18)] blur-3xl"
            {...floatVariant}
          />
        </div>
      </div>
    </section>
  );
}
