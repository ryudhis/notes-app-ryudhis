/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "primary-bg": "#F8EEE2",
        primary: "#d9614c",
        secondary: "#c7503b",
        tertiaty: "#a7402e",
        disabled: "#fbe8e5",
        "disabled-text": "#e99080",
        "text-primary": "#403B36",
        "text-secondary": "#595550",
      },
    },
  },
  plugins: [],
};
