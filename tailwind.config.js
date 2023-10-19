/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#5272F2",
        "whitish": "#F5F5F5",
        "blackish": "#040D12",
        "grayish": "#B4B4B3",
      },
      fontFamily: {
        "logo": ["Playfair Display", "Sans Serif"],
        "text": ["Montserrat", "Sans Serif"],
        "heading": ["Poppins", "Sans Serif"],
        "link": ["Oswald", "Sans Serif"],
      }
    },
  },
  plugins: [],
}

