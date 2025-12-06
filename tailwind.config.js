/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Fondos
        'bg-main': '#FFFFFF',           // Fondo principal BLANCO
        'bg-sidebar': '#0d2137',        // Sidebar azul oscuro
        'bg-hover': '#f7f9fc',          // Hover gris muy claro
        'bg-secondary': '#f5f7fa',      // Fondos secundarios

        // Acentos
        'accent-cyan': '#2d7a8e',       // Cyan principal
        'accent-teal': '#3a9299',       // Teal
        'highlight': '#4db8a3',         // Verde brillante
        'accent-blue': '#1a4d6f',       // Azul oscuro

        // Textos
        'text-primary': '#1a1a1a',      // Negro principal
        'text-secondary': '#6b7280',    // Gris medio
        'text-tertiary': '#9ca3af',     // Gris claro

        // Bordes
        'border-light': '#e5e7eb',      // Borde gris claro
        'border-accent': '#2d7a8e',     // Borde cyan
      },
      backgroundImage: {
        'gradient-main': 'linear-gradient(135deg, #2d7a8e 0%, #3a9299 50%, #4db8a3 100%)',
        'gradient-card': 'linear-gradient(145deg, #2d7a8e, #4db8a3)',
        'gradient-button': 'linear-gradient(to right, #2d7a8e, #4db8a3)',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
