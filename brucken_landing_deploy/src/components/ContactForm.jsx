import { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../utils/animations";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  message: "",
};

const fieldLabels = {
  name: "Nombre",
  email: "Email",
  phone: "Teléfono",
  company: "Empresa",
};

const placeholders = {
  phone: "+56 9 0000 0000",
  company: "Empresa / Organización",
};

export default function ContactForm() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Ingresa tu nombre.";
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email))
      newErrors.email = "Ingresa un email válido.";
    if (!formData.phone.trim()) newErrors.phone = "Ingresa tu teléfono.";
    if (!formData.company.trim()) newErrors.company = "Ingresa el nombre de tu empresa.";
    if (formData.message.trim().length < 10) newErrors.message = "Cuéntanos más del proyecto.";
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length) {
      setErrors(validation);
      return;
    }

    try {
      setStatus("sending");
      const res = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Error desconocido" }));
        throw new Error(err.error || "No se pudo enviar el formulario");
      }

      setStatus("success");
      setFormData(initialForm);
    } catch (e) {
      setStatus("idle");
      setErrors((prev) => ({ ...prev, submit: e.message }));
    }
  };

  return (
    <section id="contacto" className="relative py-16 sm:py-20 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_8%,rgba(27,118,255,0.05),transparent_30%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_0%,rgba(124,58,237,0.05),transparent_28%)]" />
      <motion.div
        className="relative section-container grid gap-8 lg:grid-cols-2"
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <motion.div variants={fadeIn("right")} className="space-y-5">
          <div className="pill-badge">Contacto</div>
          <h2 className="text-3xl md:text-4xl font-bold text-petrol leading-snug">
            Diseñemos juntos la próxima fase de tu crecimiento.
          </h2>
          <p className="text-lg text-muted">
            Cuéntanos tus objetivos, dolores actuales o iniciativas pendientes. Respondemos en menos de 24 horas para
            agendar una reunión ejecutiva.
          </p>
          <div className="space-y-2 text-neutral-700">
            <p>📧 sales@bruckenglobal.com</p>
            <p>🌐 www.bruckenglobal.com</p>
            <p>📍 14 Norte 976, Viña del Mar, Chile</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 text-sm font-semibold">Respuesta en 24h</span>
            <span className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 text-sm font-semibold">Team senior</span>
            <span className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 text-sm font-semibold">Acceso remoto</span>
          </div>
        </motion.div>

        <motion.form
          variants={fadeIn("left", 0.1)}
          onSubmit={handleSubmit}
          className="glass-card p-6 sm:p-8 space-y-4"
        >
          {["name", "email", "phone", "company"].map((field) => (
            <div key={field} className="flex flex-col gap-1">
              <label htmlFor={field} className="text-sm text-neutral-700 font-semibold">
                {fieldLabels[field]}
              </label>
              <input
                id={field}
                name={field}
                type={field === "email" ? "email" : "text"}
                className="bg-white border border-neutral-200 rounded-xl px-4 py-3 text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-electric focus:ring-2 focus:ring-electric/30"
                value={formData[field]}
                onChange={handleChange}
                placeholder={placeholders[field] ?? ""}
              />
              {errors[field] && <span className="text-xs text-red-500">{errors[field]}</span>}
            </div>
          ))}

          <div className="flex flex-col gap-1">
            <label htmlFor="message" className="text-sm text-neutral-700 font-semibold">
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              className="bg-white border border-neutral-200 rounded-xl px-4 py-3 text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-electric focus:ring-2 focus:ring-electric/30"
              value={formData.message}
              onChange={handleChange}
              placeholder="Contexto, objetivos, KPIs..."
            />
            {errors.message && <span className="text-xs text-red-500">{errors.message}</span>}
          </div>

          <button
            type="submit"
            className="cta-button cta-primary w-full justify-center disabled:opacity-60"
            disabled={status === "sending"}
          >
            {status === "sending" ? "Enviando..." : "Enviar mensaje"}
          </button>
          {errors.submit && (
            <p className="text-sm text-red-500 text-center">{errors.submit}</p>
          )}
          {status === "success" && (
            <p className="text-sm text-emerald-600 text-center font-semibold">
              Gracias por contactarnos. Te responderemos en breve.
            </p>
          )}
        </motion.form>
      </motion.div>
    </section>
  );
}
