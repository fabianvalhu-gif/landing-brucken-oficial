import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabase";

const products = [
  { id: 1, name: "UNIGLORY AgriGrip 18\"", brand: "UNIGLORY", segment: "Agriculture Tires", price: 188, stock: 46, features: ["Talón reforzado", "Resistencia a pinchazos", "Alta tracción"], portfolios: ["UNIGLORY"] },
  { id: 2, name: "UNIGLORY HarvestPro 20\"", brand: "UNIGLORY", segment: "Agriculture Tires", price: 214, stock: 32, features: ["Baja compactación", "Autolimpieza", "Trabajo continuo"], portfolios: ["UNIGLORY"] },
  { id: 3, name: "TESCHE TrailForce 17\"", brand: "TESCHE", segment: "4x4 Tires", price: 199, stock: 54, features: ["M+S", "Silica compound", "Flanco protegido"], portfolios: ["TESCHE"] },
  { id: 4, name: "TESCHE Ridge AT 18\"", brand: "TESCHE", segment: "4x4 Tires", price: 221, stock: 28, features: ["All-terrain", "Baja sonoridad", "Garantía 60k"], portfolios: ["TESCHE"] },
  { id: 5, name: "ANSU FleetMax 22.5\"", brand: "ANSU", segment: "Truck & Bus Tires", price: 312, stock: 71, features: ["Alta carga", "Baja resistencia", "Wear control"], portfolios: ["ANSU"] },
  { id: 6, name: "ANSU RoadLine 20.5\"", brand: "ANSU", segment: "Truck & Bus Tires", price: 284, stock: 63, features: ["Larga distancia", "Protección lateral", "Sensor-ready"], portfolios: ["ANSU"] },
  { id: 7, name: "LING LONG TerraX 20\"", brand: "LING LONG", segment: "PCR / TBR / OTR Tires", price: 248, stock: 52, features: ["PCR/TBR", "Bajo ruido", "Compuesto premium"], portfolios: ["LING LONG"] },
  { id: 8, name: "LING LONG OTR Core 24\"", brand: "LING LONG", segment: "PCR / TBR / OTR Tires", price: 338, stock: 24, features: ["OTR", "Cortes y astillas", "Talón reforzado"], portfolios: ["LING LONG"] },
];

const portfolios = [
  { key: "UNIGLORY", label: "UNIGLORY", description: "Agriculture Tires", color: "bg-[#f5f3ff] text-[#5b21b6]" },
  { key: "TESCHE", label: "TESCHE", description: "4x4 Tires", color: "bg-[#ecfeff] text-[#0f172a]" },
  { key: "ANSU", label: "ANSU", description: "Truck & Bus Tires", color: "bg-[#f0fdf4] text-[#065f46]" },
  { key: "LING LONG", label: "LING LONG", description: "PCR, TBR and OTR Tires", color: "bg-[#fff7ed] text-[#9a3412]" },
];

