/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff9e6',
          100: '#fff3cc',
          200: '#ffe090', // Our main primary color
          300: '#ffcd66',
          400: '#ffba3d',
          500: '#ffa714',
          600: '#ff940a',
          700: '#ff8100',
          800: '#cc6700',
          900: '#994d00'
        }
      }
    },
  },
  plugins: [],
};