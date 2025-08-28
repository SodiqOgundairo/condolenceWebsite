/** @type {import('tailwindcss').Config} */
import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm, thoughtful palette
        'primary': '#8B5E34',       // deep brown
        'secondary': '#D6CCC2',     // soft warm gray/cream
        'accent': '#C17F59',        // lighter brown accent
        'background': '#FAF7F2',    // warm off-white
        'surface': '#FFFDF9',       // card surface
        'border': '#E3DED6',        // subtle border
        'text-primary': '#2B2A28',  // near-black warm
        'text-secondary': '#6F665E',
      },
      fontFamily: {
        sans: ['Lato', ...fontFamily.sans],
        display: ['Cormorant Garamond', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
}
