/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm': '640px', // define a new screen size for mobile screens
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
