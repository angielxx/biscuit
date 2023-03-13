/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {},
    extend: {
      colors: {
        black: '#202124',
        white: '#F7F8F8',

        // Light Theme Color
        // grey
        grey10: '#ECECEC',
        grey20: '#DDDDDD',
        grey30: '#C3C5C6',
        grey40: '#9DA3AA',
        grey50: '#7F878F',
        grey60: '#626971',
        grey70: '#484E55',
        grey80: '#32373D',
        grey90: '#252B30',
        // bg
        evalutated: '#ECECEC',
        // main
        primary: '#3FE5EF',
        'primary-var': '#6DF5F1',
        secondary: '#34E87C',
        'secondary-var': '#75EEA5',
        // sub color
        danger: '#FF7B5E',
        'danger-var': '#FFA693',
        // text
        sub: '#9DA3AA',

        // Dark Theme Color
        dark: {
          // grey
          grey10: '#252B30',
          grey20: '#32373D',
          grey30: '#484E55',
          grey40: '#636971',
          grey50: '#7F878F',
          grey60: '#9DA3AA',
          grey70: '#C3C5C7',
          grey80: '#DDDDDD',
          grey90: '#ECECEC',
          // bg
          evalutated: '#252B30',
          // main
          primary: '#3FE5EF',
          'primary-var': '#2FB0CF',
          secondary: '#34E87C',
          'secondary-var': '#1AA76E',
          // sub
          danger: '#FF7B5E',
          'danger-var': '#EC6447',
          // text
          sub: '#636971',
        },
      },
      spacing: {},
    },
  },
  variants: {
    extend: {
      backgroundColor: ['dark'],
      borderColor: ['dark'],
      textColor: ['dark'],
    },
  },
  plugins: [],
};
