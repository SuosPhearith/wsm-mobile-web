/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#32B8E2', // Example primary color (blue-600)
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}
