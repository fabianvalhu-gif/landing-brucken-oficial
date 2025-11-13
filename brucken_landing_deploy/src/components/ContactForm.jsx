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
    <section id="contacto" className="section-padding">
      <motion.div
        className="max-w-5xl mx-auto grid gap-8 lg:grid-cols-2"
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
      >
        <motion.div variants={fadeIn("right")} className="space-y-5">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            className="inline-block"
          >
            <div className="px-6 py-2 rounded-full bg-gradient-to-r from-electric/20 to-purple-500/20 border border-electric/30">
              <p className="text-xs uppercase tracking-[0.4em] text-electric font-semibold">
                Contacto
              </p>
            </div>
          </motion.div>
          <h2 className="text-3xl font-semibold">
            Diseñemos juntos la próxima fase de tu crecimiento.
          </h2>
          <p className="text-white/70">
            Cuéntanos sobre tus objetivos, dolores actuales o iniciativas pendientes. Nuestro equipo
            responde en menos de 24 horas para agendar una reunión ejecutiva.
          </p>
          <div className="space-y-2 text-white/70">
            <p>📧 sales@bruckenglobal.com</p>
            <p>🌐 www.bruckenglobal.com</p>
            <p>📍 14 Norte 976, Viña del Mar, Chile</p>
          </div>
        </motion.div>

        <motion.form
          variants={fadeIn("left", 0.1)}
          onSubmit={handleSubmit}
          className="glass-card p-6 md:p-8 space-y-4"
        >
          {["name", "email", "phone", "company"].map((field) => (
            <div key={field} className="flex flex-col gap-1">
              <label htmlFor={field} className="text-sm text-white/70">
                {fieldLabels[field]}
              </label>
              <input
                id={field}
                name={field}
                type={field === "email" ? "email" : "text"}
                className="bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-electric"
                value={formData[field]}
                onChange={handleChange}
                placeholder={placeholders[field] ?? ""}
              />
              {errors[field] && <span className="text-xs text-red-400">{errors[field]}</span>}
            </div>
          ))}

          <div className="flex flex-col gap-1">
            <label htmlFor="message" className="text-sm text-white/70">
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              className="bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-electric"
              value={formData.message}
              onChange={handleChange}
              placeholder="Contexto, objetivos, KPIs..."
            />
            {errors.message && <span className="text-xs text-red-400">{errors.message}</span>}
          </div>

          <button
            type="submit"
            className="cta-button bg-electric text-black w-full justify-center disabled:opacity-60"
            disabled={status === "sending"}
          >
            {status === "sending" ? "Enviando..." : "Enviar mensaje"}
          </button>
          {errors.submit && (
            <p className="text-sm text-red-400 text-center">{errors.submit}</p>
          )}
          {status === "success" && (
            <p className="text-sm text-green-400 text-center">
              Gracias por contactarnos. Te responderemos en breve.
            </p>
          )}
        </motion.form>
      </motion.div>
    </section>
  );
}
