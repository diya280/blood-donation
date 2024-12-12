/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/**/*.{html,js}',  
  ],
  safelist: [
    'hidden', 
    'block', 
    'z-10'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

