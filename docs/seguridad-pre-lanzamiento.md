# Seguridad pre-lanzamiento · rediseño del portfolio (14/11/2026)

Checklist de `hardening-seguridad` (modo pre-lanzamiento, 29 ítems). **Nivel N1:** sitio estático en GitHub Pages, sin backend, sin base de datos, sin sesiones, sin uploads, sin IA ni APIs pagas. El único dato que entra es el formulario de contacto, que se envía a un tercero (FormSubmit) y no pasa por un servidor propio.

Estados: ✅ verificado · ⚠️ implementado sin verificar o parcial · ❌ falta · N/A con motivo.

| # | Ítem | Estado | Prueba o motivo |
|---|---|---|---|
| 1 | Claves secretas solo en servidor | ✅ | `quick_scan` sin P0; grep de `sk_`, `sb_secret_`, `sk-ant-`, `AIza`, `ghp_`, `service_role` en `dist/`: nada. No hay claves en el proyecto |
| 2 | Secretos fuera de Git | ✅ | Grep de los mismos patrones y de llaves privadas sobre `git log -p --all`: 0 coincidencias (gitleaks no está instalado) |
| 3 | Clave pública de la DB con RLS | N/A | No hay base de datos |
| 4 | RLS y políticas de storage | N/A | No hay base de datos ni storage |
| 5 | Datos sensibles cifrados | ✅ | Solo HTTPS (ver 19). No se guarda nada |
| 6 | Autenticación por defecto | N/A | No hay rutas privadas ni acciones |
| 7 | Anti-IDOR | N/A | No hay registros de usuarios |
| 8 | Campos protegidos | N/A | No hay API propia |
| 9 | Cookies de sesión | N/A | No hay sesiones. Tema e idioma se guardan en localStorage (no sensibles, tolerante a bloqueo) |
| 10 | Contraseñas | N/A | No hay cuentas |
| 11 | Rate limiting | N/A | No hay endpoints propios; el formulario lo recibe FormSubmit |
| 12 | Anti-bot en el formulario de contacto | ⚠️ | Hay campo trampa (`_honey`) y límites de largo. El captcha de FormSubmit está apagado (`_captcha=false`, como en el sitio anterior): un envío por `curl` sin desafío pasaría. Ver acciones |
| 13 | Queries parametrizadas | N/A | No hay queries |
| 14 | Validación en servidor | N/A | No hay servidor propio. En el cliente: `required`, `type=email`, `maxLength` |
| 15 | Contenido de usuario sanitizado | ✅ | No se muestra contenido de usuarios. Sin `dangerouslySetInnerHTML` ni `innerHTML` en `src/` (el que marca el escáner está en `index.backup.html`, que no se publica) |
| 16 | Uploads | N/A | No hay |
| 17 | Respuestas mínimas | N/A | No hay API |
| 18 | Security headers | ⚠️ | GitHub Pages no deja configurar headers. Se agregó por `<meta>` en el build: CSP sin `unsafe-inline` (el script del tema va con su hash), `form-action` solo a FormSubmit, `object-src 'none'`, `base-uri 'self'` y `Referrer-Policy`. Verificado con `vite preview`: 0 violaciones en claro y oscuro. No se pueden poner por `<meta>`: `frame-ancestors`, `X-Frame-Options`, `X-Content-Type-Options` (riesgo bajo en un sitio sin acciones) |
| 19 | HTTPS + HSTS | ✅ | `curl -sI http://smesch1.github.io` → 301 a https; `Strict-Transport-Security: max-age=31556952` |
| 20 | Dependencias | ✅ | `npm audit --omit=dev`: 0 vulnerabilidades. Dependabot agregado (npm y Actions) con cooldown de 5/14 días |
| 21 | Topes de gasto | N/A | No hay APIs pagas |
| 22 | MFA en cuentas | Humano | GitHub (repo y Pages) y el email que recibe el formulario |
| 23 | Framework parchado | ✅ | React 19.3.1, Vite 8.1, sin advisories |
| 24 | Webhooks y crons | N/A | No hay |
| 25 | Errores sin stack traces | N/A | Sitio estático; el build de producción no expone fuentes de desarrollo |
| 26 | CORS | N/A | No hay API |
| 27 | Previews protegidos | N/A | GitHub Pages publica solo `main` |
| 28 | Backups | N/A | Todo el contenido está en Git |
| 29 | IA | N/A | El sitio no usa IA |

**Además (código generado con IA):**
- Las GitHub Actions del deploy quedaron fijadas por SHA, con el tag como comentario (HS-53).
- El workflow corre los tests antes del build.
- Antes de instalar cada paquete nuevo se verificó su nombre y su registro: gsap, @gsap/react, motion, vitest y los componentes de Magic UI.
- `.gitignore` excluye `.env*` (HS-02).

**Ningún P0 abierto.**

## Acciones de Sebastián
1. **MFA** en GitHub y en el email que recibe los mensajes del formulario.
2. **Formulario:**
   - Opcional: en FormSubmit, reemplazar el email del `action` por el alias aleatorio que da el servicio después de la primera activación.
   - Si llega spam, sacar `_captcha=false` para que FormSubmit pida su captcha.
3. **Settings → Pages:** confirmar "Enforce HTTPS".
4. Opcional: `SECURITY.md` con un canal de contacto (HS-74, mejora).

Límite honesto: esto revisa controles técnicos de un sitio estático; no es una auditoría ni certifica nada.
