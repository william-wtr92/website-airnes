/** @type {import('tailwindcss').Config} */
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
      primary: "#709861",
      lightGreen: "#C8DBBE",
      darkGreen: "#646E4E",
      lightBrown: "#EDE4E0",
      darkBrown: "#615043",
    },
  },
  plugins: [],
}
