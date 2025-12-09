import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function WelcomeBanner() {
  const slides = [
    { src: "/gallery/tesche.png", alt: "Tesche Banner" },
    { src: "/gallery/uniglory.png", alt: "Uniglory Banner" },
  ];
  const [index, setIndex] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.25, triggerOnce: true });

  // Avance automático mientras el componente está en vista
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 4800);
    return () => clearInterval(id);
  }, [inView, slides.length]);

  const goTo = (i) => setIndex(i % slides.length);

  return (
    <section ref={ref} className="relative py-10 sm:py-14 lg:py-16 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(155,172,216,0.12),transparent_30%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(34,51,130,0.12),transparent_26%)]" />
      <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen">
        <motion.div
          className="relative w-full overflow-hidden"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Fundido lateral para integrar con el fondo */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white via-white/70 to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white via-white/70 to-transparent z-10" />

          <div className="relative w-full bg-transparent">
            <div className="aspect-[16/6] sm:aspect-[16/5] lg:aspect-[16/4.5] w-full">
              <AnimatePresence mode="wait">
                <motion.img
                  key={slides[index].src}
                  src={slides[index].src}
                  alt={slides[index].alt}
                  className="w-full h-full object-contain block"
                  loading="lazy"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </AnimatePresence>
            </div>
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex justify-center gap-2 bg-white/70 backdrop-blur px-4 py-2 rounded-full shadow-soft">
            {slides.map((slide, i) => (
              <button
                key={slide.src}
                onClick={() => goTo(i)}
                aria-label={`Ir a ${slide.alt}`}
                className={`w-3 h-3 rounded-full transition-colors ${i === index ? "bg-petrol" : "bg-neutral-300"}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
