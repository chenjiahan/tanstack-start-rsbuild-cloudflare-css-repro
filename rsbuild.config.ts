import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { tanstackStart } from '@tanstack/react-start/plugin/rsbuild'
import { cloudflare } from 'rsbuild-plugin-cloudflare'

export default defineConfig({
  plugins: [
    pluginReact(),
    cloudflare({ rsbuildEnvironment: { name: 'ssr' } }),
    tanstackStart(),
  ],
  server: { port: 3000 },
})
