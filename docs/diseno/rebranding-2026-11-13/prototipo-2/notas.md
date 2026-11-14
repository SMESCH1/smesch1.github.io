# Portada "My projects + cerebro" · prototipo 2 (13/11/2026)

**Probalo en vivo:** con el servidor de desarrollo andando (`npx vite` en el repo, rama `prototipo-portada`), abrí <http://localhost:5173/?portada=proyectos>. Abajo hay un selector: estilo del carrusel (mazo, fila, ficha), semilla, registro, resaltador dibujado, celular sin cerebro y tema.

**Mejora a probar:** la semilla. Al pasar el cursor por cualquier nodo se enciende su vecindario (el nodo, sus vecinos a un paso y, más tenues, los de dos pasos), como un mapa de conectividad desde una semilla.

## Lo que pediste

| Pedido | Cómo quedó |
|---|---|
| Carrusel arriba y cerebro abajo | Sí, en la columna derecha de la portada |
| "Mis proyectos" encima del carrusel | "My **projects**" (el sitio está en inglés), con el subrayado de firma |
| Que un texto largo no empuje al cerebro | El carrusel tiene alto fijo y la bajada se corta a 3 líneas (2 en celular). Medido: el cerebro queda en el mismo lugar con el proyecto más corto y con el más largo |
| Cerebro interactivo: tocar nodos muestra proyectos | Los 9 proyectos tienen su nodo (aro punteado). Clic o toque: el carrusel salta a ese proyecto y una señal cobalto sube por el tronco hasta la región. Con el mouse, el nombre aparece al pasar. También anda con teclado (Tab y Enter) |
| En celular, el cerebro después del carrusel o nada | Después del carrusel y más chico. Con "celular sin cerebro", no aparece |
| Dendritas que crecen en forma lineal desde el origen | Cada rama empieza cuando la anterior llega a su punta, a velocidad constante, desde la esquina hacia los bordes (ver `fondo-crecimiento.png`) |
| En claro, la red de nodos y aristas | La misma red de PSIA-contenido (`red.py`), con el mismo crecimiento desde la esquina |

<video src="mazo-oscuro.mp4#t=3" preload="metadata" controls muted playsinline></video>

<video src="mazo-claro.mp4#t=3" preload="metadata" controls muted playsinline></video>

![Crecimiento del fondo: arriba oscuro (dendritas), abajo claro (red); a 0,35 s, 0,7 s y 1,4 s](fondo-crecimiento.png)

## Variaciones para elegir

**Estilo del carrusel.**
- *Mazo:* las cartas de atrás asoman debajo; se arrastra la de adelante.
- *Fila:* la carta siguiente asoma a la derecha; se desliza la fila. Es el gesto más natural en celular.
- *Ficha:* una sola ficha fija cuyo contenido se funde. Es la más tranquila.

![Mazo](mazo-oscuro-reposo.png)
![Fila](fila-oscuro-reposo.png)
![Ficha, después de tocar el nodo del occipital](ficha-oscuro-clic.png)

<video src="fila-oscuro.mp4#t=3" preload="metadata" controls muted playsinline></video>

<video src="ficha-oscuro.mp4#t=3" preload="metadata" controls muted playsinline></video>

**Semilla (mejora a probar).** Solo con mouse. En el celular, tocar un nodo abre su proyecto.

![Semilla en oscuro](semilla-oscuro.png)
![Semilla en claro](semilla-claro.png)

**Registro.** Una tira tipo EEG debajo del cerebro: cada señal deja un pico y la llegada del proyecto, una marca cobalto. Dice "illustrative, not recorded data", como pide el gusto para los esquemas.

![Registro](registro-oscuro-6s.png)

<video src="registro-oscuro.mp4#t=3" preload="metadata" controls muted playsinline></video>

**Resaltador del About.** Arriba, el recto (un bloque sol que se extiende al entrar en pantalla, en CSS). Abajo, el dibujado del Highlighter de Magic UI (trazo a mano, irregular). En oscuro, los dos quedan como manda el gusto: la palabra en sol y en negrita, sin bloque.

![Resaltador recto contra dibujado](about-resaltadores.png)

**Celular.**

![Portada en celular, oscuro y claro](celular-portadas.png)
![Después de tocar el nodo de Wernicke](celular-oscuro-toque.png)

<video src="celular-oscuro.mp4#t=3" preload="metadata" controls muted playsinline></video>

## Mi recomendación

Ficha con semilla, sin registro y con el resaltador recto. La ficha es la que menos compite con el cerebro, que ya se mueve; la semilla suma la interacción más ligada a tu trabajo; el registro es lindo pero agrega un tercer foco en la portada. En celular, la fila (por el gesto de deslizar) o directamente sin cerebro.

## El mapa: revisalo vos

Son guiños, no anatomía exacta (la nota lo aclara). Cambiar uno es cambiar una línea de `src/prototipo/datos.ts`.

| Proyecto | Nodo | Región |
|---|---|---|
| ASD detection via fMRI (thesis) | hub central | Whole-brain connectivity |
| Ontogenia Artificial | frontal inferior | Broca's area · syntax |
| ABIDE DANN | atrás | Occipital lobe · vision |
| Stock price prediction | frontal | Prefrontal cortex · decisions |
| Medallion pipeline | temporal | Temporal lobe · memory |
| Autism classification: BrainHack | parietal | Default mode network · parietal hub |
| InforMessi | temporal posterior | Wernicke's area · reading the news |
| SocratIA | polo frontal | Frontal pole · abstract thought |
| FastAPI payments API | abajo, atrás | Cerebellum · error correction |

## Chequeos hechos

- Sin errores en la consola en ninguna variante, en escritorio (1440 px) ni en celular (390 px), y sin desborde horizontal.
- Con "reducir movimiento", a los 0,6 s todo está en su estado final (`reducido-oscuro.png`).
- Las animaciones siguen la skill `animate` (Emil Kowalski): curvas ease-out e ease-in-out fuertes, nada desde `scale(0)`, cambios de interfaz de 300 ms o menos, el efecto del cursor solo con mouse y "reducir movimiento" en todo.

## Pendiente

- La cifra que cuenta (0.79) muestra 0.00 si la carta empieza fuera de pantalla. Cuenta cuando se ve, pero conviene decidir si arranca ya en su valor.
- Siguen sin resolver los datos del sitio que te marqué: "Academic Coordinator" contra "Mentor" en Humai, y el enlace de INECO.
- Todo está en la rama `prototipo-portada`, sin commits. `src/main.tsx` apunta al prototipo.
