/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gray': {
          900: '#111827',
        }
      },
      backdropBlur: {
        md: '12px'
      }
    },
  },
  plugins: [],
}