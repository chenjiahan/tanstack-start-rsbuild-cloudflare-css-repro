# TanStack Start + Rsbuild + Cloudflare: missing dev CSS

A minimal reproduction of missing stylesheet links when TanStack Start's Rsbuild SSR bundle runs in workerd.

## Reproduce

Use Node.js 24.22+ and pnpm 11.21.0.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open http://localhost:3000. The page should have a dark blue background and a yellow heading, but is unstyled.

In another terminal:

```sh
pnpm verify
```

Expected: SSR HTML includes stylesheet links whose URLs serve CSS.

Actual: `SSR HTML is missing stylesheet links`. The imported CSS is compiled, but its link is absent from the HTML.

## Production comparison

Stop the dev server, then run:

```sh
pnpm build
pnpm preview
```

`pnpm verify` passes and the page is styled. These commands run locally and do not deploy a Worker.

## Scope

- `rsbuild-plugin-cloudflare@0.0.4`, with its default Miniflare dependency; no dependency workaround.
- Rsbuild 2.3.1, which includes the `import.meta.env` override fix.
- A single root route importing one stylesheet; no data fetching, UI library, or application-specific code.
- The lockfile pins the affected TanStack packages.

TanStack's Rsbuild dev manifest is stored on the Node build process's `globalThis`. The SSR bundle in workerd has a different global object and uses the fallback manifest, which contains no CSS. Production serializes the manifest into the bundle and is unaffected.
