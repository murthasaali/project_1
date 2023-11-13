/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],  theme: {
    extend: {
      colors:{
        'shark':'#2A2F33',
        'nomad':'#BBB6A5',
        'mantle':'#8c9491',
        'manatee':'#9CB4AC',
        'hampton':'#E6D5A9',
        'edvard':'#9CB4AC'
      }
    },
  },
  plugins: [],
}

