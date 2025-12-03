import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../utils/animations";

// Marcas representadas
const brands = [
  { name: "Marca 1", logo: "/logos/1.png" },
  { name: "Marca 2", logo: "/logos/2.png" },
  { name: "Marca 3", logo: "/logos/3.png" },
  { name: "Marca 4", logo: "/logos/4.png" },
  { name: "Marca 5", logo: "/logos/5.png" },
];

export default function BrandsCarousel() {
  // Duplicar las marcas para efecto infinito
  const duplicatedBrands = [...brands, ...brands];

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(27,118,255,0.05),transparent_30%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_5%,rgba(124,58,237,0.05),transparent_28%)]" />
      <motion.div
        className="relative section-container"
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Header */}
        <motion.div variants={fadeIn("up")} className="text-center mb-12 space-y-3">
          <div className="pill-badge mx-auto">Nuestras Marcas</div>
          <h2 className="text-3xl md:text-4xl font-bold text-petrol">Marcas que representamos</h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Conectamos empresas globales líderes con oportunidades de crecimiento en América Latina.
          </p>
        </motion.div>

        {/* Carrusel infinito */}
        <motion.div variants={fadeIn("up", 0.2)} className="relative">
          {/* Gradientes en los bordes */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />

          {/* Contenedor del carrusel */}
          <div className="flex overflow-hidden border border-neutral-200 rounded-2xl bg-white shadow-soft">
            <motion.div
              className="flex gap-10 py-6"
              animate={{
                x: [0, -1600],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
            >
              {duplicatedBrands.map((brand, index) => (
                <div
                  key={`${brand.name}-${index}`}
                  className="flex-shrink-0 w-[220px] h-[110px] flex items-center justify-center p-3 grayscale hover:grayscale-0 transition-all duration-300"
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-full h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Stats debajo del carrusel */}
          <motion.div
            variants={fadeIn("up", 0.35)}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10"
          >
            {[
              { value: "10+", label: "Marcas representadas" },
              { value: "15+", label: "Países" },
              { value: "182+", label: "Clientes activos" },
              { value: "92%", label: "Retención" },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="text-center rounded-2xl border border-neutral-200 bg-white p-5 shadow-soft"
              >
                <div className="text-2xl md:text-3xl font-bold text-petrol mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-neutral-600">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
