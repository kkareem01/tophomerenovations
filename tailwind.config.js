/** Tailwind config — mirrors the previous inline CDN config so the
 *  precompiled stylesheet (assets/tw.css) renders every page identically.
 *  Build: npx tailwindcss@3 -c tailwind.config.js -i assets/_tw-input.css -o assets/tw.css --minify
 */
module.exports = {
  content: [
    './index.html',
    './about/**/*.html',
    './contact/**/*.html',
    './connect/**/*.html',
    './locations/**/*.html',
    './services/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0A0E18',
        'bg-elev': '#0E1422',
        surface: '#131B2D',
        'surface-2': '#1A2438',
        ink: '#F4F7FB',
        'ink-soft': '#A9B4C6',
        'ink-mute': '#6E7B92',
        paper: '#EEF3F9',
        'paper-2': '#FFFFFF',
        primary: { DEFAULT: '#2A5DA8', bright: '#4A86DC', deep: '#173B6E' },
        accent: { DEFAULT: '#F96302', bright: '#FF8534', deep: '#C24A00' },
        whatsapp: { DEFAULT: '#25D366', deep: '#128C7E' },
      },
      fontFamily: {
        display: ['Sora, system-ui, sans-serif'],
        body: ['Inter, system-ui, sans-serif'],
      },
      spacing: { '4.5': '1.125rem' },
    },
  },
};
