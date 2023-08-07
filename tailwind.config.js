/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}","./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        mainYellow: "#F0D12D",
        charcoal: "#36454F",
        textWhite: "#F5F5F0",
        lightGray: "#8E8E8E",
        bgGray: "#555555",
        bgGrayTransparent50: "rgba(29, 29, 29, 0.5)",
        bgGrayTransparent80: "rgba(29, 29, 29, 0.8)",
      },
      fontFamily:{
        sans: 'Open Sans',
        montserrat: 'Montserrat',
      }
    },
  },
  plugins: [],
}

