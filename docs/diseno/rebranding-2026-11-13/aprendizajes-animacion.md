# Aprendizajes de animación front-end · base para la skill propia

Lo verificado haciendo el prototipo de la portada (13/11/2026), sobre React 19, Vite 8, Tailwind 4, GSAP 3.15 y Motion 14. Complementa `investigacion-animacion.md`, que tiene el catálogo y las licencias.

## Cómo se reparten las skills

- **animate, choreograph, review-animations, improve-animations y animation-performance** (Emil Kowalski, instaladas el 13/11/2026): el criterio. Si algo se anima o no, con qué curva y cuánto dura, el movimiento reducido.
- **gsap-\*** (oficiales de GSAP): la API. Ojo: sus descripciones empujan a recomendar GSAP para todo.
- **gusto-visual**: la identidad (colores con rol, sin degradés ni brillo, resaltador recto, dendritas o red).
- **La skill propia** tiene que sumar lo que ninguna trae: qué herramienta para qué caso, el catálogo filtrado por el gusto, las trampas de versión y de integración, y el flujo para probar y mostrar.

## Qué herramienta para qué

| Caso | Herramienta | Ejemplo del prototipo |
|---|---|---|
| Hover, color, un estado que cambia con una clase | CSS transition | aro de los nodos, borde de las tarjetas |
| Algo que se extiende una vez al verse | CSS transition y `useInView` de Motion | resaltador recto del About |
| Entrar o salir, arrastre, layout, cambio de contenido | Motion | carrusel (mazo, fila, ficha), etiqueta del nodo |
| Trazos SVG, secuencias largas, texto por líneas, scroll con scrub | GSAP (DrawSVG, SplitText, ScrollTrigger) | fondo que crece, cerebro, nombre de la portada |
| Animación continua dibujada a mano (una traza) | `gsap.ticker` y un polyline | registro tipo EEG |
| Componente ya hecho | Magic UI, React Bits o Aceternity, adaptado | NumberTicker |

## Trampas encontradas (todas reales, todas resueltas)

1. **framer-motion y motion juntos.** El proyecto tenía framer-motion 12 y se sumó motion 14. Hay que quedarse con uno (`motion`, importado desde `motion/react`) y desinstalar el otro.
2. **React Bits puede bajar Motion.** `CountUp` pide `motion@^12.23.12` en su registro: el CLI reemplazaría la 14. Antes de instalar, leer `dependencies` en `https://reactbits.dev/r/<Componente>-TS-TW.json`.
3. **Motion pisa el `transform`.** Si un elemento centrado con `transform: translate(-50%)` se anima con `y`, se descentra. Hay que separar en un ancla posicionada (CSS) y adentro el elemento que anima.
4. **Motion no interpola `calc()`.** Para deslizar una fila, medir el ancho con un ResizeObserver y animar en píxeles.
5. **GSAP y el modo estricto de React.** En desarrollo, React monta dos veces y `useGSAP` revierte. Un elemento creado a mano sin un atributo que después se anima (por ejemplo, `r` en un círculo) queda con `r=""` y la consola tira error. Hay que darle el valor inicial al crearlo.
6. **Elementos creados después del montaje.** Lo que se crea en un handler o en una llamada diferida tiene que ir envuelto en `contextSafe` (de `useGSAP`) para que se limpie. Las llamadas recursivas (`delayedCall`) necesitan una bandera que las corte en la limpieza.
7. **`revertOnUpdate`.** `useGSAP` con `dependencies` y `revertOnUpdate: true` deshace lo del estado anterior antes de animar el nuevo. Así se cambia de proyecto sin dejar aristas pintadas.
8. **Tweens de color con tokens.** GSAP no interpola `var(--cobalto)`: hay que leer el valor real con `getComputedStyle(document.documentElement).getPropertyValue('--cobalto')`.
9. **Curvas con nombre.** Las de la skill animate se registran una vez con CustomEase (`'salida'` = `0.23,1,0.32,1`; `'vaiven'` = `0.77,0,0.175,1`) y en Motion como arrays. En CSS van como `--ease-salida` y `--ease-vaiven`.
10. **Especificidad en los fondos.** `.fondo-marca svg { display:block }` le ganaba a `.solo-celular { display:none }` y las dos versiones se apilaban. Hay que escribir las reglas de visibilidad con la misma especificidad y posicionar cada SVG en absoluto.
11. **El crecimiento "lineal desde el origen"** no sale con `stagger`. Hay que calcular en el generador a qué distancia del origen empieza cada trazo (`t0`) y cuánto mide; después, retraso = t0 / velocidad y duración = largo / velocidad, con `ease: 'none'`.
12. **El fondo escala con el alto.** El alcance de `dendritas.py` y `red.py` depende del alto del lienzo: en celular hay que generar otra versión (390 × 640) y mostrarla solo en la franja de arriba.
13. **El texto largo mueve lo de abajo.** El carrusel necesita alto fijo y recorte de líneas (`-webkit-line-clamp`) para que el cerebro no salte.
14. **Mazo de cartas.** Para que las de atrás asomen, `transform-origin: 50% 100%` (escalan desde abajo).
15. **SplitText** con `mask: 'lines'` y `autoSplit: true`: vuelve a dividir cuando cargan las fuentes (si no, corta mal con la fuente de respaldo).

