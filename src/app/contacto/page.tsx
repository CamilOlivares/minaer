/**
 * src/app/contacto/page.tsx — Formulario de Contacto
 * ====================================================
 * Página de contacto con formulario inteligente que permite:
 *
 * 1. Seleccionar el área de requerimiento (seguridad, vialidad, aseo, obras)
 * 2. Ingresar nombre/empresa y teléfono
 * 3. Describir el servicio necesitado
 * 4. Verificación anti-bot con Cloudflare Turnstile
 *
 * Protección anti-spam:
 * - Usa @marsidev/react-turnstile para integrar el captcha de Cloudflare.
 * - El formulario NO se envía si el token de Turnstile no se ha generado.
 *
 * IMPORTANTE: Reemplazar "TU_CLOUDFLARE_SITE_KEY" con la clave real
 * obtenida en https://dash.cloudflare.com → Turnstile → Add site.
 *
 * TODO: Conectar handleSubmit a un backend real (Supabase, API de email,
 * Resend, etc.) para procesar las solicitudes.
 */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Turnstile } from "@marsidev/react-turnstile";

export default function ContactoPage() {
  /* ─── Estado del token de verificación Turnstile ─────── */
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  /* ─── Estado del área de requerimiento seleccionada ───── */
  const [area, setArea] = useState("seguridad");

  /**
   * handleSubmit — Procesa el envío del formulario
   * Valida que el captcha Turnstile haya sido completado
   * antes de permitir el envío.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Evita la recarga de la página

    // Validar que el usuario completó el captcha
    if (!turnstileToken) {
      alert("Por favor, verifica que eres humano.");
      return;
    }

    // TODO: Reemplazar con lógica real de envío al backend
    // Ejemplo con Supabase:
    //   await supabase.from('solicitudes').insert({
    //     area,
    //     nombre: formData.get('nombre'),
    //     telefono: formData.get('telefono'),
    //     detalle: formData.get('detalle'),
    //     turnstile_token: turnstileToken,
    //   });
    alert(
      `Formulario enviado al área de ${area} con token: ${turnstileToken.slice(0, 10)}...`
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* ─── Encabezado de la página ─────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-black mb-4">
          Hablemos de tu Proyecto
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Selecciona el área de interés para derivar tu solicitud al
          especialista adecuado.
        </p>
      </motion.div>

      {/* ─── Formulario de contacto ──────────────────────── */}
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        onSubmit={handleSubmit}
        className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* ─── Selector de Área de Requerimiento ───────── */}
          <div className="md:col-span-2">
            <label
              htmlFor="area"
              className="block text-sm font-bold mb-2 uppercase tracking-wide text-slate-500"
            >
              Área de Requerimiento
            </label>
            <select
              id="area"
              name="area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl p-4 outline-none focus:ring-2 focus:ring-red-500 transition-all dark:text-white"
            >
              <option value="seguridad">
                Seguridad Privada (Guardias OS10)
              </option>
              <option value="vialidad">
                Mantención y Segregación Vial
              </option>
              <option value="aseo">Aseo Industrial y Facility</option>
              <option value="obras">Obras Civiles Menores</option>
            </select>
          </div>

          {/* ─── Campo: Nombre o Empresa ─────────────────── */}
          <div>
            <label
              htmlFor="nombre"
              className="block text-sm font-bold mb-2 uppercase tracking-wide text-slate-500"
            >
              Nombre o Empresa
            </label>
            <input
              id="nombre"
              name="nombre"
              required
              type="text"
              className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl p-4 outline-none focus:ring-2 focus:ring-red-500 transition-all dark:text-white"
              placeholder="Ej: Constructora XYZ"
            />
          </div>

          {/* ─── Campo: Teléfono ─────────────────────────── */}
          <div>
            <label
              htmlFor="telefono"
              className="block text-sm font-bold mb-2 uppercase tracking-wide text-slate-500"
            >
              Teléfono
            </label>
            <input
              id="telefono"
              name="telefono"
              required
              type="tel"
              className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl p-4 outline-none focus:ring-2 focus:ring-red-500 transition-all dark:text-white"
              placeholder="+56 9 ..."
            />
          </div>

          {/* ─── Campo: Detalle del Servicio ─────────────── */}
          <div className="md:col-span-2">
            <label
              htmlFor="detalle"
              className="block text-sm font-bold mb-2 uppercase tracking-wide text-slate-500"
            >
              Detalle del Servicio
            </label>
            <textarea
              id="detalle"
              name="detalle"
              required
              rows={4}
              className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl p-4 outline-none focus:ring-2 focus:ring-red-500 transition-all dark:text-white resize-none"
              placeholder="Ej: Necesitamos 4 guardias para faena nocturna..."
            />
          </div>
        </div>

        {/* ─── Captcha: Cloudflare Turnstile ─────────────── */}
        {/* IMPORTANTE: Reemplaza "TU_CLOUDFLARE_SITE_KEY" con tu clave real.
            Obtén una en: https://dash.cloudflare.com → Turnstile → Add site.
            Para desarrollo local puedes usar la clave de prueba:
            "1x00000000000000000000AA" (siempre pasa) */}
        <div className="flex justify-center mb-8">
          <Turnstile
            siteKey="1x00000000000000000000AA"
            onSuccess={(token) => setTurnstileToken(token)}
            options={{ theme: "auto" }}
          />
        </div>

        {/* ─── Botón de envío ────────────────────────────── */}
        <button
          type="submit"
          className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-red-500/30"
        >
          Enviar Solicitud
        </button>
      </motion.form>
    </div>
  );
}