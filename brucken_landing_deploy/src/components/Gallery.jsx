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
    <section className="section-padding bg-gradient-to-b from-black via-black/98 to-black">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Header */}
        <motion.div variants={fadeIn("up")} className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            className="inline-block mb-6"
          >
            <div className="px-6 py-2 rounded-full bg-gradient-to-r from-electric/20 to-purple-500/20 border border-electric/30">
              <p className="text-xs uppercase tracking-[0.4em] text-electric font-semibold">
                Galería
              </p>
            </div>
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Nuestro Trabajo en Acción
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Un vistazo a nuestros proyectos, equipo y la forma en que transformamos organizaciones
          </p>
        </motion.div>

        {/* Filtros de categorías */}
        <motion.div
          variants={fadeIn("up", 0.2)}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-electric text-black shadow-glow"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10"
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
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="relative group cursor-pointer overflow-hidden rounded-2xl aspect-[4/3]"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {/* Imagen */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Badge de categoría */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 bg-electric/90 text-black text-xs font-medium rounded-full">
                    {item.category}
                  </span>
                </div>

                {/* Contenido */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p
                    className={`text-sm text-white/80 transition-all duration-300 ${
                      hoveredItem === item.id
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-2"
                    }`}
                  >
                    {item.description}
                  </p>
                </div>

                {/* Borde animado en hover */}
                <div className="absolute inset-0 border-2 border-electric/0 group-hover:border-electric/50 rounded-2xl transition-all duration-300" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Call to action */}
        <motion.div
          variants={fadeIn("up", 0.4)}
          className="text-center mt-16"
        >
          <p className="text-white/60 mb-6">
            ¿Quieres ver tu organización transformada?
          </p>
          <a
            href="#contacto"
            className="cta-button bg-electric text-black shadow-glow hover:bg-white inline-flex"
          >
            Conversemos sobre tu proyecto
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
