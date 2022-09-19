/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Caveat: ["Caveat", "cursive"],
        HindMadurai: ["Hind Madurai", "sans-serif"],
        MPLUSRounded: ["M PLUS Rounded 1c", "sans-serif"],
        Bangers: ["Bangers", "cursive"],
        SmoochSans: ["Smooch Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
