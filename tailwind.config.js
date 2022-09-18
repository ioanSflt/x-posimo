const defaultTheme = require("tailwindcss/defaultTheme")

/** @type { import('tailwindcss').Config } */
module.exports = {
  content: ["./pages/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Mono", ...defaultTheme.fontFamily.sans],
        quantico: ["Quantico", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
