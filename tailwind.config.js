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
        // Deep lake green color palette (enhanced)
        lake: {
          50: '#edf7f7',
          100: '#d1eaea',
          200: '#a3d5d6',
          300: '#75bfc1',
          400: '#47a9ac',
          500: '#2a8f92',
          600: '#1f7578',
          700: '#1a5c5e',
          800: '#174344',
          900: '#142e2f',
          950: '#0a2425',
        },
        // Additional deep lake variations
        deeplake: {
          50: '#e6f5f5',
          100: '#c7e8e8',
          200: '#9ad7d8',
          300: '#68c5c7',
          400: '#3ab3b6',
          500: '#1c9a9d',
          600: '#0e7f82',
          700: '#0a6668',
          800: '#084d4e',
          900: '#063638',
          950: '#042425',
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
