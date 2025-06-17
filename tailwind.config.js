/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,jsx}',
    './src/components/**/*.{js,jsx}',
    './src/app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        prompt: ['var(--font-prompt)'],
        inter: ['var(--font-inter)'],
      },
      colors: {
        // Earth tone color palette
        earth: {
          50: '#f5f5f0',
          100: '#e6e4dc',
          200: '#d6cfc7',
          300: '#c5b9a9',
          400: '#b3a38c',
          500: '#a08e73',
          600: '#8c7a5e',
          700: '#76664c',
          800: '#5f523c',
          900: '#483e2d',
        },
        beige: {
          50: '#faf8f3',
          100: '#f5f0e6',
          200: '#ebe0cc',
          300: '#dfd0b3',
          400: '#d3c099',
          500: '#c7b080',
          600: '#b89c66',
          700: '#a68a52',
          800: '#8c7547',
          900: '#73613c',
        },
        forest: {
          50: '#f0f5f0',
          100: '#dce8dc',
          200: '#c2d6c2',
          300: '#a3c0a3',
          400: '#85aa85',
          500: '#6b946b',
          600: '#577a57',
          700: '#476347',
          800: '#3a4f3a',
          900: '#2e3c2e',
        },
      },
    },
  },
  plugins: [],
}
