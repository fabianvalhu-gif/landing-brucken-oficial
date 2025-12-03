import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, staggerContainer } from "../utils/animations";

// Categorías de imágenes
const categories = ["Todos", "Consultoría", "Software Factory", "Representación", "Equipo"];

// Galería de imágenes - Reemplaza con tus imágenes reales
const galleryItems = [
  {
    id: 1,
    category: "Consultoría",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    title: "Sesión Estratégica",
    description: "Workshop de planificación con cliente enterprise",
  },
  {
    id: 2,
    category: "Software Factory",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
    title: "Squad de Desarrollo",
    description: "Equipo trabajando en proyecto digital",
  },
  {
    id: 3,
    category: "Representación",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop",
    title: "Reunión Comercial",
    description: "Presentación de marca global a cliente LATAM",
  },
  {
    id: 4,
    category: "Equipo",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=600&fit=crop",
    title: "Nuestro Equipo",
    description: "Consultores senior en acción",
  },
  {
    id: 5,
    category: "Consultoría",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop",
    title: "Análisis de Datos",
    description: "Dashboard de KPIs para optimización operacional",
  },
  {
    id: 6,
    category: "Software Factory",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop",
    title: "Code Review",
    description: "Arquitectos de software en pair programming",
  },
  {
    id: 7,
    category: "Representación",
    image: "https://images.unsplash.com/photo-1560472355-536de3962603?w=800&h=600&fit=crop",
    title: "Evento de Lanzamiento",
    description: "Presentación de nueva marca en mercado LATAM",
  },
  {
    id: 8,
    category: "Equipo",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=600&fit=crop",
    title: "Team Building",
    description: "Cultura colaborativa y de alto desempeño",
  },
  {
    id: 9,
    category: "Consultoría",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop",
    title: "Facilitación Ejecutiva",
    description: "Taller de transformación digital con C-Level",
  },
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [hoveredItem, setHoveredItem] = useState(null);

  const filteredItems =
    selectedCategory === "Todos"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-[#f8f9fa]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(155,172,216,0.12),transparent_30%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(249,133,19,0.12),transparent_26%)]" />
      <motion.div
        className="relative section-container"
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        {/* Header */}
        <motion.div variants={fadeIn("up")} className="text-center mb-10 space-y-3">
          <div className="pill-badge mx-auto">Galería</div>
          <h2 className="text-3xl md:text-4xl font-bold text-petrol">Nuestro trabajo en acción</h2>
          <p className="text-lg text-muted">
            Un vistazo a proyectos, equipo y la forma en que transformamos organizaciones.
          </p>
        </motion.div>

        {/* Filtros de categorías */}
        <motion.div
          variants={fadeIn("up", 0.2)}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 border ${
                selectedCategory === category
                  ? "bg-electric text-white border-electric shadow-soft"
                  : "bg-white text-neutral-700 border-neutral-200 hover:border-electric/60 hover:text-petrol"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Grid de imágenes */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative group cursor-pointer overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-soft"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 bg-white/90 text-petrol text-xs font-semibold rounded-full border border-neutral-200 shadow-soft">
                    {item.category}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                  <h3 className="text-lg font-semibold text-white drop-shadow">
                    {item.title}
                  </h3>
                  <p
                    className={`text-sm text-white/90 transition-all duration-300 ${
                      hoveredItem === item.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                    }`}
                  >
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Call to action */}
        <motion.div
          variants={fadeIn("up", 0.4)}
          className="text-center mt-12"
        >
          <p className="text-neutral-600 mb-4">
            ¿Quieres ver tu organización transformada?
          </p>
          <a
            href="#contacto"
            className="cta-button cta-primary inline-flex"
          >
            Conversemos sobre tu proyecto
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
