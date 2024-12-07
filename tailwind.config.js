export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ffffff',
      },
      fontFamily: {
        sans: ['SF Pro Display', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'wave-pattern': "url('/wave-pattern.svg')",
      }
    },
  },
  plugins: [],
}