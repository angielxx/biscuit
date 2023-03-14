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
        evaluated: '#ECECEC',
        // main
        primary: '#3FE5EF',
        'primary-var': '#6DF5F1',
        secondary: '#34E87C',
        'secondary-var': '#75EEA5',
        // sub color
        danger: '#FF7B5E',
        'danger-var': '#FFA693',
        // text
        subColor: '#9DA3AA',

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
          evaluated: '#252B30',
          // main
          primary: '#3FE5EF',
          'primary-var': '#2FB0CF',
          secondary: '#34E87C',
          'secondary-var': '#1AA76E',
          // sub
          danger: '#FF7B5E',
          'danger-var': '#EC6447',
          // text
          subColor: '#636971',
        },
      },
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      },
      fontSize: {
        // headings
        h1: ['32px', { fontWeight: '800' }],
        h2: ['24px', { fontWeight: '800' }],
        h3: ['20px', { fontWeight: '800' }],
        h4: ['16px', { fontWeight: '800' }],
        h5: ['14px', { fontWeight: '800' }],
        h6: ['12px', { fontWeight: '800' }],
        // content text
        main: ['16px', { fontWeight: '400' }],
        'main-bold': ['16px', { fontWeight: '500' }],
        sub: ['14px', { fontWeight: '400' }],
        'sub-bold': ['14px', { fontWeight: '500' }],
        tiny: ['12px', { fontWeight: '200' }],
        'tiny-bold': ['12px', { fontWeight: '500' }],
      },
      spacing: {
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        7: '28px',
        8: '32px',
        9: '36px',
        10: '40px',
        11: '44px',
        12: '48px',
        13: '52px',
        14: '56px',
        15: '60px',
        16: '64px',
        17: '68px',
        18: '72px',
        19: '76px',
        20: '80px',
      },
      borderRadius: {
        0: '0px',
        2: '2px',
        4: '4px',
        8: '8px',
        10: '10px',
        12: '12px',
        14: '14px',
        16: '16px',
        18: '18px',
        20: '20px',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['dark'],
      borderColor: ['dark'],
      textColor: ['dark'],
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};
