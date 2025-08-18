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
        'background': '#F8F7F4',
        'surface': '#FFFFFF',
        'primary': '#6D8B74',
        'secondary': '#A2B29F',
        'text-primary': '#3C403D',
        'text-secondary': '#5A5A5A',
        'accent': '#E5E5E5',
      },
      fontFamily: {
        sans: ['Lato', ...fontFamily.sans],
        display: ['Cormorant Garamond', ...fontFamily.serif],
      },
    },
  },
  plugins: [],
}
