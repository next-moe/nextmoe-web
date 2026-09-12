import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    // Prettier writes `<img />` and this rule wants `<img>`, so leaving it on
    // means eslint --fix and format-on-save undo each other forever.
    rules: { 'vue/html-self-closing': 'off' }
  },
  {
    files: ['app/components/legal/Document.vue'],
    // The legal prose is authored in app/content/*.ts and prerendered; no user
    // input reaches these strings, and their inline <a>/<strong> is the point.
    rules: { 'vue/no-v-html': 'off' }
  }
)
