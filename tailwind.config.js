/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          orange: "#FF6B35",
          "orange-light": "#FF8C69",
          "orange-dark": "#E55A2B",
        },
        secondary: {
          black: "#0D1117",
          "black-light": "#161B22",
          "black-lighter": "#21262D",
        },
        accent: {
          white: "#FFFFFF",
          gray: "#8B949E",
          "gray-light": "#F0F6FC",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "bounce-slow": "bounce 2s infinite",
        "pulse-slow": "pulse 3s infinite",
        "spin-slow": "spin 3s linear infinite",
      },
      backgroundImage: {
        "gradient-orange": "linear-gradient(135deg, #FF6B35 0%, #FF8C69 100%)",
        "gradient-dark": "linear-gradient(135deg, #0D1117 0%, #161B22 100%)",
      },
    },
  },
  plugins: [],
};
