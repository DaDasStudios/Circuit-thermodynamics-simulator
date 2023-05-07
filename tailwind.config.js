/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Inter", 'sans-serif'],
      serif: ['serif'],
    },
    extend: {
      fontFamily: {
        math: ["Cambria Math"]
      },
      animation: {
        gradient: "gradient 15s ease infinite"
      },
      textColor: {
        paragraph: colors.gray[600]
      },
      backgroundColor: {
        opaque: "rgba(var(--color-opaque), 0.8)"
      },
      keyframes: {
        gradient: {
          "0%": {
            "background-position": "0% 50%"
          },
          "50%": {
            "background-position": "100% 50%"
          },
          "100%": {
            "background-position": "0% 50%"
          }
        }
      }
    },
  },
  plugins: [
  ],
}