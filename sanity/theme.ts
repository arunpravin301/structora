import { buildLegacyTheme } from 'sanity'

const props = {
  '--my-white': '#FFFFFF',
  '--my-black': '#0F0F10',
  '--brand-color': '#D60000',
  '--my-red': '#DC2626',
  '--my-yellow': '#EAB308',
  '--my-green': '#16A34A',
}

export const myTheme = buildLegacyTheme({
  /* Base theme colors — Structora White, Black & Crimson Red */
  '--black': props['--my-black'],
  '--white': props['--my-white'],

  '--gray': '#52525B',
  '--gray-base': '#52525B',

  '--component-bg': props['--my-white'],
  '--component-text-color': props['--my-black'],

  /* Brand */
  '--brand-primary': props['--brand-color'],

  // Default button
  '--default-button-color': '#52525B',
  '--default-button-primary-color': props['--brand-color'],
  '--default-button-success-color': props['--my-green'],
  '--default-button-warning-color': props['--my-yellow'],
  '--default-button-danger-color': props['--my-red'],

  /* State */
  '--state-info-color': props['--brand-color'],
  '--state-success-color': props['--my-green'],
  '--state-warning-color': props['--my-yellow'],
  '--state-danger-color': props['--my-red'],

  /* Navbar */
  '--main-navigation-color': props['--my-black'],
  '--main-navigation-color--inverted': props['--my-white'],

  '--focus-color': props['--brand-color'],
})
