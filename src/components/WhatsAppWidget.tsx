"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, ChevronRight, Shield, Construction, Trash2, Phone } from "lucide-react";

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const phoneNumber = "56964694515";

  // Comportamiento proactivo: Abre a los 10 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasOpened) {
        setIsOpen(true);
        setHasOpened(true);
      }
    }, 40000); // 40s

    return () => clearTimeout(timer);
  }, [hasOpened]);

  // Manejar el envío a WhatsApp
  const handleOptionClick = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, "_blank");
    setIsOpen(false);
  };

  const options = [
    {
      id: "seguridad",
      label: "Seguridad Privada",
      icon: Shield,
      message: "Hola, estoy interesado en recibir información sobre sus servicios de Seguridad Privada.",
    },
    {
      id: "aseo",
      label: "Aseo Industrial",
      icon: Trash2,
      message: "Hola, me gustaría más información sobre el servicio de Aseo Industrial.",
    },
    {
      id: "mantencion",
      label: "Mantención Vial",
      icon: Construction,
      message: "Hola, quiero comunicarme por el servicio de Mantención Vial/Obras Civiles.",
    },
    {
      id: "ejecutivo",
      label: "Hablar con un Ejecutivo",
      icon: Phone,
      message: "Hola, prefiero hablar directamente con un ejecutivo para una atención personalizada.",
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl w-80 overflow-hidden flex flex-col"
          >
            {/* Header del Chat */}
            <div className="bg-red-600 px-5 py-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <h3 className="font-bold leading-tight">Chat Minaer</h3>
                  <p className="text-xs text-red-100 opacity-90">Soporte en línea</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-1 rounded-full transition-colors"
                aria-label="Cerrar chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cuerpo del Chat / Burbuja */}
            <div className="p-5 bg-slate-50 dark:bg-slate-950 flex-1">
              <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-tl-sm shadow-sm border border-slate-100 dark:border-slate-700 text-sm mb-4 inline-block max-w-[90%] text-slate-800 dark:text-slate-200">
                ¡Hola! 👋 ¿En qué te podemos ayudar? Selecciona una opción para comunicarnos rápidamente por WhatsApp:
              </div>

              {/* Botones de Opciones */}
              <div className="space-y-2">
                {options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleOptionClick(opt.message)}
                    className="w-full text-left group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-red-500 hover:shadow-md dark:hover:border-red-500 rounded-xl p-3 flex items-center justify-between transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-red-500 bg-red-50 dark:bg-red-500/10 p-2 rounded-lg group-hover:scale-110 transition-transform">
                        <opt.icon size={16} />
                      </div>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                        {opt.label}
                      </span>
                    </div>
                    <ChevronRight size={16} className="text-slate-300 group-hover:text-red-500 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón Flotante Principal */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setHasOpened(true);
        }}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 z-50 focus:outline-none ${
          isOpen
            ? "bg-slate-800 text-white hover:bg-slate-700"
            : "bg-[#25D366] text-white hover:bg-[#20bd5a] animate-bounce"
        }`}
        aria-label="Toggle WhatsApp Menu"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>

      {/* Hint Tooltip */}
      <AnimatePresence>
        {!isOpen && !hasOpened && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ delay: 2, duration: 0.5 }}
            className="absolute right-20 top-3 px-3 py-2 bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-lg whitespace-nowrap"
          >
            ¿Necesitas ayuda?
            <div className="absolute top-1/2 -right-1.5 w-3 h-3 bg-slate-800 rotate-45 -translate-y-1/2" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
