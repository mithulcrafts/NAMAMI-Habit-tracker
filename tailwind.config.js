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
        display: ['"DM Sans"', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        ink: '#0b1220',
        card: '#0f172a',
        accent: '#c084fc',
      },
      boxShadow: {
        soft: '0 10px 40px rgba(15, 23, 42, 0.25)',
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
