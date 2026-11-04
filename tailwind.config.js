/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#04060E',
          surface: '#0B0F22',
          card: '#0D132D',
          border: '#1E2548',
        },
        brand: {
          violet: '#8E42FE',
          purple: '#6838F8',
          cobalt: '#3361FC',
          cyan: '#38BDF8',
        },
        telemetry: {
          emerald: '#10B981',
          cyan: '#06B6D4',
          amber: '#F59E0B',
          rose: '#F43F5E',
        },
        silver: {
          100: '#FFFFFF',
          200: '#F1F5F9',
          300: '#E2E8F0',
          400: '#94A3B8',
          500: '#64748B',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'IBM Plex Mono', 'Menlo', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'brand-glow': '0 0 35px rgba(123, 60, 252, 0.4)',
        'stage-glow': '0 0 80px rgba(123, 60, 252, 0.22)',
      }
    },
  },
  plugins: [],
}
