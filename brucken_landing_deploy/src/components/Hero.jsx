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
      className="relative overflow-hidden pt-28 pb-20"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2200&q=80')] bg-cover bg-center opacity-35" aria-hidden />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,#0c102a_0%,#111144_45%,#1f0900_90%)] opacity-92" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_35%,rgba(155,172,216,0.35),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_20%,rgba(249,133,19,0.28),transparent_32%)]" />
      <div className="absolute inset-0 bg-gradient-to-br from-black/35 via-transparent to-black/25" />
      <div className="absolute -right-24 top-10 w-[520px] h-[520px] bg-[radial-gradient(circle,rgba(249,133,19,0.35)_0%,rgba(249,133,19,0)_60%)] blur-3xl opacity-70 pointer-events-none" />
      <div className="absolute -left-32 bottom-0 w-[620px] h-[480px] bg-[radial-gradient(circle,rgba(34,51,130,0.35)_0%,rgba(34,51,130,0)_60%)] blur-3xl opacity-60 pointer-events-none" />

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
            className="pill-badge w-fit bg-white/10 border-white/20 text-white/90"
          >
            Inteligencia + Ejecución + Tecnología
          </motion.div>
          <motion.h1
            variants={fadeIn("up", 0.1)}
            className="text-4xl md:text-5xl lg:text-[58px] leading-[1.05] font-bold drop-shadow-2xl"
          >
            Consultoría estratégica y software factory{" "}
            <span className="gradient-text">para LATAM & global.</span>
          </motion.h1>
          <motion.p
            variants={fadeIn("up", 0.2)}
            className="text-lg text-white/85 max-w-2xl drop-shadow-md"
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
              className="cta-button cta-primary shadow-[0_15px_45px_rgba(249,133,19,0.35)]"
            >
              Agenda una reunión
            </a>
            <a
              href="#consultoria"
              className="cta-button cta-secondary bg-white/90 text-petrol"
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
                className="px-3 py-2 rounded-full bg-white/10 border border-white/25 text-sm text-white/90 backdrop-blur"
              >
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative">
          <motion.div
            className="glass-card p-8 lg:p-10 rounded-3xl border-white/30 bg-white/92 text-petrol shadow-[0_20px_60px_rgba(17,17,68,0.22)]"
            style={{
              transform: `perspective(1200px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
            }}
            variants={fadeIn("left", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
          >
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
                Playbook Brucken
              </p>
              <h2 className="text-2xl font-semibold text-petrol">
                Precisión estratégica +{" "}
                <span className="gradient-text">software factory de alto desempeño</span> + ejecución comercial.
              </h2>
              <p className="text-sm text-neutral-600 leading-relaxed">
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
                  className="rounded-2xl border border-neutral-200/90 bg-gradient-to-br from-white to-[rgba(155,172,216,0.18)] px-4 py-3 shadow-[0_12px_30px_rgba(34,51,130,0.12)]"
                >
                  <p className="text-2xl font-semibold text-petrol">{stat.value}</p>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">
                    {stat.label}
                  </p>
                  <p className="text-[12px] text-neutral-500 mt-1">{stat.detail}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          <motion.div
            className="absolute -right-12 -bottom-10 w-36 h-36 rounded-full bg-[rgba(249,133,19,0.35)] blur-3xl"
            {...floatVariant}
          />
        </div>
      </div>
    </section>
  );
}
