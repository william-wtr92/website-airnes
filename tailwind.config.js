/** @type {DefaultColors} */
const colors = require("tailwindcss/colors")

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: "320px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
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
      red: colors.red,
      // Custom colors
      primary: {
        DEFAULT: "#615043",
        light: "#927864",
        link: "#0EA5E9",
        linkorange: "#FF8300",
      },
    },
  },
  plugins: [],
}
