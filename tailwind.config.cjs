/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'deeppurple': '#A143F4',
      'purple':'#C890F9',
      'dark': '#0F172A',
      'gray': '#7C88A2',
      'ash' : '#F8FBFE'
    },
    fontFamily: {
      'poppins': ['Poppins', 'sans-serif'],
    },
    animation: {
      breeze: 'breeze 8s alternate-reverse infinite',
      spinner: 'spinner 2s linear infinite',
    },
    extend: {
      keyframes: {
        breeze: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(5%)' },         
        },
        spinner: {
          '0%': { transform: 'translate3d(-50%, -50%, 0) rotate(0deg)' },
          '100%': { transform: 'translate3d(-50%, -50%, 0) rotate(360deg)' },
        },        
      }
    },
  },
  plugins: [],
}
