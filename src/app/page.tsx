/**
 * src/app/page.tsx — Página de Inicio (Home)
 * ============================================
 * Página principal del sitio Minaer. Contiene:
 *
 * 1. Hero Carousel: Banner con transición automática entre 3 imágenes
 *    representando cada unidad de negocio (seguridad, vialidad, facility)
 * 2. Servicios:     Tarjetas con imágenes de fondo (id="servicios")
 * 3. Estadísticas:  Cifras de confianza
 * 4. Beneficios:    Lista con checkmarks
 * 5. CTA Final:     Llamada a la acción
 *
 * Es un Client Component ("use client") porque necesita:
 * - useState/useEffect para el carrusel automático del hero
 * - Framer Motion para las animaciones de transición
 */
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import {
  Shield,        // Icono para seguridad
  HardHat,       // Icono para obras viales
  Sparkles,      // Icono para facility/aseo
  ArrowRight,    // Flecha para botones CTA
  CheckCircle2,  // Checks para la lista de beneficios
  Clock,         // Para operaciones
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   DATOS DEL CARRUSEL HERO
   ═══════════════════════════════════════════════════════════════
   Cada slide tiene imagen de fondo, título, subtítulo y badge.
   Las imágenes están en /public/images/ y se sirven como estáticas. */
const heroSlides = [
  {
    image: "/images/hero-seguridad.png",
    badge: "Seguridad Privada OS10",
    titulo: "Protegemos lo que construyes",
    subtitulo: "Guardias acreditados ante Carabineros de Chile para la protección integral de sus activos e instalaciones.",
  },
  {
    image: "/images/hero-vialidad.png",
    badge: "Mantención Vial",
    titulo: "Infraestructura que conecta",
    subtitulo: "Demarcación termoplástica, segregación de faenas y logística vial con la más alta precisión técnica.",
  },
  {
    image: "/images/hero-facility.png",
    badge: "Aseo Industrial & Facility",
    titulo: "Espacios que inspiran",
    subtitulo: "Limpieza técnica de plantas y corporativos con protocolos sanitarios de clase industrial.",
  },
];

/* ═══════════════════════════════════════════════════════════════
   DATOS DE TARJETAS DE SERVICIOS
   ═══════════════════════════════════════════════════════════════ */
const servicios = [
  {
    icon: Shield,
    titulo: "Seguridad Privada OS10",
    desc: "Guardias acreditados ante Carabineros de Chile. Control de acceso, rondas y protección de activos 24/7.",
    href: "/servicios/seguridad",
    image: "/images/hero-seguridad.png",
    color: "blue",
  },
  {
    icon: HardHat,
    titulo: "Mantención y Obras Viales",
    desc: "Demarcación termoplástica, segregación vial con barreras New Jersey y logística de cuadrillas en carreteras.",
    href: "/servicios/viabilidad",
    image: "/images/hero-vialidad.png",
    color: "yellow",
  },
  {
    icon: Sparkles,
    titulo: "Aseo Industrial & Facility",
    desc: "Limpieza técnica de plantas, mantención de áreas verdes y facility management para corporativos.",
    href: "/servicios/facility",
    image: "/images/hero-facility.png",
    color: "green",
  },
];

/* ─── Datos de estadísticas ─────────────────────────────────── */
import { Award, Users, Navigation } from "lucide-react"; // Importar nuevos iconos 
const estadisticas = [
  { valor: 10, sufijo: "+", label: "Años de experiencia", icon: Award },
  { valor: 200, sufijo: "+", label: "Guardias activos", icon: Users },
  { valor: 500, sufijo: "km", label: "Demarcación vial", icon: Navigation },
  { valor: 24, sufijo: "/7", label: "Operación continua", icon: Clock },
];

function AnimatedStat({
  valor,
  sufijo,
  label,
  icon: Icon,
}: {
  valor: number;
  sufijo: string;
  label: string;
  icon: React.ElementType;
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      animate(count, valor, {
        duration: 2,
        ease: "easeOut",
      });
    }
  }, [isInView, valor, count]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center p-6 bg-slate-800/30 rounded-3xl border border-red-500/20 shadow-[0_0_15px_rgba(211,28,45,0.1)] hover:shadow-[0_0_25px_rgba(211,28,45,0.4)] transition-all duration-500 group"
    >
      <motion.div
        animate={isInView ? { scale: [1, 1.2, 1], filter: ["blur(2px)", "blur(0px)"] } : {}}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
        className="mb-4 text-red-500 group-hover:text-red-400 drop-shadow-[0_0_10px_rgba(211,28,45,0.8)]"
      >
        <Icon size={40} strokeWidth={1.5} />
      </motion.div>
      <div className="text-4xl md:text-5xl font-black text-white mb-2 flex items-center drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
        <motion.span>{rounded}</motion.span>
        <span className="text-red-500 ml-1 drop-shadow-[0_0_8px_rgba(211,28,45,0.8)]">{sufijo}</span>
      </div>
      <div className="text-sm font-semibold text-slate-300 uppercase tracking-wider group-hover:text-white transition-colors text-center w-full">
        {label}
      </div>
    </motion.div>
  );
}

