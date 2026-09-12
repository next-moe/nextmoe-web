import { readFileSync } from 'node:fs'

// `nuxt generate` rewrites .nuxt mid-run, and a live `nuxt dev` reads its virtual
// modules (`#build/...`) straight out of that directory. Running the two together
// left the dev server serving a half-production app whose KunUI plugin never
// provided `iconComponent`: every icon hydrated into an empty comment node while
// the production build was perfect, which cost an afternoon to track down.
// Nuxt writes this lock for the dev CLI's own "already running" check; reuse it.
const LOCK = '.nuxt/nuxt.lock'

const isAlive = (pid) => {
  try {
    process.kill(pid, 0)
    return true
  } catch (error) {
    return error.code === 'EPERM'
  }
}

let lock
try {
  lock = JSON.parse(readFileSync(LOCK, 'utf8'))
} catch {
  process.exit(0)
}

if (lock.command === 'dev' && Number.isInteger(lock.pid) && isAlive(lock.pid)) {
  console.error(
    `\n✗ a \`nuxt dev\` server (pid ${lock.pid}) is using .nuxt\n\n` +
      '  Building now would overwrite the files that dev server is serving and\n' +
      '  break it in ways that look like application bugs — missing icons, most\n' +
      `  visibly. Stop it first (kill ${lock.pid}), then run this again.\n`
  )
  process.exit(1)
}
