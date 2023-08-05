/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {},
    fontFamily: {
      fredoka: ['Fredoka'],
    },
    screens: {
      tall: { raw: '(min-height: 768px) and (min-width: 768px)' },
    },
  },
  plugins: [],
};