export default function HomePage() {
  /* ═══════════════════════════════════════════════════════════
     LÓGICA DEL CARRUSEL
     ═══════════════════════════════════════════════════════════
     - currentSlide: índice del slide actual (0, 1, 2)
     - Cambia automáticamente cada 6 segundos
     - Se puede navegar con los indicadores (dots) */
  const [currentSlide, setCurrentSlide] = useState(0);

  /** Avanza al siguiente slide (circular) */
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  /** Temporizador automático del carrusel */
  useEffect(() => {
    const timer = setInterval(nextSlide, 6000); // Cambia cada 6 segundos
    return () => clearInterval(timer); // Limpia al desmontar
  }, [nextSlide]);

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          SECCIÓN 1: HERO CAROUSEL — Banner con imágenes rotativas
          ═══════════════════════════════════════════════════════
          - Ocupa casi toda la pantalla (min-h-[85vh])
          - Las imágenes hacen transición con fade + zoom suave
          - Overlay oscuro para legibilidad del texto
          - Indicadores (dots) en la parte inferior */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden -mt-28">
        {/* ─── Imágenes de fondo con transición ───────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={heroSlides[currentSlide].image}
              alt={heroSlides[currentSlide].badge}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            {/* Overlay oscuro con gradiente para legibilidad del texto */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
          </motion.div>
        </AnimatePresence>

        {/* ─── Contenido del hero (texto sobre imagen) ────── */}
        <div className="relative z-10 max-w-5xl mx-auto text-center px-6 pt-28">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Badge del servicio actual */}
              <span className="inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-widest bg-red-500/20 text-red-300 rounded-full mb-6 border border-red-400/30 backdrop-blur-sm">
                {heroSlides[currentSlide].badge}
              </span>

              {/* Título principal del slide */}
              <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 tracking-tight text-white">
                {heroSlides[currentSlide].titulo}
              </h1>

              {/* Subtítulo descriptivo */}
              <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
                {heroSlides[currentSlide].subtitulo}
              </p>

              {/* Botones CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contacto"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:-translate-y-0.5"
                >
                  Solicitar Cotización <ArrowRight size={18} />
                </Link>
                <Link
                  href="/#servicios"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold rounded-xl transition-all hover:bg-white/20 hover:-translate-y-0.5"
                >
                  Ver Servicios
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ─── Indicadores del carrusel (dots) ──────────── */}
          <div className="flex justify-center gap-3 mt-12">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Ir al slide ${index + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  index === currentSlide
                    ? "w-10 h-3 bg-red-500"           // Activo: barra ancha
                    : "w-3 h-3 bg-white/40 hover:bg-white/60" // Inactivo: punto
                }`}
              />
            ))}
          </div>
        </div>

        {/* ─── Barra de progreso del carrusel ─────────────── */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
          <motion.div
            key={currentSlide}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 6, ease: "linear" }}
            className="h-full bg-red-500"
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECCIÓN 2: SERVICIOS — Tarjetas con imágenes de fondo
          id="servicios" es el ancla para el link /#servicios
          ═══════════════════════════════════════════════════════ */}
      <section id="servicios" className="max-w-6xl mx-auto px-6 py-20">
        {/* Encabezado de sección */}
        <div className="text-center mb-16">
          <span className="text-sm font-bold uppercase tracking-widest text-red-500 mb-4 block">
            Nuestras Unidades
          </span>
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            Servicios Integrados
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Tres pilares operativos bajo una sola administración. Reducimos
            costos y simplificamos la gestión para su empresa.
          </p>
        </div>

        {/* Grid de tarjetas de servicios con imágenes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicios.map((servicio) => (
            <Link
              key={servicio.href}
              href={servicio.href}
              className="group relative overflow-hidden rounded-3xl aspect-[3/4] block"
            >
              {/* Imagen de fondo del servicio */}
              <Image
                src={servicio.image}
                alt={servicio.titulo}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 33vw"
              />

              {/* Overlay gradiente oscuro (más oscuro abajo para texto) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-all duration-300 group-hover:from-black/80" />

              {/* Contenido de la tarjeta (sobre la imagen) */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                {/* Icono del servicio con fondo glassmorphism */}
                <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 border border-white/20 group-hover:bg-red-500/30 transition-colors duration-300">
                  <servicio.icon size={28} className="text-white" />
                </div>

                {/* Título y descripción */}
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-red-300 transition-colors">
                  {servicio.titulo}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  {servicio.desc}
                </p>

                {/* Enlace visual con flecha animada */}
                <span className="inline-flex items-center gap-2 text-sm font-bold text-red-400 group-hover:text-red-300 transition-colors">
                  Conocer más
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-2 transition-transform duration-300"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECCIÓN 3: ESTADÍSTICAS — Cifras de confianza
          ═══════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 relative overflow-hidden">
        {/* Glow de fondo para las estadísticas */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-slate-900 to-slate-950 opacity-60" />

        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {estadisticas.map((stat) => (
            <AnimatedStat
              key={stat.label}
              valor={stat.valor}
              sufijo={stat.sufijo}
              label={stat.label}
              icon={stat.icon}
            />
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECCIÓN 4: POR QUÉ MINAER — Beneficios clave
          ═══════════════════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-sm font-bold uppercase tracking-widest text-red-500 mb-4 block">
              ¿Por qué elegirnos?
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-6">
              Un solo proveedor, múltiples soluciones
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              Minaer centraliza la seguridad privada, infraestructura vial y
              facility management bajo una única administración. Menos
              proveedores, menos riesgos y menor costo operativo.
            </p>

            {/* Lista de beneficios */}
            <ul className="space-y-4">
              {[
                "Acreditación OS10 ante Carabineros de Chile",
                "Dotación con seguros y contratos transparentes",
                "Operación 24/7 con turnos rotativos",
                "Reportabilidad constante y trazabilidad digital",
              ].map((beneficio) => (
                <li
                  key={beneficio}
                  className="flex items-start gap-3 text-slate-700 dark:text-slate-300"
                >
                  <CheckCircle2
                    size={20}
                    className="text-red-500 mt-0.5 shrink-0"
                  />
                  <span>{beneficio}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tarjeta visual con imagen decorativa */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-yellow-500/20 rounded-3xl blur-2xl" />
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl aspect-[4/3]">
              <Image
                src="/images/hero-seguridad.png"
                alt="Minaer — Seguridad y protección integral"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Overlay con branding */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
                <div>
                  <div className="text-4xl font-black text-white mb-2">
                    Minaer<span className="text-red-500">.</span>
                  </div>
                  <p className="text-slate-300 text-sm">
                    Seguridad Privada, Mantenimiento Vial y Servicios
                    Industriales desde Villa Alemana, Región de Valparaíso.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECCIÓN 5: CTA FINAL — Llamada a la acción
          ═══════════════════════════════════════════════════════ */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-black mb-6">
          ¿Listo para comenzar?
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
          Cuéntanos sobre tu operación y te entregaremos una propuesta a la
          medida en menos de 48 horas.
        </p>
        <Link
          href="/contacto"
          className="inline-flex items-center gap-2 px-10 py-4 bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:-translate-y-0.5"
        >
          Contactar Ahora <ArrowRight size={18} />
        </Link>
      </section>
    </>
  );
}
