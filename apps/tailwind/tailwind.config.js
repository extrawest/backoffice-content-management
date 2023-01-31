const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    "controlHeight": 48,
    spacing: {
      1: "0.5rem",
      2: "1rem",
      3: "1.5rem",
      4: "2rem",
      5: "2.5rem",
      6: "3rem",
      7: "3.5rem",
      8: "4rem",
      9: "4.5rem",
      10: "5rem"
    },
    extend: {
      borderRadius: {
        1: "0.5rem",
        2: "1rem",
        3: "1.5rem",
        4: "2rem",
        5: "2.5rem",
        6: "3rem",
        7: "3.5rem",
        8: "4rem"
      },
      fontSize: {
        '10px': '0.625rem',
        '11px': '0.6875rem',
        '12px': '0.75rem',
        '13px': '0.8125rem',
        '14px': '0.875rem',
        '15px': '0.9375rem',
        '16px': '1rem',
        '17px': '1.0625rem',
        '18px': '1.125rem',
        '19px': '1.1875rem',
        '20px': '1.25rem',
        '22px': '1.375rem',
        '24px': '1.5rem',
        '26px': '1.625rem',
        '28px': '1.75rem',
        '30px': '1.875rem',
      },
      maxWidth: {
        "table": "75rem"
      },
      "minWidth": {
        modal: "35rem"
      },
      width: {
        30: "1.875rem",
        150: "9.375rem",
        300: "18.75rem",
        50: "3.125rem",
        "form": "35rem",
        "menu": "28.875rem",
        "img": "12.5rem",
        "auth": "31.25rem"
      },
      height: {
        30: "1.875rem",
        150: "9.375rem",
        "img": "12.5rem",
        50: "3.125rem",
      },
      colors: {
        primary: {
          main: "#1D2992",
          light: "#237DBF",
        },
        gray: {
          50: "#F9F8F8",
          100: "#F3F3F3",
          200: "#E6E6E6",
          300: "#D1D1D1",
          400: "#B9B9B9",
          500: "#A3A3A3",
          600: "#828282",
          700: "#4F4F4F",
          800: "#333333"
        },
        textColor: "#000000",
        "yellow-6": "#FFD13D",
        "green-4": "#27AE60",
        "colorInfo": "#A3A3A3",
        "colorBorder": "#bdbdbd"
      }
    },
  },
  plugins: [],
};
