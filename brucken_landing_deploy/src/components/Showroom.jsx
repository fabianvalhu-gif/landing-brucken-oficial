import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../utils/animations";

const logos = [
  { name: "Marca 1", src: "/logos/1.png" },
  { name: "Marca 2", src: "/logos/2.png" },
  { name: "Marca 3", src: "/logos/3.png" },
  { name: "Marca 4", src: "/logos/4.png" },
  { name: "Marca 5", src: "/logos/5.png" },
];

export default function Showroom() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white via-[#f5f6fa] to-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-20 top-10 w-64 h-64 bg-[radial-gradient(circle,rgba(161,0,255,0.12),transparent_60%)] blur-3xl" />
        <div className="absolute right-0 bottom-0 w-72 h-72 bg-[radial-gradient(circle,rgba(255,75,139,0.12),transparent_60%)] blur-3xl" />
      </div>
      <div className="relative section-container">
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-10"
        >
          <motion.div variants={fadeIn("up")} className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="pill-badge mx-auto">Marcas representadas</div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-petrol">
              Aliados y partners que confían en nuestro equipo.
            </h2>
            <p className="text-lg text-muted">
              Un showroom de clientes y partners globales que impulsamos en LATAM.
            </p>
          </motion.div>

          <motion.div
            variants={fadeIn("up", 0.1)}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
          >
            {logos.map((logo, index) => (
              <motion.div
                key={logo.src}
                variants={fadeIn("up", index * 0.05)}
                className="rounded-2xl bg-white border border-neutral-200/80 shadow-soft p-4 flex items-center justify-center transition-transform duration-200 hover:-translate-y-1"
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="h-12 w-auto object-contain"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
