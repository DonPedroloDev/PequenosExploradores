/** @type {import('tailwindcss').Config} */
// Los tokens viven en el handoff de diseño; se cargan tal cual en theme.extend.
const tokens = require('./design_handoff_pequenos_exploradores/tailwind.tokens.js');

// Escala "u": 1 u = 1px a 1440 de ancho y se reduce proporcionalmente entre 1200 y 1440
// (ver --u en src/index.css). Permite escribir las medidas del diseño tal cual: lg:w-u280.
const u = {};
for (let n = 0; n <= 1440; n++) u[`u${n}`] = `calc(${n} * var(--u))`;

module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      ...tokens,
      screens: { md: '768px', lg: '1200px', xl: '1440px' },
      spacing: u,
      fontSize: { ...tokens.fontSize, ...u },
      lineHeight: u,
      opacity: { 35: '.35', 55: '.55' },
      keyframes: {
        pulso: { from: { transform: 'scale(1)' }, to: { transform: 'scale(1.08)' } },
        shake: {
          '0%,100%': { transform: 'translateX(0) rotate(-4deg)' },
          '20%': { transform: 'translateX(-12px) rotate(-6deg)' },
          '40%': { transform: 'translateX(12px) rotate(-2deg)' },
          '60%': { transform: 'translateX(-8px) rotate(-6deg)' },
          '80%': { transform: 'translateX(8px) rotate(-3deg)' },
        },
        crece: {
          '0%': { transform: 'scale(.9)' },
          '60%': { transform: 'scale(1.08)' },
          '100%': { transform: 'scale(1)' },
        },
        aparece: { from: { opacity: '0', transform: 'translateY(8px)' }, to: { opacity: '1', transform: 'none' } },
      },
      animation: {
        pulso: 'pulso 1.6s ease-in-out infinite alternate',
        shake: 'shake .5s ease-in-out',
        crece: 'crece .6s cubic-bezier(.34,1.56,.64,1)',
        aparece: 'aparece .25s ease-out',
      },
    },
  },
  plugins: [],
};
