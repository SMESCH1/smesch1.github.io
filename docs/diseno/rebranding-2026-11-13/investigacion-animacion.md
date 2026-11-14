# Recursos de animación front-end · investigación del 13/11/2026

Base para la skill propia de animación. [V] = verificado en la fuente primaria ese día; [I] = inferencia o fuente secundaria.

## Qué usar para qué

| Necesidad | Herramienta | Por qué |
|---|---|---|
| Entradas, salidas, arrastre, layout, contar cifras, revelar al hacer scroll | **Motion** (`motion/react`) | Declarativo, integrado con React |
| Secuencias largas, SVG (dibujar trazos, recorrer caminos, transformar formas), texto por líneas, scroll con scrub | **GSAP** + `@gsap/react` | Timelines, DrawSVG, SplitText, MotionPath, MorphSVG, ScrollTrigger |
| Componentes ya hechos | **Magic UI**, **React Bits**, **Aceternity UI** (con el CLI de shadcn) | Se copian al proyecto; hay que filtrarlos por el gusto |
| Ideas y técnicas | **Codrops** (tutoriales y demos, MIT) y **Awwwards** (galería, solo referencia) | No son librerías |

## Por recurso

**Motion 14** (MIT). Se importa desde `motion/react`. De la 12 a la 14 no hay cambios que rompan en un proyecto con Tailwind (el de la 13 afecta solo a styled-components o Emotion) [V]. Riesgo: tener `framer-motion` 12 y `motion` 14 a la vez duplica la librería y separa los contextos de `AnimatePresence` y `MotionConfig` [I]. Desinstalar `framer-motion`. Herramientas oficiales para agentes: `npx motion-ai` (skill `/motion` y un MCP; lo mejor es pago) y `motion.dev/llms.txt` [V].

**GSAP 3.15** ("Standard No Charge License" de Webflow). Todos los plugins son gratis, también para uso comercial; no es open source y prohíbe usarlo en constructores no-code que compitan con Webflow [V]. Todo está en el npm público (`gsap/SplitText`, `gsap/DrawSVGPlugin`, `gsap/ScrollTrigger`, `gsap/MorphSVGPlugin`, `gsap/MotionPathPlugin`, `gsap/Flip`). En React: `useGSAP(() => {...}, { scope: ref })`, con los handlers en `contextSafe`; movimiento reducido con `gsap.matchMedia()` [V].

**React Bits** (MIT + Commons Clause: se usa en sitios propios, no se revenden ni redistribuyen los componentes) [V]. Instalación: `npx shadcn@latest add @react-bits/SplitText-TS-TW` (sufijos `JS|TS` y `CSS|TW`) [V]. Algunos piden `motion@^12`: revisar el diff de `package.json` para que no baje la 14 [I].
- Encajan: SplitText, ScrollReveal, CountUp, FadeContent / AnimatedContent, Crosshair (cursor con coordenadas, tipo instrumento).
- Chocan (glow o degradé): Aurora, ShinyText, GradientText, GlareHover, StarBorder, ElectricBorder, BorderGlow, LightRays, Prism, Iridescence, MagicBento.

**Magic UI** (MIT en la versión gratis) [V]. `npx shadcn@latest add @magicui/number-ticker`.
- Encajan: NumberTicker, BlurFade, TextAnimate, ScrollProgress, Marquee, DotPattern y **Highlighter** (resaltador dibujado, con `rough-notation`).
- Chocan: AnimatedBeam (trazo con degradé), BorderBeam, ShineBorder, AuroraText, NeonGradientCard, MagicCard, ShimmerButton.

**Aceternity UI** (licencia propia: productos finales ilimitados, sin redistribuir el código) [V]. `npx shadcn@latest add @aceternity/timeline`.
- Encajan: timeline, sticky-scroll-reveal, text-generate-effect, layout-text-flip.
- Chocan: aurora-background, background-beams, lamp, spotlight, glowing-effect.

**Codrops**: tutoriales, Creative Hub, Webzibition, casos de estudio. Las demos descargables son MIT salvo que digan otra cosa (conservar el aviso) [V].

**Awwwards**: galería con filtros por tecnología (GSAP, Three.js, WebGL) y por tag (Animation, Scrolling, Portfolio). Solo referencia: los sitios son de sus dueños [I].

**CLI de shadcn en Vite + Tailwind v4** [V]: `paths` `@/*` en `tsconfig.json` y `tsconfig.app.json`, alias `@` en `vite.config.ts`, `npm i -D @types/node`, `npx shadcn@latest init` (crea `components.json` y `lib/utils` con `cn`). Los registros `@magicui`, `@aceternity` y `@react-bits` se resuelven solos.

## Skills de la comunidad

| Skill | Qué es | Veredicto |
|---|---|---|
| [emilkowalski/skills](https://github.com/emilkowalski/skills) (MIT, activo) | Criterio de animación: cuándo animar, duraciones de 100 a 300 ms, curvas, solo `transform` y `opacity`, movimiento reducido. `animate`, `review-animations`, `improve-animations`, `choreograph`… Cubre CSS y Motion, no GSAP | La mejor en criterio |
| [greensock/gsap-skills](https://github.com/greensock/gsap-skills) (MIT, oficial) | API de GSAP: core, timeline, scrolltrigger, plugins, react, performance | Buena como referencia técnica; no trae criterio de diseño |
| motiondivision/ai-kit (oficial) | Skill y MCP de Motion; lo valioso es pago | Opcional |
| pbakaus/impeccable | `animate` es uno de 24 comandos; se superpone con gusto-visual | No hace falta |

**Recomendación:** instalar las de Emil (`animate`, `review-animations`) y las de GSAP (`gsap-core`, `gsap-react`, `gsap-scrolltrigger`, `gsap-plugins`), y escribir una skill propia liviana que sume lo que ninguna trae: el árbol de decisión CSS → Motion → GSAP, el catálogo filtrado por el gusto (lo que encaja y lo que choca), los comandos de shadcn, las trampas de versión, las licencias y el puntero a `gusto-visual`.
