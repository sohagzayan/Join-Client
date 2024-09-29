import { withUt } from 'uploadthing/tw';

module.exports = withUt({
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      screens: {
        '2xl': '1536px',
      },
    },
    extend: {
      colors: {
        /* Common Colors */
        white: 'var(--tp-common-white-rgb)',
        black: 'var(--tp-common-black-rgb)',
        black2: 'var(--tp-common-black-2-rgb)',
        black3: 'var(--tp-common-black-3-rgb)',
        black4: 'var(--tp-common-black-4-rgb)',
        black5: 'var(--tp-common-black-5-rgb)',
        black6: 'var(--tp-common-black-6-rgb)',
        black7: 'var(--tp-common-black-7-rgb)',

        /* Primary Colors */
        green: 'var(--tp-common-green-rgb)',
        green2: 'var(--tp-common-green-2-rgb)',
        orange: 'var(--tp-common-orange-rgb)',
        red: 'var(--tp-common-red-rgb)',
        purple: 'var(--tp-common-purple-rgb)',
        yellow: 'var(--tp-common-yellow-rgb)',
        yellow2: 'var(--tp-common-yellow-2-rgb)',
        pink: 'var(--tp-common-pink-rgb)',

        /* Heading and Text Colors */
        headingPrimary: 'var(--tp-heading-primary-rgb)',
        textBody: 'var(--tp-text-body-rgb)',
        text1: 'var(--tp-text-1-rgb)',
        text2: 'var(--tp-text-2-rgb)',
        text3: 'var(--tp-text-3-rgb)',
        text4: 'var(--tp-text-4-rgb)',
        text5: 'var(--tp-text-5-rgb)',
        text6: 'var(--tp-text-6-rgb)',
        text7: 'var(--tp-text-7-rgb)',
        text8: 'var(--tp-text-8-rgb)',
        text9: 'var(--tp-text-9-rgb)',
        text10: 'var(--tp-text-10-rgb)',
        text11: 'var(--tp-text-11-rgb)',
        text12: 'var(--tp-text-12-rgb)',
        text13: 'var(--tp-text-13-rgb)',
        text14: 'var(--tp-text-14-rgb)',

        /* Gray Shades */
        gray1: 'var(--tp-grey-1-rgb)',
        gray2: 'var(--tp-grey-2-rgb)',

        /* Theme Colors */
        theme1: 'var(--tp-theme-1-rgb)',
        theme2: 'var(--tp-theme-2-rgb)',
        themeDark: 'var(--tp-theme-dark-rgb)',
        themeDark2: 'var(--tp-theme-dark-2-rgb)',
        themeWhite: 'var(--tp-theme-white-rgb)',

        /* Border Colors */
        border1: 'var(--tp-border-1-rgb)',
        border2: 'var(--tp-border-2-rgb)',
        border3: 'var(--tp-border-3-rgb)',
        border4: 'var(--tp-border-4-rgb)',

        /* Light Theme (Optional Override) */
        light: {
          bodyColor: 'var(--bs-body-color-rgb)',
          bodyBg: 'var(--bs-body-bg-rgb)',
          primary: 'var(--bs-primary-rgb)',
          secondary: 'var(--bs-secondary-rgb)',
          success: 'var(--bs-success-rgb)',
          danger: 'var(--bs-danger-rgb)',
          warning: 'var(--bs-warning-rgb)',
          light: 'var(--bs-light-rgb)',
          dark: 'var(--bs-dark-rgb)',

          /* Typography Colors */
          themeDark: 'var(--tp-theme-dark-rgb)',
          commonBlack: 'var(--tp-common-black-rgb)',
          textBody: 'var(--tp-text-body-rgb)',
        },
      },
      backgroundColor: {
        /* Background Colors */

        customWhiteTransparent: 'rgba(255, 255, 255, 0.14)',
        white: 'var(--tp-common-white-rgb)',
        black: 'var(--tp-common-black-rgb)',
        black2: 'var(--tp-common-black-2-rgb)',
        black3: 'var(--tp-common-black-3-rgb)',
        black4: 'var(--tp-common-black-4-rgb)',
        black5: 'var(--tp-common-black-5-rgb)',
        black6: 'var(--tp-common-black-6-rgb)',
        black7: 'var(--tp-common-black-7-rgb)',

        green: 'var(--tp-common-green-rgb)',
        green2: 'var(--tp-common-green-2-rgb)',
        orange: 'var(--tp-common-orange-rgb)',
        red: 'var(--tp-common-red-rgb)',
        purple: 'var(--tp-common-purple-rgb)',
        yellow: 'var(--tp-common-yellow-rgb)',
        yellow2: 'var(--tp-common-yellow-2-rgb)',
        pink: 'var(--tp-common-pink-rgb)',

        theme1: 'var(--tp-theme-1-rgb)',
        theme2: 'var(--tp-theme-2-rgb)',
        themeDark: 'var(--tp-theme-dark-rgb)',
        themeDark2: 'var(--tp-theme-dark-2-rgb)',
        themeWhite: 'var(--tp-theme-white-rgb)',

        /* Light Theme Background Colors */
        light: {
          bodyBg: 'var(--bs-body-bg-rgb)',
          primary: 'var(--bs-primary-rgb)',
          secondary: 'var(--bs-secondary-rgb)',
          success: 'var(--bs-success-rgb)',
          danger: 'var(--bs-danger-rgb)',
          warning: 'var(--bs-warning-rgb)',
          light: 'var(--bs-light-rgb)',
          dark: 'var(--bs-dark-rgb)',
        },
      },
      backgroundImage: {
        customGradient:
          'linear-gradient(-180deg, #61C6FF 1.9%, #283DFC 97.74%)',
      },
      // fontFamily: {
      //   body: ['"Be Vietnam Pro"', "sans-serif"],
      //   heading: ['"Be Vietnam Pro"', "sans-serif"],
      //   fontawesome: ["Font Awesome 6 Pro"],
      // },
      fontWeight: {
        100: '100',
        200: '200',
        300: '300',
        400: '400',
        500: '500',
        600: '600',
        700: '700',
        800: '800',
        900: '900',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
});
