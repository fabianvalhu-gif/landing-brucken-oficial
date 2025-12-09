import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabase";

const highlights = [
  {
    title: "Catálogo vivo",
    detail: "Stock, precios y lanzamientos en tiempo real para tus pedidos.",
  },
  {
    title: "Órdenes y tracking",
    detail: "Sigue estados de despacho y confirmaciones en un solo lugar.",
  },
  {
    title: "Soporte prioritario",
    detail: "Equipo Brucken contigo en cada venta y postventa.",
  },
  {
    title: "Material comercial",
    detail: "Kits de marca, presentaciones y casos listos para compartir.",
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
    <div className="relative min-h-screen overflow-hidden text-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/hero.jpg')] bg-cover bg-center scale-105 brightness-90" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0d1e]/92 via-[#0b1633]/85 to-[#0a0d1e]/94" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(161,0,255,0.35),transparent_28%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_12%,rgba(255,75,139,0.3),transparent_24%)]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10 lg:py-16">
        <div className="flex items-center justify-between mb-10">
          <motion.a
            href="/"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-3 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
          >
            <img
              src="/logo.png"
              alt="Brucken AG Global"
              className="h-10 w-auto"
            />
            <span className="text-sm font-semibold text-white/80">
              Volver a la landing
            </span>
          </motion.a>
          <span className="text-[11px] font-semibold tracking-[0.26em] uppercase text-white/70">
            Portal Distribuidores
          </span>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/15 bg-white/10 text-xs uppercase tracking-[0.24em] text-white/70 w-fit"
            >
              Acceso seguro · Distribuidores
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="text-4xl md:text-5xl font-bold leading-tight"
            >
              Tu portal para pedidos, materiales y soporte de{" "}
              <span className="gradient-text">Brücken Global</span>.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-white/80 max-w-2xl"
            >
              Gestiona tu relación con Brucken: órdenes priorizadas, disponibilidad de catálogo,
              documentos listos para compartir y acompañamiento dedicado para acelerar tus ventas.
            </motion.p>

            <div className="grid sm:grid-cols-2 gap-4">
              {highlights.map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + idx * 0.05 }}
                  className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-lg p-4 shadow-[0_18px_40px_rgba(0,0,0,0.16)]"
                >
                  <p className="text-sm font-semibold text-electric mb-1">
                    {item.title}
                  </p>
                  <p className="text-white/75 text-sm leading-relaxed">{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md ml-auto"
          >
            <div className="relative rounded-3xl border border-white/12 bg-white/8 backdrop-blur-2xl p-8 shadow-[0_18px_60px_rgba(0,0,0,0.28)] overflow-hidden">
              <div className="absolute -top-16 -right-10 w-44 h-44 bg-gradient-to-br from-electric to-petrol opacity-40 blur-3xl" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-electric/40 bg-electric/10 text-electric text-[11px] font-semibold uppercase tracking-[0.26em]">
                  Portal Distribuidores
                </div>
                <h2 className="text-3xl font-bold mt-5">Inicia sesión</h2>
                <p className="text-white/70 mt-2">
                  Usa tu correo y contraseña entregados por el equipo Brucken para acceder al portal.
                </p>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative mt-6 mb-4 p-4 rounded-2xl border border-red-500/40 bg-red-500/10"
                >
                  <p className="text-red-200 text-sm">{error}</p>
                </motion.div>
              )}

              <form onSubmit={handleLogin} className="relative mt-6 space-y-5">
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
                    className="w-full px-4 py-3 rounded-2xl border border-white/12 bg-white/8 focus:outline-none focus:border-electric/70 text-white placeholder-white/50 transition-colors"
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
                    className="w-full px-4 py-3 rounded-2xl border border-white/12 bg-white/8 focus:outline-none focus:border-electric/70 text-white placeholder-white/50 transition-colors"
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

              <div className="relative mt-7 flex items-center justify-between text-xs text-white/70">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Servicio activo 24/7</span>
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
