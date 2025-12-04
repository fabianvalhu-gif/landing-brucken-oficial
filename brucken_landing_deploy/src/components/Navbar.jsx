import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, staggerContainer } from "../utils/animations";
import LanguageSwitcher from "./LanguageSwitcher";

const navLinks = [
  { label: "Consultoría", href: "#consultoria" },
  { label: "Software Factory", href: "#software" },
  { label: "Representación Comercial", href: "#representacion" },
  { label: "Podcast", href: "#podcast" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setVisible(y < 120 || y < lastY);
      setLastY(y);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastY]);

  const headerClass = scrolled
    ? "border-b border-neutral-200/80 bg-white/95 backdrop-blur-md shadow-sm text-neutral-800"
    : "border-transparent bg-transparent text-white";

  const linkColor = scrolled ? "text-neutral-700 hover:text-petrol" : "text-white hover:text-white/80";
  const buttonClass = scrolled ? "cta-button cta-primary px-5 py-2 text-sm" : "cta-button cta-primary px-5 py-2 text-sm shadow-glow";
  const languageVariant = scrolled ? "light" : "dark";

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
      className={`sticky top-0 z-50 transition-all duration-300 ${headerClass} ${visible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <nav className="section-container flex items-center justify-between py-6 md:py-7 lg:py-8">
        <motion.a
          href="#hero"
          className="flex items-center"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <img
            src="/logo.png"
            alt="Brucken AG Global - Consultoría Estratégica y Software Factory LATAM"
            className="h-2 w-auto md:h-8 lg:h-10"
          />
        </motion.a>

        <div className="hidden lg:flex items-center gap-6 text-sm font-semibold ml-auto">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`${linkColor} transition-colors duration-200`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacto"
            className={buttonClass}
          >
            Agenda una reunión
          </a>
          <LanguageSwitcher variant={languageVariant} />
        </div>

        <button
          type="button"
          className={`lg:hidden focus:outline-none ${scrolled ? "text-petrol" : "text-white"}`}
          aria-label="Abrir menú"
          onClick={() => setOpen((prev) => !prev)}
        >
          <div className="space-y-1.5">
            {[0, 1, 2].map((bar) => (
              <span
                key={`bar-${bar}`}
                className={`block h-0.5 w-6 bg-petrol transition-transform ${
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
            className="lg:hidden border-t border-neutral-200 bg-white/95 backdrop-blur"
          >
            <motion.ul
              variants={fadeIn("up", 0.1)}
              className="flex flex-col py-5 px-6 gap-3 text-neutral-800"
            >
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-base font-semibold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <LanguageSwitcher variant="light" />
              </li>
              <li>
                <a
                  href="#contacto"
                  onClick={() => setOpen(false)}
                  className="cta-button cta-primary w-full justify-center"
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
