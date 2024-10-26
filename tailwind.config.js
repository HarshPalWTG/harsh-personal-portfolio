import { nextui } from "@nextui-org/react";

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}', // Adjust the paths according to your project structure
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [nextui()],
};