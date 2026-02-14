import forms from '@tailwindcss/forms'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Orbitron', 'Exo', 'Rajdhani', 'system-ui', 'sans-serif'],
        body: ['Rajdhani', 'Exo', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#00f5ff',
          100: '#00f5ff',
          200: '#00f5ff',
          300: '#00f5ff',
          400: '#00f5ff',
          500: '#00f5ff',
          600: '#00d9e8',
          700: '#00b8d4',
          800: '#0097bb',
          900: '#0076a3',
        },
        cyberpunk: {
          'dark': '#05070A',
          'black': '#0a0e14',
          'cyan': '#00F5FF',
          'purple': '#B026FF',
          'mint': '#00FFA3',
          'amber': '#FFC857',
          'text-primary': '#E6F1FF',
          'text-secondary': '#7F8A9A',
        },
        ink: '#05070A',
        card: '#0a0e14',
        accent: '#B026FF',
      },
      boxShadow: {
        soft: '0 0 20px rgba(0, 245, 255, 0.15)',
        'glow-cyan': '0 0 30px rgba(0, 245, 255, 0.25)',
        'glow-purple': '0 0 30px rgba(176, 38, 255, 0.25)',
        'glow-mint': '0 0 30px rgba(0, 255, 163, 0.15)',
      },
      backgroundColor: {
        'slate-950': 'var(--bg-primary)',
        'slate-900': 'var(--bg-secondary)',
      },
      textColor: {
        'white': 'var(--text-primary)',
        'slate-50': 'var(--text-primary)',
        'slate-100': 'var(--text-primary)',
        'slate-200': 'var(--text-primary)',
        'slate-300': 'var(--text-secondary)',
        'slate-400': 'var(--text-secondary)',
        'slate-500': 'var(--text-tertiary)',
      },
      borderColor: {
        'white/5': 'var(--border-color)',
        'white/10': 'var(--border-subtle)',
      },
    },
  },
  plugins: [forms],
}
