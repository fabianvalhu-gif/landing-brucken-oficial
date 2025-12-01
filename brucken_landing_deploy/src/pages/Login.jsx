import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabase";

const highlights = [
  {
    title: "CRM + Pipeline",
    detail: "Seguimiento de deals, contactos y boards en un solo lugar.",
  },
  {
    title: "Data protegida",
    detail: "Autenticación segura con Supabase y accesos auditados.",
  },
  {
    title: "Acceso 24/7",
    detail: "Portal disponible siempre para el equipo y clientes.",
  },
  {
    title: "Soporte cercano",
    detail: "Equipo Brucken listo para ayudarte en cada paso.",
  },
];

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      // Redirigir al portal
      navigate("/intranet");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#05070f] via-[#0c1c30] to-[#05070f] text-white overflow-hidden">
      {/* Efectos de fondo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-10 top-10 w-80 h-80 bg-electric/20 blur-3xl" />
        <div className="absolute right-[-6rem] bottom-20 w-96 h-96 bg-purple-500/25 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.05),_transparent_40%)]" />
      </div>

      {/* Logo y enlace a home */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-6 left-6 z-20"
      >
        <a
          href="/"
          className="flex items-center gap-3 px-3 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
        >
          <img
            src="/logo.png"
            alt="Brucken AG Global"
            className="h-10 w-auto"
          />
          <span className="text-sm font-semibold text-white/80">
            Volver al sitio
          </span>
        </a>
      </motion.div>

      <div className="relative z-10 grid min-h-screen lg:grid-cols-2">
        {/* Panel lateral */}
        <div className="hidden lg:flex flex-col justify-between border-r border-white/10 px-12 py-16 bg-white/5">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 text-xs uppercase tracking-[0.25em] text-white/70">
              Acceso Portal
            </div>
            <h1 className="text-4xl font-semibold mt-6 leading-tight">
              Portal seguro para el equipo y clientes de Brucken.
            </h1>
            <p className="text-white/70 mt-4 max-w-xl">
              Gestiona pipeline, leads y actividades con visibilidad total.
              Conectado a Supabase para mantener tus datos protegidos.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-10">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <p className="text-sm text-electric font-semibold mb-1">
                    {item.title}
                  </p>
                  <p className="text-white/70 text-sm">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-8 pt-10 border-t border-white/10">
            <div>
              <p className="text-3xl font-semibold">99.9%</p>
              <p className="text-white/60 text-sm">Disponibilidad mensual</p>
            </div>
            <div>
              <p className="text-3xl font-semibold">24/7</p>
              <p className="text-white/60 text-sm">Monitoreo y alertas</p>
            </div>
            <div>
              <p className="text-3xl font-semibold">+5</p>
              <p className="text-white/60 text-sm">Módulos activos</p>
            </div>
          </div>
        </div>

        {/* Formulario */}
        <div className="flex items-center justify-center p-6 sm:p-10 lg:p-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-glow">
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-electric/30 bg-electric/10 text-electric text-xs font-semibold uppercase tracking-[0.28em]">
                  Acceso Portal
                </div>
                <h2 className="text-3xl font-bold mt-4">Inicia sesión</h2>
                <p className="text-white/70 mt-2">
                  Usa tu correo corporativo y contraseña para entrar al portal.
                </p>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-2xl border border-red-500/40 bg-red-500/10"
                >
                  <p className="text-red-200 text-sm">{error}</p>
                </motion.div>
              )}

              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-white/80"
                  >
                    Correo corporativo
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-2xl border border-white/10 bg-white/5 focus:outline-none focus:border-electric/60 text-white placeholder-white/40 transition-colors"
                    placeholder="persona@brucken.com"
                    disabled={loading}
                    autoComplete="email"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-white/80"
                  >
                    Contraseña
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-2xl border border-white/10 bg-white/5 focus:outline-none focus:border-electric/60 text-white placeholder-white/40 transition-colors"
                    placeholder="••••••••"
                    disabled={loading}
                    autoComplete="current-password"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-electric text-black font-semibold shadow-glow hover:bg-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  whileHover={{ scale: loading ? 1 : 1.01 }}
                  whileTap={{ scale: loading ? 1 : 0.99 }}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5 text-black"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Verificando...
                    </span>
                  ) : (
                    "Entrar al portal"
                  )}
                </motion.button>
              </form>

              <div className="mt-8 flex items-center justify-between text-xs text-white/60">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Servicio en línea 24/7</span>
                </div>
                <a
                  href="mailto:soporte@brucken.com"
                  className="text-electric hover:text-white transition-colors"
                >
                  Ayuda con acceso
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
