import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../utils/animations";

const brands = [
  { name: "Aufbruch", logo: "/logos/1.png", country: "DE" },
  { name: "Guardian", logo: "/logos/2.png", country: "US" },
  { name: "Logmasters", logo: "/logos/3.png", country: "BR" },
  { name: "SMZ", logo: "/logos/4.png", country: "CL" },
  { name: "Helios", logo: "/logos/5.png", country: "AR" },
];

export default function BrandsCarousel() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden bg-[#f8f9fa]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(155,172,216,0.12),transparent_30%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_5%,rgba(249,133,19,0.12),transparent_28%)]" />
      <motion.div
        className="relative section-container"
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.div variants={fadeIn("up")} className="text-center mb-12 space-y-3">
          <div className="pill-badge mx-auto">Nuestras Marcas</div>
          <h2 className="text-3xl md:text-4xl font-bold text-petrol">Marcas que representamos</h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Conectamos empresas globales líderes con oportunidades de crecimiento en América Latina.
          </p>
        </motion.div>

        <motion.div variants={fadeIn("up", 0.15)} className="relative w-full">
          <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-white via-white/60 to-white/40 blur-3xl" />
          <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 p-5 rounded-[24px] border border-white/60 bg-white/90 shadow-[0_20px_50px_-22px_rgba(15,23,42,0.35)] backdrop-blur">
            {brands.map((brand, index) => (
              <motion.div
                key={brand.name}
                className="group relative flex items-center justify-center rounded-2xl border border-neutral-200/70 bg-gradient-to-br from-white to-[#f8f9fa] px-4 py-3 shadow-soft"
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 220, damping: 16 }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-electric/10 via-white to-purple-100/30 rounded-2xl" />
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="relative z-10 h-14 sm:h-16 object-contain mix-blend-multiply grayscale group-hover:grayscale-0 transition-all duration-300"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                <div className="absolute bottom-2 right-3 text-[10px] font-semibold text-neutral-400 uppercase tracking-wide">
                  {brand.country}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={fadeIn("up", 0.3)}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
        >
          {[
            { value: "5", label: "Marcas representadas" },
            { value: "+7", label: "Países" },
            { value: "+500", label: "Clientes" },
            { value: "90%", label: "Retención" },
          ].map((stat) => (
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
    </section>
  );
}
