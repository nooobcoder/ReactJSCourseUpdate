module.exports = {
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        ember: ['Amazon Ember'],
        'ember-italic': ['Amazon Ember Italic']
      },
      colors: {
        amazon_blue: {
          light: '#232F3E',
          DEFAULT: '#131921'
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('@tailwindcss/line-clamp')]
};
