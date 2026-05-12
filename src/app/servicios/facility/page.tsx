/**
 * src/app/servicios/facility/page.tsx — Aseo Industrial & Paisajismo
 * ===================================================================
 * Página de detalle de la unidad de Facility Management.
 * Incluye hero con imagen de fondo y tarjetas de servicios.
 *
 * Color temático: Verde (green-500)
 */
"use client";

import { motion } from "framer-motion";
import { Sparkles, TreePine, Factory } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

/* ─── Datos de los servicios de facility ──────────────────── */
const serviciosFacility = [
  {
    icon: Factory,
    title: "Aseo Industrial",
    desc: "Limpieza técnica de galpones, líneas de producción y manejo de residuos con protocolos sanitarios.",
  },
  {
    icon: Sparkles,
    title: "Aseo de Oficinas",
    desc: "Mantención diaria de corporativos, salas de reuniones y sanitización de áreas comunes.",
  },
  {
    icon: TreePine,
    title: "Áreas Verdes",
    desc: "Diseño paisajístico, instalación de riego tecnificado y mantenimiento de jardines industriales.",
  },
];

export default function FacilityPage() {
  return (
    <div>
      {/* ─── Hero con imagen de fondo ─────────────────────── */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden -mt-28">
        <Image
          src="/images/hero-facility.png"
          alt="Aseo Industrial & Paisajismo"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        <div className="relative z-10 text-center px-6 pt-28">
          <span className="inline-block px-4 py-1 text-xs font-bold uppercase tracking-widest bg-green-500/20 text-green-300 rounded-full border border-green-400/30 backdrop-blur-sm">
            Unidad de Mantenimiento
          </span>
          <h1 className="text-4xl md:text-6xl font-black mt-6 mb-4 text-white">
            Aseo Industrial &amp; Paisajismo
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Garantizamos entornos de trabajo impecables y áreas verdes
            corporativas que reflejan la excelencia de su empresa.
          </p>
        </div>
      </section>

      {/* ─── Grid de servicios ────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {serviciosFacility.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
            >
              <item.icon size={40} className="text-green-500 mb-6" />
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
            className="inline-block px-8 py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-green-500/25"
          >
            Cotizar Mantención
          </Link>
        </div>
      </div>
    </div>
  );
}