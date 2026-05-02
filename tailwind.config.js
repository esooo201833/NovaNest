/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5a2d0c',      // Dark burned brown - main color
        secondary: '#eadbc8',    // Beige/cream
        accent: '#8a3b12',       // Lighter brown for accents
        light: '#f5ebe0',        // Very light beige
      },
    },
  },
  plugins: [],
}
