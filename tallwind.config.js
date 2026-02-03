/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./app/components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "kipclin-blue": "#055DA7",
        "kipclin-lightblue": "#4FA3D1",
        "kipclin-gray": "#6B7280",
        "kipclin-bg": "#F9FAFB",
      },
    },
  },
  plugins: [],
};