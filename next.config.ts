/**
 * next.config.ts
 * ==============
 * Configuración principal de Next.js para el proyecto Minaer.
 *
 * - Usa el App Router (por defecto en Next.js 13+).
 * - Se pueden agregar aquí: redirects, rewrites, variables de entorno
 *   públicas, optimización de imágenes con dominios externos, etc.
 */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* ─── Opciones de configuración ───────────────────────────── */
  // Por ahora la configuración base es suficiente.
  // Ejemplos de opciones comunes:
  //
  // images: {
  //   domains: ['minaer.cl'],   // dominios permitidos para <Image />
  // },
  //
  // env: {
  //   NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  // },
};

export default nextConfig;
