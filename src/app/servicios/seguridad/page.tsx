/**
 * src/app/servicios/seguridad/page.tsx — Seguridad Privada OS10
 * ===============================================================
 * Página de detalle de la unidad de Seguridad Privada.
 * Incluye hero con imagen de fondo y tarjetas de servicios.
 *
 * Color temático: Azul (red-500)
 */
"use client";

import { motion } from "framer-motion";
import { ShieldAlert, UserCheck, FileCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

/* ─── Datos de las tarjetas de servicios de seguridad ──────── */
const serviciosSeguridad = [
  {
    icon: UserCheck,
    title: "Guardias Acreditados",
    desc: "Personal con curso OS10 vigente, capacitado en control de crisis y primeros auxilios.",
  },
  {
    icon: ShieldAlert,
    title: "Control de Acceso",
    desc: "Gestión perimetral, registro de visitas y control de ingreso de vehículos a plantas.",
  },
  {
    icon: FileCheck,
    title: "Cumplimiento Legal",
    desc: "Dotación con seguros de vida de ley, contratos transparentes y reportabilidad constante.",
  },
];

export default function SeguridadPage() {
  return (
    <div>
      {/* ─── Hero con imagen de fondo ─────────────────────── */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden -mt-28">
        <Image
          src="/images/hero-seguridad.png"
          alt="Seguridad Privada OS10"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        <div className="relative z-10 text-center px-6 pt-28">
          <span className="inline-block px-4 py-1 text-xs font-bold uppercase tracking-widest bg-red-500/20 text-red-300 rounded-full border border-red-400/30 backdrop-blur-sm">
            Unidad de Protección
          </span>
          <h1 className="text-4xl md:text-6xl font-black mt-6 mb-4 text-white">
            Seguridad Privada OS10
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Blindamos sus activos y protegemos a su personal mediante guardias
            certificados ante Carabineros de Chile. Cumplimiento absoluto del D.S. 93.
          </p>
        </div>
      </section>

      {/* ─── Grid de servicios ────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {serviciosSeguridad.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
            >
              <item.icon size={40} className="text-red-500 mb-6" />
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
            className="inline-block px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-red-500/25"
          >
            Cotizar Servicio de Guardias
          </Link>
        </div>
      </div>
    </div>
  );
}