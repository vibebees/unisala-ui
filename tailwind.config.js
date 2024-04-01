/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx, html}"],
  theme: {
    extend: {
      backgroundColor: {
        comment: "var(--bg-comment)"
      },
      borderColor: {
        primary: "var(--border-primary)"
      }
    }
  },
  plugins: []
}
