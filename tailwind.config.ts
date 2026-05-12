/**
 * tailwind.config.ts
 * ==================
 * Configuración de Tailwind CSS v3 para el proyecto Minaer.
 *
 * - darkMode "class": El modo oscuro se activa agregando la clase "dark"
 *   al <html>. Esto lo controla el componente ThemeToggle.
 * - content: Tailwind escanea estos archivos para generar solo las clases
 *   CSS que realmente se usan (purge automático en producción).
 */

import type { Config } from "tailwindcss";

const config: Config = {
  /* ─── Modo Oscuro ─────────────────────────────────────────── */
  darkMode: "class",

  /* ─── Archivos a escanear para clases CSS ─────────────────── */
  content: [
    "./src/app/**/*.{ts,tsx,js,jsx,mdx}",
    "./src/components/**/*.{ts,tsx,js,jsx,mdx}",
  ],

  /* ─── Personalización del tema ────────────────────────────── */
  theme: {
    extend: {
      colors: {
        red: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#d31c2d',  // Logo Primary Red
          600: '#b91823',
          700: '#9b141d',
          800: '#81121a',
          900: '#6d1217',
          950: '#3c060a',
        },
      },
    },
  },

  /* ─── Plugins de Tailwind ─────────────────────────────────── */
  plugins: [],
};

export default config;
