import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function WelcomeBanner() {
  const { ref, inView } = useInView({ threshold: 0.25, triggerOnce: true });

  return (
    <section ref={ref} className="relative py-14 sm:py-16 lg:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(155,172,216,0.12),transparent_30%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(34,51,130,0.12),transparent_26%)]" />
      <div className="relative section-container">
        <motion.div
          className="glass-card overflow-hidden border border-neutral-200 shadow-soft"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.img
            src="/gallery/WELCOME.svg"
            alt="Banner Welcome"
            className="w-full h-auto block"
            loading="lazy"
            animate={{ y: [0, -10, 0], scale: [1, 1.01, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
