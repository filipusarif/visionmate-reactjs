/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      primary: '#5B56FB',
      secondary: '#2563EB',
      'complementary': '#334155',
      'background':'#FFFFFF',
      'primary-hover':'#534FDE',
      'very-light':'#D9D9D9',
      'yellowAbout':'#FAFF00',
      'redAbout':'#D62A2A',
      'lightBlueAbout':'#2AA7D6',
      'brownAbout':'#D67D2A',
      'purpleAbout':'#9F2AD6',
      'blueAbout':'#2A5AD6',
    },
    
  },
  
  plugins: [
    require('flowbite/plugin')
  ]
}

