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
    <section className="section-padding bg-gradient-to-b from-black via-black/95 to-black overflow-hidden">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
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
                Nuestras Marcas
              </p>
            </div>
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Marcas que Representamos
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Conectamos empresas globales líderes con oportunidades de crecimiento en América Latina
          </p>
        </motion.div>

        {/* Carrusel infinito */}
        <motion.div
          variants={fadeIn("up", 0.2)}
          className="relative"
        >
          {/* Gradientes en los bordes */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

          {/* Contenedor del carrusel */}
          <div className="flex overflow-hidden">
            <motion.div
              className="flex gap-12 py-8"
              animate={{
                x: [0, -1600], // Ajusta según el ancho total
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
                  key={index}
                  className="flex-shrink-0 w-[280px] h-[140px] glass-card flex items-center justify-center p-2 group hover:border-electric/50 transition-all duration-300"
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                    onError={(e) => {
                      console.error(`Error loading logo: ${brand.logo}`);
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Stats debajo del carrusel */}
          <motion.div
            variants={fadeIn("up", 0.4)}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          >
            {[
              { value: "10+", label: "Marcas Representadas" },
              { value: "15+", label: "Países" },
              { value: "182+", label: "Clientes Activos" },
              { value: "92%", label: "Tasa de Retención" },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 glass-card hover:border-electric/30 transition-all duration-300"
              >
                <div className="text-3xl md:text-4xl font-bold text-electric mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
