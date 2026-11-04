/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          black: '#17191c',
        },
        paper: {
          white: '#ffffff',
        },
        mist: {
          gray: '#f2f2f3',
        },
        fog: {
          white: '#fafafb',
        },
        steep: {
          slate: '#777b86',
          ash: '#979799',
          smoke: '#a3a6af',
          peach: '#fbe1d1',
          sienna: '#5d2a1a',
        },
        // Functional engineering indicators
        indicator: {
          red: '#DC2626',
          amber: '#D97706',
          green: '#059669',
          blue: '#2563EB',
        }
      },
      fontFamily: {
        serif: ['Newsreader', 'Signifier', 'GT Sectra', 'Georgia', 'ui-serif', 'serif'],
        'serif-ar': ['Amiri', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'sans-ar': ['Cairo', 'Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'IBM Plex Mono', 'Menlo', 'monospace'],
      },
      borderRadius: {
        'card': '24px',
        'artifact': '20px',
        'input': '16px',
        'pill': '9999px',
      },
      boxShadow: {
        'artifact': '0 0 0 1px rgba(4, 23, 43, 0.05), 0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
        'subtle': '0 0 0 1px rgba(0, 0, 0, 0.05), 0 4px 20px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
