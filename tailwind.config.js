/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#fec201",
        secondary: "#034460",
      },
      fontFamily :{
        rancho: "'Epilogue', sans-serif"
      },
      clipPath: {
        'custom': 'polygon(0 0, 100% 0, 100% 100%, 36% 100%)',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

