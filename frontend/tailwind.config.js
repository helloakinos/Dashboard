module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height:{
        "10":"1000px"
      },
      colors:{
        'gray':"#F5F7FA",
        'greenish':"#00A896"
      }
    },
  },
  plugins: [],
}
