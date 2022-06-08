const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: ['./index.html','./**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
