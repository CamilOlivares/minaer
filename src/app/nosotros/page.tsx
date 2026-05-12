/**
 * src/app/nosotros/page.tsx — Página "Nuestra Historia"
 * ======================================================
 * Página corporativa que explica la historia de Minaer y la
 * fusión estratégica con Protal. Muestra los pilares de la empresa:
 * - Seguridad legal y cumplimiento normativo
 * - Gestión centralizada de facility y vialidad
 *
 * Usa Framer Motion para animaciones de entrada (fade + slide).
 * Es un Client Component ("use client") porque Framer Motion
 * requiere hooks del navegador.
 */
"use client";

import { motion } from "framer-motion";
import { Shield, Briefcase } from "lucide-react"; // Solo los iconos que se usan

export default function NosotrosPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 md:py-20">
      {/* ─── Encabezado de la página ─────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        {/* H1 único de la página (buena práctica SEO) */}
        <h1 className="text-4xl md:text-6xl font-black mb-6">
          Nuestra Historia
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
          La evolución hacia una corporación de servicios integrales.
          Unimos la experiencia en infraestructura vial con la rigurosidad
          operativa de la seguridad privada.
        </p>
      </motion.div>

      {/* ─── Contenido principal: texto + tarjetas ───────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        {/* Columna izquierda: Texto narrativo */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-4">La Fusión Estratégica</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
            Minaer absorbe las operaciones de Protal para centralizar la
            gestión de nuestros clientes. Ahora, una misma plataforma coordina
            la protección de sus instalaciones con acreditación OS10, mientras
            mantiene y construye la infraestructura vial y civil que su
            operación necesita.
          </p>
        </motion.div>

        {/* Columna derecha: Tarjetas de pilares */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {/* Tarjeta: Seguridad Legal */}
          <div className="p-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800">
            <Shield className="text-red-500 mb-4" size={32} />
            <h3 className="font-bold mb-2">Seguridad Legal</h3>
            <p className="text-sm text-slate-500">
              Cumplimiento estricto de normativas y leyes laborales.
            </p>
          </div>

          {/* Tarjeta: Gestión Centralizada */}
          <div className="p-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800">
            <Briefcase className="text-red-500 mb-4" size={32} />
            <h3 className="font-bold mb-2">Gestión Centralizada</h3>
            <p className="text-sm text-slate-500">
              Un solo proveedor para resolver facility y vialidad.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
