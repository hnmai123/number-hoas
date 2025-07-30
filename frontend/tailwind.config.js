// tailwind.config.js
module.exports = {
  darkMode: 'class', // or 'media' (but 'class' is more flexible)
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // required for Next.js App Router
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
