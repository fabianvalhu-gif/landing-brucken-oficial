import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../utils/animations";

const team = [
  {
    name: "Coming soon",
    role: "Pronto anunciaremos",
    bio: "Estamos sumando un nuevo líder a nuestro equipo. Muy pronto conocerás su perfil.",
    avatar: null,
    placeholder: true,
  },
  {
    name: "Fabián Valenzuela",
    role: "CEO & Founder",
    bio: "Lidero estrategia, expansión y dirección de producto; 15+ años transformando empresas en LATAM.",
    avatar: "/gallery/fabian.jpeg",
  },
  {
    name: "Matías Arancibia",
    role: "DevBridge & Commercial",
    bio: "Lidera DevBridge y gestión comercial; conecta delivery técnico con revenue en ciclos ágiles.",
    avatar: "/gallery/matias.png",
  },
];

export default function AboutUs() {
  return (
    <section id="equipo" className="relative py-16 sm:py-20 lg:py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-[rgba(249,133,19,0.08)] via-transparent to-[rgba(34,51,130,0.08)] pointer-events-none" />
      <div className="relative section-container">
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-10"
        >
          <motion.div variants={fadeIn("up")} className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="pill-badge mx-auto">Quiénes somos</div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-petrol">
              Estrategia, tecnología y revenue en un solo equipo.
            </h2>
            <p className="text-lg text-muted">
              Equipo híbrido con presencia en terreno, visión global y delivery nearshore para proyectos críticos.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {team.map((member, index) => (
              <motion.article
                key={member.name}
                variants={fadeIn("up", index * 0.1)}
                className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-soft text-center"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br from-[rgba(249,133,19,0.4)] via-transparent to-[rgba(17,17,68,0.6)]" />
                <div className="p-6 space-y-4 flex flex-col items-center">
                  <div className="relative overflow-hidden rounded-2xl aspect-[4/3] w-full bg-neutral-100 flex items-center justify-center">
                    {member.placeholder ? (
                      <div className="w-full h-full flex items-center justify-center bg-[#f5f6fa] text-[#a100ff]">
                        <svg
                          className="animate-spin h-10 w-10 text-[#a100ff]"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                      </div>
                    ) : (
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    )}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-petrol">{member.name}</h3>
                    <p className="text-sm font-semibold text-electric uppercase tracking-[0.18em]">
                      {member.role}
                    </p>
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
