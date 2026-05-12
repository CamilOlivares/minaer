/**
 * postcss.config.mjs
 * ==================
 * Configuración de PostCSS para procesar los estilos del proyecto.
 *
 * Plugins activos:
 * - tailwindcss: Motor de clases utilitarias (Tailwind CSS v3).
 * - autoprefixer: Agrega prefijos de navegador automáticamente
 *   (-webkit-, -moz-, etc.) para máxima compatibilidad.
 */

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
