export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="section-container py-14">
        {/* CTA superior */}
        <div className="glass-card p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
          <div>
            <p className="text-sm font-semibold text-electric uppercase tracking-[0.18em] mb-2">
              ¿Listo para avanzar?
            </p>
            <h3 className="text-2xl font-bold text-petrol">Agenda una sesión estratégica con nuestro equipo.</h3>
          </div>
          <a href="#contacto" className="cta-button cta-primary justify-center">
            Contactar ahora
          </a>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 pb-10">
          {/* Logo & Description */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <img
                src="/logo.png"
                alt="Brucken AG Global - Consultoría Estratégica, Software Factory y Representación Comercial"
                className="h-16 w-auto"
              />
            </div>
            <p className="text-neutral-600 text-base leading-relaxed max-w-xl">
              Transformamos estrategia en resultados. Consultoría estratégica, desarrollo de software y representación
              comercial para LATAM y mercados globales.
            </p>
            <div className="flex gap-3 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 text-sm font-semibold">C-level advisory</span>
              <span className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 text-sm font-semibold">Nearshore squads</span>
              <span className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 text-sm font-semibold">Pipeline & CRM</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-petrol font-semibold text-base uppercase tracking-wider">
              Servicios
            </h3>
            <ul className="space-y-3 text-neutral-700">
              <li><a href="#consultoria" className="hover:text-electric transition-colors">Consultoría Estratégica</a></li>
              <li><a href="#software" className="hover:text-electric transition-colors">Software Factory</a></li>
              <li><a href="#representacion" className="hover:text-electric transition-colors">Representación Comercial</a></li>
              <li><a href="#proyectos" className="hover:text-electric transition-colors">Proyectos</a></li>
              <li><a href="#podcast" className="hover:text-electric transition-colors">Podcast El Salto</a></li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div className="space-y-4">
            <h3 className="text-petrol font-semibold text-base uppercase tracking-wider">
              Conecta
            </h3>
            <div className="space-y-3 text-neutral-700">
              {[
                { name: "LinkedIn", url: "#" },
                { name: "YouTube", url: "#" },
                { name: "Spotify", url: "#" },
              ].map((network) => (
                <a
                  key={network.name}
                  href={network.url}
                  className="block hover:text-electric transition-colors"
                  aria-label={`Brucken AG Global en ${network.name}`}
                >
                  {network.name}
                </a>
              ))}
            </div>
            <p className="text-sm text-neutral-600">mailto:sales@bruckenglobal.com</p>
            <p className="text-sm text-neutral-600">14 Norte 976, Viña del Mar, Chile</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-neutral-500 text-sm border-t border-neutral-200 pt-6">
          <p>© {new Date().getFullYear()} Brucken AG Global. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-electric transition-colors">
              Política de Privacidad
            </a>
            <a href="#" className="hover:text-electric transition-colors">
              Términos de Servicio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
