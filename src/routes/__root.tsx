import { createRootRoute, HeadContent, Scripts } from '@tanstack/react-router'
import '../styles.css'

export const Route = createRootRoute({
  component: () => (
    <html>
      <head><HeadContent /></head>
      <body>
        <h1>SSR CSS reproduction</h1>
        <p>This page should have a dark blue background and a yellow heading.</p>
        <Scripts />
      </body>
    </html>
  ),
})
