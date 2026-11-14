import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'
import { createHash } from 'node:crypto'
import type { Plugin } from 'vite'

/** Solo en el build: GitHub Pages no deja configurar headers, así que la política de seguridad va como <meta>.
 *  Calcula el hash de cada script en línea (el del tema) para no tener que permitir 'unsafe-inline'.
 *  En desarrollo no se agrega: Vite inyecta scripts en línea para la recarga en caliente. */
function politicaDeSeguridad(): Plugin {
  return {
    name: 'politica-de-seguridad',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        const hashes = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)]
          .map(([, js]) => `'sha256-${createHash('sha256').update(js).digest('base64')}'`)
        const csp = [
          "default-src 'self'",
          `script-src 'self' ${hashes.join(' ')}`,
          "style-src 'self' https://fonts.googleapis.com",
          'font-src https://fonts.gstatic.com',
          "img-src 'self' data:",
          "connect-src 'self'",
          'form-action https://formsubmit.co',
          "base-uri 'self'",
          "object-src 'none'",
          'upgrade-insecure-requests',
        ].join('; ')
        return html.replace('<head>', `<head>
    <meta http-equiv="Content-Security-Policy" content="${csp}" />
    <meta name="referrer" content="strict-origin-when-cross-origin" />`)
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), politicaDeSeguridad()],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  // Una sola página: ~560 KB sin comprimir (~190 KB con gzip), con GSAP, Motion, React y los trazos del fondo.
  build: { chunkSizeWarningLimit: 650 },
})
