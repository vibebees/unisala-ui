/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundColor: {
        comment: "var(--bg-comment)",
      },
      borderColor: {
        primary: "var(--border-primary)",
      },
      fontSize: {
        smm: "0.63rem",
      },
    },
  },
  plugins: [],
};
