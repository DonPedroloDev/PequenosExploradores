// Tailwind theme extension for Pequeños Exploradores.
// Usage (tailwind.config.js):  const tokens = require('./tailwind.tokens'); module.exports = { theme: { extend: tokens }, ... }
// Tailwind v4: copy these values into an @theme block instead.
module.exports = {
  colors: {
    crema: '#FFF8EE',      // page background
    tinta: '#0F2E22',      // all text + dark outlines
    sol: { DEFAULT: '#FFCD33', hover: '#FFC21A', rayo: '#FCCB2B' },
    hoja: { DEFAULT: '#1F6E44', texto: '#246F47', form: '#1A7A4A', suave: '#E2F2D7', suave2: '#DCF0D3', form_bg: '#E8F5E3', muted: '#9CC5A8' },
    arena: { DEFAULT: '#C9B262', suave: '#FCF3D9' },
    coral: { DEFAULT: '#DA7A5E', suave: '#FEDFCF', suave2: '#FEE4D8', fuerte: '#F07A5C' },
    agua: { DEFAULT: '#4892C4', suave: '#DDEBF6', boton: '#CFE4F3' },
    campo: { DEFAULT: '#FFFCF7', borde: '#6B9B82', placeholder: '#8F9A95' },
    error: { DEFAULT: '#B8513A', bg: '#FFF4EF' },
  },
  fontFamily: {
    display: ['"Lilita One"', 'sans-serif'],   // titles, nav, labels, buttons — ALWAYS uppercase
    body: ['"Playpen Sans"', 'sans-serif'],    // body copy, inputs, notes
  },
  fontSize: {
    'display-xl': ['84px', '80px'],
    'display-lg': ['82px', '80px'],
    'h2-game': ['48px', '52px'],
    'btn-hero': ['38px', '44px'],
    'card-title': ['34px', '36px'],
    'logo': ['35px', '32px'],
    'nav': ['22px', '48px'],
    'label': ['23px', '24px'],
    'lead': ['30px', '37px'],
    'body-lg': ['22px', '28px'],
    'input': ['20px', '26px'],
    // mobile
    'm-display': ['50px', '48px'],
    'm-h1': ['46px', '44px'],
    'm-btn': ['30px', '36px'],
    'm-lead': ['19px', '27px'],
    'm-body': ['18px', '25px'],
    'm-logo': ['20px', '19px'],
  },
  borderRadius: { card: '16px', 'card-lg': '24px', game: '28px', field: '12px' },
  borderWidth: { 3: '3px', 2.5: '2.5px' },
  boxShadow: {
    frame: '0 1px 3px rgba(0,0,0,.08), 0 12px 40px rgba(60,50,20,.10)',
    focus: '0 0 0 4px rgba(255,205,51,.55)',
    'drop-target': '0 0 0 6px rgba(255,205,51,.45)',
    'quiz-correct': '0 0 0 5px rgba(31,110,68,.18)',
  },
  maxWidth: { page: '1440px' },
};
