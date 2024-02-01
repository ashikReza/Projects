/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "pomodoro-bg": "#fc3030b5",
        "shortBreak-bg": "#1C92FFB0",
        "longBreak-bg": "#8FA6AC",
      },
    },
  },
  plugins: [],
};
