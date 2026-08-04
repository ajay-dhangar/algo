const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
    container: false,
  },
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./src/**/*.{jsx,tsx,html}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', ...fontFamily.sans],
        jakarta: ['"Plus Jakarta Sans"', ...fontFamily.sans],
        mono: ['"Fira Code"', ...fontFamily.mono],
      },
      borderRadius: {
        sm: "4px",
      },
      screens: {
        sm: "0px",
        lg: "997px",
      },
      colors: {
        primary: {
          DEFAULT: "var(--ifm-color-primary)",
          dark: "var(--ifm-color-primary-dark)",
          darker: "var(--ifm-color-primary-darker)",
          darkest: "var(--ifm-color-primary-darkest)",
          light: "var(--ifm-color-primary-light)",
          lighter: "var(--ifm-color-primary-lighter)",
          lightest: "var(--ifm-color-primary-lightest)",
        }
      },
    },
  },
  plugins: [],
};