/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neutralSilver': '#F5F7FA',
        'neutralDGray': '#4D4D4D',
        'brandPrimary': '#4CAF4F',
        'neutralGray': '#717171',
        'gray900': '#18191F'
      }
    },
  },
  darkMode:'class',
  plugins: [],
 
}

