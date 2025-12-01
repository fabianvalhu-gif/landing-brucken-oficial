export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="section-padding py-20">
        {/* Main Footer Content */}
        <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-4 pb-12 mb-12 border-b border-white/10">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <img 
                src="/logo.png" 
                alt="Brucken AG Global - Consultoría Estratégica, Software Factory y Representación Comercial" 
                className="h-[200px] w-auto"
              />
            </div>
            <p className="text-white/70 text-base leading-relaxed max-w-lg">
              Transformamos estrategia en resultados. Consultoría estratégica, 
              desarrollo de software y representación comercial para LATAM y mercados globales.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-base uppercase tracking-wider mb-6">
              Servicios
            </h3>
            <ul className="space-y-4">
              <li>
                <a href="#consultoria" className="text-white/70 hover:text-white transition-colors text-base">
                  Consultoría Estratégica
                </a>
              </li>
              <li>
                <a href="#software" className="text-white/70 hover:text-white transition-colors text-base">
                  Software Factory
                </a>
              </li>
              <li>
                <a href="#representacion" className="text-white/70 hover:text-white transition-colors text-base">
                  Representación Comercial
                </a>
              </li>
              <li>
                <a href="#proyectos" className="text-white/70 hover:text-white transition-colors text-base">
                  Proyectos
                </a>
              </li>
              <li>
                <a href="#podcast" className="text-white/70 hover:text-white transition-colors text-base">
                  Podcast El Salto
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h3 className="text-white font-semibold text-base uppercase tracking-wider mb-6">
              Conecta
            </h3>
            <div className="space-y-4 mb-8">
              {[
                { name: "LinkedIn", url: "#" },
                { name: "YouTube", url: "#" },
                { name: "Spotify", url: "#" }
              ].map((network) => (
                <a
                  key={network.name}
                  href={network.url}
                  className="block text-white/70 hover:text-white transition-colors text-base"
                  aria-label={`Brucken AG Global en ${network.name}`}
                >
                  {network.name}
                </a>
              ))}
            </div>
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 text-base font-semibold text-electric hover:text-white transition-colors mb-6"
            >
              Contáctanos →
            </a>
            
            {/* Botón de acceso al portal */}
            <div className="pt-6 border-t border-white/10">
              <a
                href="/login"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-electric/20 border border-white/10 hover:border-electric/50 rounded-lg text-sm text-white/80 hover:text-electric transition-all group"
              >
                <span>🔐</span>
                <span className="font-medium">Acceso Portal</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-white/50 text-sm">
          <p>
            © {new Date().getFullYear()} Brucken AG Global. Todos los derechos reservados.
          </p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">
              Política de Privacidad
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Términos de Servicio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
