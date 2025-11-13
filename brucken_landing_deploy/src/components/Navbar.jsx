import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, staggerContainer } from "../utils/animations";

const navLinks = [
  { label: "Consultoría", href: "#consultoria" },
  { label: "Software Factory", href: "#software" },
  { label: "Representación Comercial", href: "#representacion" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Podcast", href: "#podcast" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
      className="fixed top-0 left-0 w-full z-50 bg-black/65 backdrop-blur-xl border-b border-white/10"
    >
      <nav className="flex items-center justify-between px-6 py-1 md:px-12 lg:px-24">
        <motion.a
          href="#hero"
          className="flex items-center -my-16"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <img 
            src="/logo.png" 
            alt="Brucken AG Global - Consultoría Estratégica y Software Factory LATAM" 
            className="h-[180px] w-auto"
          />
        </motion.a>

        <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-white/80">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-white transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacto"
            className="cta-button bg-electric text-black hover:bg-white"
          >
            Agenda una reunión
          </a>
        </div>

        <button
          type="button"
          className="lg:hidden text-white focus:outline-none"
          aria-label="Abrir menú"
          onClick={() => setOpen((prev) => !prev)}
        >
          <div className="space-y-1.5">
            {[0, 1, 2].map((bar) => (
              <span
                key={`bar-${bar}`}
                className={`block h-0.5 w-6 bg-white transition-transform ${
                  open && bar === 1 ? "opacity-0" : ""
                } ${
                  open && bar !== 1
                    ? bar === 0
                      ? "translate-y-2 rotate-45"
                      : "-translate-y-2 -rotate-45"
                    : ""
                }`}
              />
            ))}
          </div>
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={staggerContainer()}
            className="lg:hidden bg-black border-t border-white/10"
          >
            <motion.ul
              variants={fadeIn("up", 0.1)}
              className="flex flex-col py-6 px-6 gap-4"
            >
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-white/80 text-lg"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contacto"
                  onClick={() => setOpen(false)}
                  className="cta-button bg-electric text-black w-full justify-center"
                >
                  Agenda una reunión
                </a>
              </li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
