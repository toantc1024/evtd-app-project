/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      boxShadow:{
        'end-inset':'inset 0 2px 4px 0 rgb(0 0 0 / 0.05),inset 0 -4px 4px -1px rgb(0 0 0 / 0.2)',
      }
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      tall: { raw: '(min-height: 768px) and (min-width: 768px)' },
    },
  },
  plugins: [],
};
