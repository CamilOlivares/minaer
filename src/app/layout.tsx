/**
 * src/app/layout.tsx — Layout Raíz de la Aplicación
 * ===================================================
 * Este componente envuelve TODAS las páginas del sitio. Define:
 *
 * 1. <html> y <body> con soporte para dark mode (clase "dark")
 * 2. Navbar flotante con glassmorphism (vidrio difuminado)
 * 3. Área de contenido principal (<main>)
 * 4. Footer global con información de contacto y operaciones
 *
 * Al ser un Server Component (sin "use client"), los metadatos
 * se exportan como objeto estático para SEO.
 *
 * Fuente: Inter de Google Fonts (sans-serif moderna y legible).
 */
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import SplashScreen from "@/components/SplashScreen";
import NetworkBackground from "@/components/NetworkBackground";
import { MapPin, Phone, Clock } from "lucide-react";

/* ─── Configuración de la fuente Inter ────────────────────────
   Next.js descarga y sirve la fuente automáticamente (sin CLS).
   subsets: ["latin"] genera solo los caracteres necesarios. */
const inter = Inter({ subsets: ["latin"] });

/* ─── Metadatos SEO de la página ──────────────────────────────
   Se aplican como <title> y <meta name="description"> en el <head>.
   Cada página hija puede sobrescribirlos con su propio export. */
export const metadata: Metadata = {
    title: "Minaer | Seguridad Privada y Mantención Vial",
    description:
        "Soluciones integrales de seguridad OS10, aseo industrial, obras civiles y mantención vial en Chile.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es" className="scroll-smooth dark">
            <body
                className={`${inter.className} bg-transparent text-slate-900 dark:text-slate-50 transition-colors duration-500`}
            >
                {/* Capa de Base de Color Sólido */}
                <div className="fixed inset-0 -z-30 bg-slate-50 dark:bg-slate-950 transition-colors duration-500" />
                {/* Fondo Animado de Nodos Global */}
                <div className="fixed inset-0 -z-20">
                    <NetworkBackground />
                </div>

                {/* Pantalla Splash Intro */}
                <SplashScreen />

                {/* ═══════════════════════════════════════════════
                    NAVBAR GLOBAL — Barra de navegación flotante
                    ═══════════════════════════════════════════════
                    - fixed: queda fija al hacer scroll
                    - backdrop-blur-xl: efecto glassmorphism
                    - left-1/2 -translate-x-1/2: centrado horizontal
                    ═══════════════════════════════════════════════ */}
                <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl px-6 py-4 rounded-2xl border border-white/20 bg-white/30 dark:bg-black/30 backdrop-blur-xl flex justify-between items-center shadow-lg">
                    {/* Logo / Marca */}
                    <Link
                        href="/"
                        className="font-black text-2xl tracking-tighter uppercase flex items-center justify-center shrink-0 w-36 h-10 relative"
                    >
                        <img 
                            src="/images/logo1.png" 
                            alt="Minaer Logo" 
                            className="object-contain w-full h-full"
                        />
                    </Link>

                    {/* Links de navegación (visibles solo en desktop md+) */}
                    <div className="hidden md:flex gap-8 text-sm font-semibold">
                        <Link
                            href="/#servicios"
                            className="hover:text-red-500 transition-colors"
                        >
                            Servicios
                        </Link>
                        <Link
                            href="/nosotros"
                            className="hover:text-red-500 transition-colors"
                        >
                            Nosotros
                        </Link>
                        <Link
                            href="/contacto"
                            className="hover:text-red-500 transition-colors"
                        >
                            Contacto
                        </Link>
                    </div>

                    {/* Botón de alternancia de tema (dark/light) */}
                    <ThemeToggle />
                </nav>

                {/* ═══════════════════════════════════════════════
                    CONTENIDO PRINCIPAL
                    ═══════════════════════════════════════════════
                    pt-28: padding superior para compensar el navbar fijo */}
                <main className="min-h-screen pt-28">{children}</main>

                {/* ═══════════════════════════════════════════════
                    FOOTER GLOBAL
                    ═══════════════════════════════════════════════
                    Información de contacto centralizada y horarios
                    de operación (terreno vs. administración). */}
                <footer className="relative z-10 mt-20 py-16 px-6 bg-slate-200/10 dark:bg-slate-900/20 backdrop-blur-md border-t border-white/20 dark:border-white/10 shadow-lg text-slate-700 dark:text-slate-300 transition-colors">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* Columna 1: Logo + Descripción */}
                        <div>
                            <Link href="/" className="flex items-center w-48 h-12 relative mb-4">
                                <img 
                                    src="/images/logo1.png" 
                                    alt="Minaer Logo" 
                                    className="object-contain w-full h-full"
                                />
                            </Link>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Seguridad Privada OS10, Mantenimiento Vial y
                                Servicios Industriales consolidados en una sola
                                plataforma corporativa.
                            </p>
                        </div>

                        {/* Columna 2: Datos de contacto */}
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white uppercase text-sm tracking-wider mb-4 transition-colors">
                                Contacto Central
                            </h4>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-center gap-2">
                                    <MapPin size={16} className="text-red-500" />
                                    Villa Alemana, Región de Valparaíso
                                </li>
                                <li className="flex items-center gap-2">
                                    <Phone size={16} className="text-red-500" />
                                    +56 9 1234 5678
                                </li>
                            </ul>
                        </div>

                        {/* Columna 3: Horarios de operación */}
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white uppercase text-sm tracking-wider mb-4 transition-colors">
                                Operaciones
                            </h4>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-center gap-2">
                                    <Clock size={16} className="text-red-500" />
                                    Terreno: 24/7 (Turnos rotativos)
                                </li>
                                <li className="flex items-center gap-2">
                                    <Clock size={16} className="text-slate-600" />
                                    Administración: Lun - Vie, 09:00 - 18:00
                                </li>
                            </ul>
                        </div>
                    </div>
                </footer>

                {/* Widget Global de WhatsApp */}
                <WhatsAppWidget />
            </body>
        </html>
    );
}