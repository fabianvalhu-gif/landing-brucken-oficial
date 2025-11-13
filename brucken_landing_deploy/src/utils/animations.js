export const fadeIn = (direction = "up", delay = 0, duration = 0.5) => {
  const distance = 40;
  const axis = {
    up: { opacity: 0, y: distance },
    down: { opacity: 0, y: -distance },
    left: { opacity: 0, x: distance },
    right: { opacity: 0, x: -distance },
  };

  return {
    hidden: axis[direction] ?? axis.up,
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        delay,
        duration,
        ease: [0.25, 0.46, 0.45, 0.94], // Easing más rápido
      },
    },
  };
};

export const staggerContainer = (stagger = 0.08, delayChildren = 0.1) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});

export const scaleFade = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.96, filter: "blur(2px)" },
  show: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      delay,
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
});

export const floatVariant = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const parallaxLayer = (offset = 0) => ({
  hidden: { opacity: 0, y: offset },
  show: {
    opacity: 0.7,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
});
