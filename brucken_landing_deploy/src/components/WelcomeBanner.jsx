import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function WelcomeBanner() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section ref={ref} className="w-full bg-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Full-bleed image edge-to-edge */}
        <div className="w-full overflow-hidden">
          <img
            src="/gallery/WELCOME.svg"
            alt="Welcome Banner - Brucken AG Global"
            className="w-full h-auto block"
            loading="lazy"
            style={{ display: "block" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
