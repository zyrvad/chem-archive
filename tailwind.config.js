/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand': {
          'base' : '#0C1446',
          'accent' : '#87ACA3',
          'primary' : '#175873',
          'secondary' : '#2B7C85'
        }
      }
    },
    fontFamily: {
      body: ['Manrope']
    }
  },
  plugins: [],
}