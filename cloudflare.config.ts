import { defineConfig } from 'cf/config'

export default defineConfig({
  worker: {
    name: 'tanstack-rsbuild-css-repro',
    entrypoint: './src/server.ts',
    compatibilityDate: '2026-11-07',
  },
})
