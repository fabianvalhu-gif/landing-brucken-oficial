import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../utils/animations";

const episodes = [
  { title: "Ep.5 - \"El valor de las conexiones\"", duration: "19:10" },
  { title: "Ep.4 - \"Construir sin ser gigante\"", duration: "17:57" },
  { title: "Ep.3 - \"El poder de reinventarse\"", duration: "13:44" },
];

export default function PodcastSection() {
  return (
    <section id="podcast" className="relative py-16 sm:py-20 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_15%,rgba(155,172,216,0.12),transparent_30%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_5%,rgba(249,133,19,0.12),transparent_28%)]" />
      <motion.div
        className="relative section-container"
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div variants={fadeIn("up", 0.05)} className="text-center space-y-3 max-w-3xl mx-auto mb-10">
          <div className="pill-badge mx-auto">Podcast El Salto</div>
          <h2 className="text-3xl md:text-4xl font-bold text-petrol">
            Conversaciones con líderes que transforman LATAM
          </h2>
          <p className="text-lg text-muted">
            Estrategia, innovación y tecnología aplicada para quienes diseñan el próximo salto de sus compañías.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Spotify Player */}
          <motion.div variants={fadeIn("right")} className="glass-card p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold text-petrol">Últimos episodios</h3>
              <span className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 text-xs font-semibold">
                Audio + Video
              </span>
            </div>

            <div className="rounded-2xl overflow-hidden border border-neutral-200/90 shadow-soft">
              <iframe
                data-testid="embed-iframe"
                style={{ borderRadius: "12px" }}
                src="https://open.spotify.com/embed/show/6yIbnXj1hydPY57ZGdt4Tq?utm_source=generator"
                width="100%"
                height="352"
                frameBorder="0"
                allowFullScreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Podcast El Salto en Spotify"
              ></iframe>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <a
                href="https://open.spotify.com/show/6yIbnXj1hydPY57ZGdt4Tq"
                target="_blank"
                rel="noreferrer"
                className="cta-button cta-primary justify-center"
              >
                Abrir en Spotify
              </a>
              <a
                href="https://podcasts.apple.com/podcast/TU_PODCAST_ID"
                target="_blank"
                rel="noreferrer"
                className="cta-button cta-secondary justify-center"
              >
                Apple Podcasts
              </a>
            </div>
          </motion.div>

          {/* Featured Episodes */}
          <motion.div variants={fadeIn("left", 0.1)} className="glass-card p-6 sm:p-8 flex flex-col gap-6">
            <div>
              <h4 className="text-2xl font-semibold text-petrol">Top episodios</h4>
              <p className="text-sm text-muted">Los 3 episodios más recientes</p>
            </div>
            <div className="space-y-4">
              {episodes.map((episode, index) => (
                <div
                  key={episode.title}
                  className="border border-neutral-200 rounded-2xl p-5 hover:border-electric/50 hover:shadow-soft transition cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-electric/10 flex items-center justify-center text-electric font-bold group-hover:bg-electric group-hover:text-white transition">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-petrol mb-1">{episode.title}</p>
                      <p className="text-neutral-500 text-sm">{episode.duration}</p>
                    </div>
                    <button className="text-electric text-sm font-semibold flex items-center gap-1 group-hover:translate-x-1 transition">
                      ▶ Reproducir
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="https://open.spotify.com/show/6yIbnXj1hydPY57ZGdt4Tq"
              target="_blank"
              rel="noreferrer"
              className="text-electric hover:text-petrol transition text-sm font-semibold inline-flex items-center gap-2 mt-2"
            >
              Ver todos los episodios →
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
