import type { Config } from "tailwindcss";
// import daisyui from "daisyui";

const breakpoints = {
  mobileMax: 330, // Max width for mobile
  tabletMax: 690, // Max width for tablet
  desktopMax: 1190, // Max width for desktop
};

const config: Config = {
  mode: "jit",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/_components/**/*.{js,ts,jsx,tsx}",
    "./src/_utils/**/*.{js,ts,jsx,tsx}",
    "./src/_services/**/*.{js,ts,jsx,tsx}",
    "./src/_hooks/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        // Tailwind uses min-width by default, but here we define max-widths
        mobile: { max: `${breakpoints.mobileMax}px` }, // Up to 330px
        tablet: { max: `${breakpoints.tabletMax}px` }, // Up to 690px
        desktop: { max: `${breakpoints.desktopMax}px` }, // Up to 1190px
      },
    },
  },
  plugins: [require("daisyui")],
  // plugins: [daisyui],
};

export default config;
