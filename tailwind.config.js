/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        metaBlack: '#1F2022',
      },
      animation: { popUp: 'popUp 0.3s' },
      keyframes: {
        popUp: {
          '0%': {
            transform: 'translateY(25%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
            opacity: 0,
          },
          '50%': {
            transform: 'translateY(20%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '100%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
            opacity: 1,
          },
        },
      },
    },
  },
  plugins: [],
};
