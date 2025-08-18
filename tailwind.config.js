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
        'primary': '#3B82F6',
        'secondary': '#F3F4F6',
        'accent': '#F59E0B',
        'background': '#FFFFFF',
        'surface': '#F9FAFB',
        'text-primary': '#1F2937',
        'text-secondary': '#6B7280',
      },
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
        display: ['Poppins', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
}
