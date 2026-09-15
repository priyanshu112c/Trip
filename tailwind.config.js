/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0F0F0E',
        charcoal: '#1A1A18',
        stone: '#8A8580',
        sand: '#F4F1EC',
        parchment: '#FDFCF8',
        brass: '#C2A27A',
        moss: '#2D332E',
      },
      fontFamily: {
        display: ['Cormorant Garamond','serif'],
        sans: ['Inter','system-ui','sans-serif'],
        mono: ['IBM Plex Mono','monospace'],
      },
      letterSpacing: {
        widest2: '0.3em',
      }
    }
  },
  plugins: []
}
