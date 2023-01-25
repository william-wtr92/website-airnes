/** @type {DefaultColors} */
const colors = require("tailwindcss/colors")

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      lg: "1024px",
    },
    extend: {},
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
    },
    colors: {
      // Importing useful default colors
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      blue: colors.blue,
      // Custom colors
      primary: {
        DEFAULT: "#615043",
        light: "#927864"
      },
    },
  },
  plugins: [],
}
