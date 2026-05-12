/**
 * src/app/servicios/viabilidad/page.tsx — Mantención y Obras Viales
 * ===================================================================
 * Página de detalle de la unidad de Infraestructura Vial.
 * Incluye hero con imagen de fondo y tarjetas de servicios.
 *
 * Color temático: Amarillo (yellow-500)
 */
"use client";

import { motion } from "framer-motion";
import { Paintbrush, Construction, Truck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

/* ─── Datos de los servicios viales ───────────────────────── */
const serviciosViales = [
  {
    icon: Paintbrush,
    title: "Pintura y Demarcación",
    desc: "Aplicación de pintura termoplástica y acrílica para alto tráfico, pasos peatonales y estacionamientos.",
  },
  {
    icon: Construction,
    title: "Segregación Vial",
    desc: "Instalación de conos, barreras New Jersey y señalética transitoria para trabajos seguros en calzada.",
  },
  {
    icon: Truck,
    title: "Transporte y Logística",
    desc: "Traslado de cuadrillas operativas bajo normativas de transporte privado de pasajeros.",
  },
];

export default function VialidadPage() {
  return (
    <div>
      {/* ─── Hero con imagen de fondo ─────────────────────── */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden -mt-28">
        <Image
          src="/images/hero-vialidad.png"
          alt="Mantención y Obras Viales"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        <div className="relative z-10 text-center px-6 pt-28">
          <span className="inline-block px-4 py-1 text-xs font-bold uppercase tracking-widest bg-yellow-500/20 text-yellow-300 rounded-full border border-yellow-400/30 backdrop-blur-sm">
            Unidad de Infraestructura
          </span>
          <h1 className="text-4xl md:text-6xl font-black mt-6 mb-4 text-white">
            Mantención y Obras Viales
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Ejecución técnica en carreteras e instalaciones industriales.
            Precisión en demarcación y seguridad total en la segregación de rutas.
          </p>
        </div>
      </section>

      {/* ─── Grid de servicios ────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {serviciosViales.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
            >
              <item.icon size={40} className="text-yellow-500 mb-6" />
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ─── CTA ────────────────────────────────────────── */}
        <div className="text-center">
          <Link
            href="/contacto"
            className="inline-block px-8 py-4 bg-yellow-600 hover:bg-yellow-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-yellow-500/25"
          >
            Solicitar Presupuesto Vial
          </Link>
        </div>
      </div>
    </div>
  );
}