// tailwind.config.js
module.exports = {
  darkMode: 'class', // or 'media' (but 'class' is more flexible)
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}', // required for Next.js App Router
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
