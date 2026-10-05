/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        spiderRed: '#E3242B',
        spiderBlue: '#1F4FBF',
        spiderNavy: '#0B1B4D',
        spiderYellow: '#F5B82E',
      },
      fontFamily: {
        bangers: ['Bangers', 'cursive'],
        bebas: ['Bebas Neue', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'halftone': 'url("/assets/generate-ai/halftone.png")', // fallback if no ai image
      }
    },
  },
  plugins: [],
}
