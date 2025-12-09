import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function WelcomeBanner() {
  const slides = ["/gallery/tesche.png", "/gallery/uniglory.png"];
  const [index, setIndex] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  const next = () => setIndex((i) => (i + 1) % slides.length);
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);

  return (
    <section ref={ref} className="w-full bg-white relative">
      <div className="w-full overflow-hidden">
        <motion.div
          className="flex w-full"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1, x: `-${index * 100}%` } : { opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {slides.map((src, i) => (
            <div key={src} className="w-full flex-shrink-0">
              <img
                src={src}
                alt={i === 0 ? "Tesche Banner" : "Uniglory Banner"}
                className="w-full h-auto block"
                loading="lazy"
                style={{ display: "block" }}
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Controls */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-auto">
          <button
            onClick={prev}
            aria-label="Anterior"
            className="bg-white/80 hover:bg-white px-3 py-2 rounded-full shadow-md backdrop-blur"
          >
            ‹
          </button>
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-auto">
          <button
            onClick={next}
            aria-label="Siguiente"
            className="bg-white/80 hover:bg-white px-3 py-2 rounded-full shadow-md backdrop-blur"
          >
            ›
          </button>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Ir a slide ${i + 1}`}
            className={`w-3 h-3 rounded-full ${i === index ? "bg-petrol" : "bg-neutral-300"}`}
          />
        ))}
      </div>
    </section>
  );
}
