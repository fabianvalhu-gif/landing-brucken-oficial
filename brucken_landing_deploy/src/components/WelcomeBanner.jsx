import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function WelcomeBanner() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
        delay: 0.2,
      },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  };

  const floatingVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      y: [0, -20, 0],
      transition: {
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
        delay: 0.4,
      },
    },
  };

  return (
    <section className="py-16 sm:py-20 lg:py-28 px-6 sm:px-12 lg:px-24 bg-white overflow-hidden">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-5xl mx-auto"
      >
        {/* Decorative background blur */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/40 via-purple-50/20 to-transparent blur-3xl -z-10" />

        {/* Banner Container */}
        <motion.div
          className="relative w-full rounded-3xl overflow-hidden shadow-2xl"
          whileHover="hover"
        >
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-purple-50" />

          {/* Glowing border effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500" />

          {/* Content wrapper */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            whileHover="hover"
            className="relative w-full h-full flex items-center justify-center p-8 sm:p-12 lg:p-16"
          >
            <img
              src="/gallery/WELCOME.svg"
              alt="Welcome Banner - Brucken AG Global"
              className="w-full h-auto object-contain max-h-96 drop-shadow-lg"
              loading="lazy"
            />

            {/* Floating accent elements */}
            <motion.div
              variants={floatingVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="absolute -top-8 right-8 w-24 h-24 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"
            />
            <motion.div
              variants={floatingVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="absolute -bottom-8 left-8 w-24 h-24 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"
              style={{ animationDelay: "1s" }}
            />
          </motion.div>

          {/* Subtle shine effect on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 pointer-events-none"
            whileHover={{ opacity: 0.1 }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>

        {/* Optional descriptive text below */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-8 sm:mt-10"
        >
          <p className="text-neutral-600 text-sm sm:text-base font-medium tracking-wide">
            Somos tu aliado en transformación digital
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
