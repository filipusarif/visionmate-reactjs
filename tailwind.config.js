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
        lg: '2rem',
        xl: '2rem',
        '2xl': '4rem',
      },
    },
    fontFamily: {
      'Roboto' : ['Roboto', 'sans-serif'],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      primary: '#5B56FB',
      secondary: '#196EF3',
      'complementary': '#334155',
      'background':'#FFFFFF',
      'primary-hover':'#534FDE',
      'non-active':'#475569',
      'dark':'#0F172A',
      'danger':'#EF4444',
      'dark-white':'#F5F5F5',
      'brownAbout':'#D67D2A',
      'purpleAbout':'#9F2AD6',
      'blueAbout':'#2A5AD6',
    },
    
  },
  
  plugins: [
    require('flowbite/plugin')
  ]
}

