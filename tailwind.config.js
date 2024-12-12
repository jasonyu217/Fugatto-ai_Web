/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.html"
  ],
  theme: {
    extend: {
      zIndex: {
        '20': '20',
      },
      rotate: {
        '12': '12deg',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
        'gradient-brand': 'linear-gradient(135deg, #22c55e 0%, #4ade80 50%, #22c55e 100%)',
      },
      boxShadow: {
        'glow': '0 0 15px rgba(34,197,94,0.5)',
        'inner-xl': 'inset 0 0 100px 20px rgb(0 0 0 / 0.3)',
        'ambient': '0 0 150px 50px rgb(0 0 0 / 0.3)',
        'text-glow': '0 0 10px rgba(34,197,94,0.3)',
      },
      animation: {
        'gradient-x': 'gradient-x 3s ease infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      },
    }
  },
  plugins: [],
}