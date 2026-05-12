"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen() {
  const [showSplash, setShowSplash] = useState(true);
  const [step, setStep] = useState<"icon" | "full">("icon");

  useEffect(() => {
    // Secuencia de animación de la pantalla de carga
    const stepTimer = setTimeout(() => {
      setStep("full"); // Cambia del icono al logo completo después de 1.5s
    }, 1500);

    const finishTimer = setTimeout(() => {
      setShowSplash(false); // Oculta el splash screen después de 3.2s
      document.body.style.overflow = "auto"; // Restaura el scroll
    }, 3200);

    // Bloquea el scroll mientras carga
    document.body.style.overflow = "hidden";

    return () => {
      clearTimeout(stepTimer);
      clearTimeout(finishTimer);
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden"
        >
          {/* Fondo futurista y dinámico */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-950/40 via-black to-black opacity-80" />
          
          {/* Anillos de escaneo futurista */}
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [1, 2, 2.5], opacity: [0.5, 0.2, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute w-64 h-64 border border-red-500/30 rounded-full"
          />
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.5, 2], opacity: [0.8, 0.3, 0] }}
            transition={{ duration: 2, delay: 0.5, repeat: Infinity, ease: "linear" }}
            className="absolute w-48 h-48 border border-red-600/20 rounded-full"
          />

          <div className="relative z-10 flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              {step === "icon" ? (
                <motion.div
                  key="icon"
                  initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
                  animate={{ 
                    scale: [1, 1.1, 1], 
                    opacity: 1, 
                    filter: "blur(0px)",
                  }}
                  exit={{ 
                    scale: 0.5, 
                    opacity: 0, 
                    filter: "blur(20px)",
                    transition: { duration: 0.4 } 
                  }}
                  transition={{ 
                    duration: 1.2, 
                    ease: "easeInOut",
                    scale: { repeat: Infinity, duration: 1.5 } 
                  }}
                  className="w-32 h-32 md:w-40 md:h-40 relative flex items-center justify-center drop-shadow-[0_0_15px_rgba(211,28,45,0.6)]"
                >
                  <img 
                    src="/images/logo-icon.png" 
                    alt="Minaer Icon" 
                    className="w-full h-full object-contain"
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="full"
                  initial={{ scale: 1.5, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    type: "spring", 
                    stiffness: 100, 
                    damping: 20 
                  }}
                  className="w-64 md:w-80 h-24 relative flex items-center justify-center drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                >
                  <img 
                    src="/images/logo1.png" 
                    alt="Minaer Logo Completo" 
                    className="w-full h-full object-contain bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10"
                  />
                  
                  {/* Destello final estilo futurista sobre el logo final */}
                  <motion.div
                    initial={{ x: "-100%", opacity: 0 }}
                    animate={{ x: "200%", opacity: [0, 1, 0] }}
                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                    className="absolute inset-0 w-1/4 bg-white/30 skew-x-[-20deg] blur-[2px]"
                  />
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Barra de progreso de carga estilo cyberpunk */}
            <motion.div
               animate={{ opacity: step === "icon" ? 1 : 0 }}
               className="mt-12 w-48 h-1 bg-gray-900 rounded-full overflow-hidden relative"
            >
               <motion.div 
                 initial={{ width: "0%" }}
                 animate={{ width: "100%" }}
                 transition={{ duration: 1.5, ease: "easeInOut" }}
                 className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-600 to-red-400 shadow-[0_0_10px_rgba(220,38,38,0.8)]"
               />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
