/** @type {import('tailwindcss').Config} */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  // hover: utilities only apply on devices with a real pointer, so taps never leave sticky hover states
  future: { hoverOnlyWhenSupported: true },
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter Tight"', 'system-ui', 'sans-serif'],
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
      },
      colors: {
        canvas: token('canvas'),
        surface: token('surface'),
        fg: token('fg'),
        muted: token('muted'),
        accent: token('accent'),
      },
      fontSize: {
        'display-xl': ['clamp(3.75rem, 12.5vw, 12rem)', { lineHeight: '0.88', letterSpacing: '-0.035em' }],
        'display-lg': ['clamp(2.75rem, 7vw, 6.5rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(2rem, 4.2vw, 3.75rem)', { lineHeight: '1', letterSpacing: '-0.025em' }],
        'display-sm': ['clamp(1.5rem, 2.4vw, 2.1rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
      },
      animation: {
        marquee: 'marquee 60s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-quint': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
