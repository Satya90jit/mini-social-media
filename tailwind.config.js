/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        '8xl': '1920px',
        'laptop-lg': { max: '1600px' },
        'laptop-md': { max: '1440px' },
        'laptop-sm': { max: '1300px' },
        tablet: { max: '1050px' },
        'tablet-potrait': { max: '834px' },
        'medium-device': { max: '768px' },
        mobile: { max: '640px' },
        'mobile-sm': { max: '375px' },
        'laptop-big': { min: '1438px' },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
