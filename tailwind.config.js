/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#0a023b",
        "secondary-color": "#1369C3"
      },
    },
  },
  plugins: [],
};