import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../utils/animations";

const episodes = [
  { title: "Ep.5 - \"El valor de las conexiones\"", duration: "19:10" },
  { title: "Ep.4 - \"Construir sin ser gigante\"", duration: "17:57" },
  { title: "Ep.3 - \"El poder de reinventarse\"", duration: "13:44" },
];

export default function PodcastSection() {
  return (
    <section id="podcast" className="section-padding">
      <motion.div
        className="max-w-6xl mx-auto"
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
      >
        {/* Header */}
        <motion.div variants={fadeIn("up")} className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            className="inline-block mb-6"
          >
            <div className="px-6 py-2 rounded-full bg-gradient-to-r from-electric/20 to-purple-500/20 border border-electric/30">
              <p className="text-xs uppercase tracking-[0.4em] text-electric font-semibold">
                Podcast El Salto
              </p>
            </div>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Conversaciones con líderes que transforman LATAM
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Estrategia, innovación, management y tecnología aplicada para quienes están diseñando el
            próximo salto de sus compañías.
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Spotify Player */}
          <motion.div variants={fadeIn("right")} className="glass-card p-8">
            <h3 className="text-2xl font-semibold mb-6">Últimos Episodios</h3>
            
            {/* Spotify Embed - Reemplaza con tu URL de Spotify */}
            <div className="rounded-2xl overflow-hidden">
              <iframe
                data-testid="embed-iframe"
                style={{ borderRadius: '12px' }}
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

            <div className="mt-6 flex gap-4">
              <a
                href="https://open.spotify.com/show/6yIbnXj1hydPY57ZGdt4Tq"
                target="_blank"
                rel="noreferrer"
                className="cta-button bg-electric text-black hover:bg-white flex-1 justify-center"
              >
                Abrir en Spotify
              </a>
              <a
                href="https://podcasts.apple.com/podcast/TU_PODCAST_ID"
                target="_blank"
                rel="noreferrer"
                className="cta-button bg-white/10 text-white hover:bg-white/20 flex-1 justify-center"
              >
                Apple Podcasts
              </a>
            </div>
          </motion.div>

          {/* Featured Episodes */}
          <motion.div variants={fadeIn("left", 0.1)} className="glass-card p-8 flex flex-col gap-6">
            <div>
              <h4 className="text-2xl font-semibold mb-2">Últimos Episodios</h4>
              <p className="text-white/60 text-sm">Los 3 episodios más recientes</p>
            </div>
            <div className="space-y-4">
              {episodes.map((episode, index) => (
                <div 
                  key={episode.title} 
                  className="border border-white/10 rounded-2xl p-5 hover:border-electric hover:bg-white/5 transition cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-electric/10 flex items-center justify-center text-electric font-bold group-hover:bg-electric group-hover:text-black transition">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-white mb-1">{episode.title}</p>
                      <p className="text-white/50 text-sm">{episode.duration}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <a
              href="https://open.spotify.com/show/6yIbnXj1hydPY57ZGdt4Tq"
              target="_blank"
              rel="noreferrer"
              className="text-electric hover:text-white transition text-sm font-semibold inline-flex items-center gap-2 mt-2"
            >
              Ver todos los episodios →
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