export default function Catalog() {
  const [role, setRole] = useState("user");
  const [sessionChecked, setSessionChecked] = useState(false);
  const [quoteItems, setQuoteItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(products[0].id);
  const [quantity, setQuantity] = useState(4);
  const [newUser, setNewUser] = useState({ email: "", name: "", role: "user" });
  const [activePortfolio, setActivePortfolio] = useState("UNIGLORY");
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
      const savedPortfolio = localStorage.getItem("brucken_portfolio");
      if (savedPortfolio && portfolios.find((p) => p.key === savedPortfolio)) {
        setActivePortfolio(savedPortfolio);
      } else {
        setActivePortfolio("UNIGLORY");
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

  const filteredProducts = useMemo(
    () => products.filter((p) => p.portfolios.includes(activePortfolio)),
    [activePortfolio]
  );

  const activePortfolioMeta = portfolios.find((p) => p.key === activePortfolio);

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

  const handleChangePortfolio = (value) => {
    setActivePortfolio(value);
    localStorage.setItem("brucken_portfolio", value);
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
    <div className="min-h-screen bg-[#f7f8fb] text-[#0f172a]">
      <div className="max-w-6xl mx-auto px-6 py-10 lg:py-16">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">Portal Distribuidores</p>
            <h1 className="text-3xl md:text-4xl font-bold mt-2 text-petrol">Catálogo de Neumáticos</h1>
            <div className="mt-2 flex items-center gap-2 text-sm text-neutral-600">
              <span className="px-2 py-1 rounded-full bg-neutral-100 text-neutral-700 font-semibold uppercase tracking-[0.08em]">
                {role}
              </span>
              {activePortfolioMeta && (
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${activePortfolioMeta.color}`}>
                  {activePortfolioMeta.label} · {activePortfolioMeta.description}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="px-3 py-2 rounded-full border border-neutral-200 bg-white text-sm hover:shadow-sm transition"
            >
              Volver a la landing
            </a>
            <div className="flex items-center gap-2">
              <label className="text-xs text-neutral-500">Portafolio</label>
              <select
                value={activePortfolio}
                onChange={(e) => handleChangePortfolio(e.target.value)}
                className="px-3 py-2 rounded-full border border-neutral-200 bg-white text-sm font-semibold"
              >
                {portfolios.map((p) => (
                  <option key={p.key} value={p.key}>{p.label}</option>
                ))}
              </select>
            </div>
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-4">
            <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">Portafolio activo</p>
                  <h2 className="text-xl font-bold text-petrol">Neumáticos destacados</h2>
                </div>
                <span className="text-xs px-3 py-1 rounded-full border border-electric/40 text-electric bg-electric/10">
                  Stock dinámico
                </span>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="rounded-2xl border border-neutral-200 bg-white p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-neutral-500">{product.brand}</p>
                        <h3 className="text-xl font-semibold text-petrol">{product.name}</h3>
                        <p className="text-sm text-neutral-600">{product.segment}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-petrol">${product.price}</p>
                        <p className="text-xs text-emerald-600">Stock {product.stock}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {product.features.map((feat) => (
                        <span key={feat} className="px-3 py-1 rounded-full text-xs bg-neutral-100 text-neutral-700 border border-neutral-200">
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
                        className="text-sm font-semibold text-electric hover:text-petrol transition-colors"
                      >
                        Agregar a cotización
                      </button>
                      <span className="text-xs text-neutral-500">SKU-{product.id.toString().padStart(4, "0")}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {role === "admin" && (
              <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">Gestión de accesos</p>
                    <h2 className="text-xl font-bold text-petrol">Crear cuenta y asignar portafolio</h2>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full border border-neutral-200 text-neutral-600">
                    Solo Admin
                  </span>
                </div>
                <form className="grid sm:grid-cols-2 gap-4" onSubmit={handleCreateUser}>
                  <div className="space-y-2">
                    <label className="text-sm text-neutral-700">Nombre</label>
                    <input
                      type="text"
                      required
                      value={newUser.name}
                      onChange={(e) => setNewUser((u) => ({ ...u, name: e.target.value }))}
                      className="w-full px-4 py-3 rounded-2xl border border-neutral-200 bg-white focus:outline-none focus:border-electric/60 text-neutral-900 placeholder-neutral-400"
                      placeholder="Ej: Camila Ríos"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-neutral-700">Correo</label>
                    <input
                      type="email"
                      required
                      value={newUser.email}
                      onChange={(e) => setNewUser((u) => ({ ...u, email: e.target.value }))}
                      className="w-full px-4 py-3 rounded-2xl border border-neutral-200 bg-white focus:outline-none focus:border-electric/60 text-neutral-900 placeholder-neutral-400"
                      placeholder="usuario@distribuidor.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-neutral-700">Rol</label>
                    <select
                      value={newUser.role}
                      onChange={(e) => setNewUser((u) => ({ ...u, role: e.target.value }))}
                      className="w-full px-4 py-3 rounded-2xl border border-neutral-200 bg-white focus:outline-none focus:border-electric/60 text-neutral-900"
                    >
                      <option value="user">Usuario</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-neutral-700">Portafolio</label>
                    <select
                      className="w-full px-4 py-3 rounded-2xl border border-neutral-200 bg-white focus:outline-none focus:border-electric/60 text-neutral-900"
                      value={activePortfolio}
                      onChange={(e) => handleChangePortfolio(e.target.value)}
                    >
                      {portfolios.map((p) => (
                        <option key={p.key} value={p.key}>{p.label} · {p.description}</option>
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

                <div className="mt-6 grid sm:grid-cols-4 gap-3">
                  {portfolios.map((p) => (
                    <div key={p.key} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
                      <p className="text-sm font-semibold text-petrol">{p.label}</p>
                      <p className="text-xs text-neutral-600 mt-1">{p.description}</p>
                      <p className="text-xs text-emerald-700 mt-2">Accesos activos: 12</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="space-y-4">
            <section className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-petrol">Cotizador rápido</h3>
                <span className="text-xs text-neutral-500">Simular pedido</span>
              </div>
              <div className="space-y-3">
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-neutral-200 bg-white focus:outline-none focus:border-electric/60 text-neutral-900"
                >
                  {filteredProducts.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} · ${p.price}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-2xl border border-neutral-200 bg-white focus:outline-none focus:border-electric/60 text-neutral-900"
                />
                <button
                  onClick={handleAddToQuote}
                  className="w-full px-4 py-3 rounded-2xl bg-electric text-black font-semibold shadow-glow hover:bg-white transition-colors"
                >
                  Agregar
                </button>
              </div>
              <div className="mt-4 space-y-3">
                {quoteItems.length === 0 && <p className="text-sm text-neutral-500">Sin items aún.</p>}
                {quoteItems.map((item) => {
                  const product = products.find((p) => p.id === item.productId);
                  if (!product) return null;
                  return (
                    <div key={item.productId} className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-neutral-50 px-3 py-2">
                      <div>
                        <p className="text-sm font-semibold text-petrol">{product.name}</p>
                        <p className="text-xs text-neutral-600">
                          {item.qty} u · ${product.price} c/u
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="text-sm font-semibold text-petrol">${product.price * item.qty}</p>
                        <button
                          onClick={() => handleRemoveQuoteItem(item.productId)}
                          className="text-xs text-red-500 hover:text-red-400"
                        >
                          x
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-neutral-600">Total estimado</p>
                <p className="text-xl font-bold text-petrol">${totalQuote}</p>
              </div>
            </section>

            <section className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-petrol">Resumen</h3>
                <span className="text-xs text-neutral-500">Estado</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">Órdenes activas</span>
                  <span className="px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-sm font-semibold text-petrol">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">Entregas pendientes</span>
                  <span className="px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-sm font-semibold text-petrol">5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">Tiempo estimado</span>
                  <span className="text-sm font-semibold text-petrol">48h</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">Contacto dedicado</span>
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
