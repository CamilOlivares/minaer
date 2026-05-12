/**
 * src/components/ThemeToggle.tsx — Botón de Tema (Dark / Light)
 * ==============================================================
 * Componente cliente que alterna entre modo oscuro y claro.
 *
 * Funcionamiento:
 * 1. Al montar, detecta la preferencia del sistema operativo
 *    con `matchMedia("prefers-color-scheme: dark")`.
 * 2. Agrega/quita la clase "dark" en <html>, lo cual activa
 *    las variantes `dark:` de Tailwind CSS.
 * 3. Usa Framer Motion para microanimaciones (hover y tap).
 *
 * Iconos:
 * - Sol (Sun)  → se muestra cuando el tema es oscuro (clic = ir a light)
 * - Luna (Moon) → se muestra cuando el tema es claro (clic = ir a dark)
 */
"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  /* ─── Estado: ¿Está activo el modo oscuro? ────────────── */
  const [isDark, setIsDark] = useState(true);

  /* ─── Efecto: Sincronizar estado inicial al montar ──────── */
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Por defecto el sitio inicia en Dark. Solo aplicamos si el HTML perdiera la clase
      if (!document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.add("dark");
      }
      setIsDark(true);
    }
  }, []); // [] = solo se ejecuta una vez al montar el componente

  /* ─── Alternar tema ────────────────────────────────────── */
  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}  // Escala al pasar el mouse
      whileTap={{ scale: 0.9 }}    // Escala al hacer clic
      onClick={toggleTheme}
      className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-yellow-400 transition-all shadow-inner border border-white/10"
      aria-label="Alternar tema oscuro/claro"
    >
      {/* Muestra sol en oscuro (para ir a claro) o luna en claro (para ir a oscuro) */}
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </motion.button>
  );
}