## Componentes de librerías: siempre adaptar

- **Magic UI NumberTicker:**
  - trae `text-black dark:text-white tracking-wider` (pisa el cobalto de las cifras);
  - muestra `startValue` sin decimales;
  - no respeta el movimiento reducido.
  Se adaptó en `src/components/ui/number-ticker.tsx`.
- **Magic UI Highlighter:** usa rough-notation, un trazo a mano irregular. Choca con el resaltador recto del gusto. Viene rosa por defecto y no respeta el movimiento reducido. Queda como variante; el recto se hace con CSS.
- **Aceternity timeline:** degradés (8 apariciones) y sin movimiento reducido. Habría que reescribirle el color.
- **React Bits** (SplitText, ScrollReveal, CountUp): respetan el movimiento reducido. Revisar las dependencias antes de instalar.
- **shadcn CLI sin `init`:** se escribe el `components.json` a mano, con `tailwind.css` apuntando a un archivo que no se importa (`src/shadcn.css`), así no inyecta variables en los estilos propios. Hace falta el alias `@/` en `tsconfig.json`, en `tsconfig.app.json` y en `vite.config.ts`, más `src/lib/utils.ts` con `cn`.

## Reglas de criterio que se aplicaron (skill animate)

- **Filtro de frecuencia:** la entrada de la portada y el crecimiento del fondo pasan una vez por visita, así que tienen margen para "deleite". El cambio de proyecto es indicación de estado (300 ms o menos). El hover del cursor es frecuente, así que va rápido (150 ms) y solo con mouse.
- **Nada desde `scale(0)`:** desde `scale(0.6)` y opacidad 0.
- **Arrastre con resorte** (`{ type: 'spring', duration: 0.45, bounce: 0.12 }`). Cambios de contenido con ease-out fuerte. Lo constante (una barra de progreso, el crecimiento del fondo), lineal.
- **Movimiento reducido en todo:**
  - `<MotionConfig reducedMotion="user">` en la raíz;
  - `reducido()` en cada `useGSAP`;
  - `@media (prefers-reduced-motion)` en CSS.
  Reducido no es cero: el fondo aparece con un fundido.

## Flujo para probar y mostrar

1. **Prototipo** en una rama aparte, con un selector de variantes que lee y escribe la URL (`?portada=…&estilo=…`), así cada variante tiene su link.
2. **Playwright con Python:**
   - capturas a tiempos fijos y cuadros del crecimiento;
   - interacción real (hover, clic, toque con `has_touch`);
   - video con `record_video_dir`, pasado a MP4 con ffmpeg;
   - verificar consola sin errores, `scrollWidth` sin desborde y que la posición de lo de abajo no cambie entre estados;
   - capturar también con `reduced_motion="reduce"`.
3. **Ocultar el selector** en las capturas (`add_style_tag`).
4. **Mirar las imágenes**, corregir y repetir, hasta 3 rondas. Mostrar el original al lado cuando hay un cambio de estilo (corrección de gusto-visual).
