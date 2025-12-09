import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabase";

const products = [
  { id: 1, name: "All-Terrain 17\"", brand: "Brücken Grip", segment: "SUV / Pickup", price: 189, stock: 42, features: ["4x4", "Silica compound", "M+S"] },
  { id: 2, name: "Highway 16\"", brand: "Brücken Road", segment: "Comercial", price: 142, stock: 68, features: ["Carga pesada", "Baja resistencia", "Garantía 60k"] },
  { id: 3, name: "Sport 19\"", brand: "Brücken Edge", segment: "Performance", price: 229, stock: 21, features: ["ZR speed", "Run-flat", "Baja sonoridad"] },
  { id: 4, name: "Winter 18\"", brand: "Brücken Snow", segment: "SUV / Invierno", price: 205, stock: 33, features: ["Caucho nórdico", "Laminillas 3D", "3PMSF"] },
];

const samplePortfolios = [
  { name: "Latam Norte", brands: ["Grip", "Road"], accounts: 24 },
  { name: "Retail Chile", brands: ["Edge", "Grip"], accounts: 12 },
  { name: "Flotas Cono Sur", brands: ["Road", "Snow"], accounts: 18 },
];

export default function Catalog() {
  const [role, setRole] = useState("user");
  const [sessionChecked, setSessionChecked] = useState(false);
  const [quoteItems, setQuoteItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(products[0].id);
  const [quantity, setQuantity] = useState(4);
  const [newUser, setNewUser] = useState({ email: "", name: "", role: "user" });
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data?.session) {
        navigate("/login");
        return;
      }
      const storedRole = localStorage.getItem("brucken_role");
      if (storedRole === "admin" || storedRole === "user") {
        setRole(storedRole);
      } else {
        const email = data.session.user.email || "";
        setRole(email.toLowerCase().includes("admin") ? "admin" : "user");
      }
      setSessionChecked(true);
    };
    checkSession();
  }, [navigate]);

  const totalQuote = useMemo(
    () =>
      quoteItems.reduce((sum, item) => {
        const product = products.find((p) => p.id === item.productId);
        return sum + (product ? product.price * item.qty : 0);
      }, 0),
    [quoteItems]
  );

  const handleAddToQuote = () => {
    const productId = Number(selectedProduct);
    if (!productId || quantity < 1) return;
    setQuoteItems((prev) => {
      const existing = prev.find((i) => i.productId === productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === productId ? { ...i, qty: i.qty + quantity } : i
        );
      }
      return [...prev, { productId, qty: quantity }];
    });
  };

  const handleRemoveQuoteItem = (productId) => {
    setQuoteItems((prev) => prev.filter((i) => i.productId !== productId));
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    // Placeholder: aquí se integraría con Supabase o API
    alert(`Usuario creado (mock): ${newUser.name} - ${newUser.email} (${newUser.role})`);
    setNewUser({ email: "", name: "", role: "user" });
  };

  if (!sessionChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="h-12 w-12 border-4 border-electric border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-white/70">Comprobando acceso...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/hero.jpg')] bg-cover bg-center scale-105" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#030712]/92 via-[#0b1633]/82 to-[#05070f]/92" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_22%,rgba(161,0,255,0.35),transparent_28%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_12%,rgba(255,75,139,0.26),transparent_24%)]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10 lg:py-16">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.26em] text-white/70">Portal Distribuidores</p>
            <h1 className="text-3xl md:text-4xl font-bold mt-2">Catálogo de Neumáticos</h1>
            <p className="text-white/75 mt-1">Role: <span className="font-semibold uppercase">{role}</span></p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="px-3 py-2 rounded-full border border-white/15 bg-white/10 text-sm hover:bg-white/20"
            >
              Volver a la landing
            </a>
            <span className="px-3 py-2 rounded-full bg-electric text-black text-xs font-bold tracking-[0.18em] uppercase shadow-glow">
              {role === "admin" ? "Admin" : "Usuario"}
            </span>
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-4">
            <section className="rounded-3xl border border-white/12 bg-white/8 backdrop-blur-xl p-6 shadow-[0_12px_36px_rgba(0,0,0,0.28)]">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/60">Portafolio</p>
                  <h2 className="text-xl font-bold">Neumáticos destacados</h2>
                </div>
                <span className="text-xs px-3 py-1 rounded-full border border-electric/40 text-electric bg-electric/10">
                  Stock dinámico
                </span>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {products.map((product) => (
                  <div key={product.id} className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-electric/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-white/60">{product.brand}</p>
                        <h3 className="text-xl font-semibold">{product.name}</h3>
                        <p className="text-sm text-white/70">{product.segment}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">${product.price}</p>
                        <p className="text-xs text-emerald-300">Stock {product.stock}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {product.features.map((feat) => (
                        <span key={feat} className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10">
                          {feat}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <button
                        onClick={() => {
                          setSelectedProduct(product.id);
                          setQuantity(4);
                          handleAddToQuote();
                        }}
                        className="text-sm font-semibold text-electric hover:text-white transition-colors"
                      >
                        Agregar a cotización
                      </button>
                      <span className="text-xs text-white/60">SKU-{product.id.toString().padStart(4, "0")}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {role === "admin" && (
              <section className="rounded-3xl border border-white/12 bg-white/8 backdrop-blur-xl p-6 shadow-[0_12px_36px_rgba(0,0,0,0.28)]">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/60">Gestión de accesos</p>
                    <h2 className="text-xl font-bold">Crear cuenta y asignar portafolio</h2>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full border border-white/15 text-white/70">
                    Solo Admin
                  </span>
                </div>
                <form className="grid sm:grid-cols-2 gap-4" onSubmit={handleCreateUser}>
                  <div className="space-y-2">
                    <label className="text-sm text-white/70">Nombre</label>
                    <input
                      type="text"
                      required
                      value={newUser.name}
                      onChange={(e) => setNewUser((u) => ({ ...u, name: e.target.value }))}
                      className="w-full px-4 py-3 rounded-2xl border border-white/12 bg-white/8 focus:outline-none focus:border-electric/60 text-white placeholder-white/50"
                      placeholder="Ej: Camila Ríos"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-white/70">Correo</label>
                    <input
                      type="email"
                      required
                      value={newUser.email}
                      onChange={(e) => setNewUser((u) => ({ ...u, email: e.target.value }))}
                      className="w-full px-4 py-3 rounded-2xl border border-white/12 bg-white/8 focus:outline-none focus:border-electric/60 text-white placeholder-white/50"
                      placeholder="usuario@distribuidor.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-white/70">Rol</label>
                    <select
                      value={newUser.role}
                      onChange={(e) => setNewUser((u) => ({ ...u, role: e.target.value }))}
                      className="w-full px-4 py-3 rounded-2xl border border-white/12 bg-white/8 focus:outline-none focus:border-electric/60 text-white bg-transparent"
                    >
                      <option className="text-black" value="user">Usuario</option>
                      <option className="text-black" value="admin">Admin</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-white/70">Portafolio</label>
                    <select
                      className="w-full px-4 py-3 rounded-2xl border border-white/12 bg-white/8 focus:outline-none focus:border-electric/60 text-white bg-transparent"
                      defaultValue="Latam Norte"
                    >
                      {samplePortfolios.map((p) => (
                        <option className="text-black" key={p.name} value={p.name}>{p.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-2xl bg-electric text-black font-semibold shadow-glow hover:bg-white transition-colors"
                    >
                      Crear acceso
                    </button>
                  </div>
                </form>

                <div className="mt-6 grid sm:grid-cols-3 gap-3">
                  {samplePortfolios.map((p) => (
                    <div key={p.name} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-sm font-semibold">{p.name}</p>
                      <p className="text-xs text-white/60 mt-1">{p.brands.join(" · ")}</p>
                      <p className="text-xs text-emerald-300 mt-2">Accesos: {p.accounts}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="space-y-4">
            <section className="rounded-3xl border border-white/12 bg-white/8 backdrop-blur-xl p-5 shadow-[0_12px_36px_rgba(0,0,0,0.28)]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">Cotizador rápido</h3>
                <span className="text-xs text-white/60">Simular pedido</span>
              </div>
              <div className="space-y-3">
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-white/12 bg-white/8 focus:outline-none focus:border-electric/60 text-white bg-transparent"
                >
                  {products.map((p) => (
                    <option className="text-black" key={p.id} value={p.id}>
                      {p.name} · ${p.price}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-2xl border border-white/12 bg-white/8 focus:outline-none focus:border-electric/60 text-white"
                />
                <button
                  onClick={handleAddToQuote}
                  className="w-full px-4 py-3 rounded-2xl bg-electric text-black font-semibold shadow-glow hover:bg-white transition-colors"
                >
                  Agregar
                </button>
              </div>
              <div className="mt-4 space-y-3">
                {quoteItems.length === 0 && <p className="text-sm text-white/60">Sin items aún.</p>}
                {quoteItems.map((item) => {
                  const product = products.find((p) => p.id === item.productId);
                  if (!product) return null;
                  return (
                    <div key={item.productId} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                      <div>
                        <p className="text-sm font-semibold">{product.name}</p>
                        <p className="text-xs text-white/60">
                          {item.qty} u · ${product.price} c/u
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="text-sm font-semibold">${product.price * item.qty}</p>
                        <button
                          onClick={() => handleRemoveQuoteItem(item.productId)}
                          className="text-xs text-red-200 hover:text-red-100"
                        >
                          x
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-white/70">Total estimado</p>
                <p className="text-xl font-bold">${totalQuote}</p>
              </div>
            </section>

            <section className="rounded-3xl border border-white/12 bg-white/8 backdrop-blur-xl p-5 shadow-[0_12px_36px_rgba(0,0,0,0.28)]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">Resumen</h3>
                <span className="text-xs text-white/60">Estado</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/70">Órdenes activas</span>
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-sm font-semibold">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/70">Entregas pendientes</span>
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-sm font-semibold">5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/70">Tiempo estimado</span>
                  <span className="text-sm font-semibold">48h</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/70">Contacto dedicado</span>
                  <span className="text-sm font-semibold text-electric">sales@bruckenglobal.com</span>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
