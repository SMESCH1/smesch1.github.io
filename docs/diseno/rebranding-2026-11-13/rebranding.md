# Rebranding del portfolio · smesch1.github.io

Pieza: el sitio personal (portfolio) de Sebastián, con su nombre. No es una pieza de PSIA, así que la firma no es el logo de PSIA sino los recursos de firma del gusto (subrayado, resaltador, instrumento, dendritas).

## Idea base

Un psicólogo que entrena modelos: el portfolio se lee como un paper bien diagramado y cada proyecto muestra lo que midió.

## Mini filosofía

- **Fondo:** claro (placa) por defecto, como pide el medio web; oscuro (resonancia) con `prefers-color-scheme` y un botón. En oscuro, la portada lleva dendritas desde las esquinas (como las slides oscuras de los decks); en claro, la portada va lisa con luz ambiente.
- **Roles de color:**
  - cobalto = la firma: palabra clave subrayada en cada título de sección, cifras de los proyectos (0.79 AUC, 29 tests), la barra del modelo en el instrumento, el botón principal y los hubs del cerebro;
  - sol = lo que importa, dos veces en todo el sitio: la medición del instrumento (AUC 0.79) y el resaltador de "AI for mental health" en About;
  - rojo = solo una línea: el nivel de azar (AUC 0.5) en el instrumento.
- **Recurso de firma:** subrayado de firma en los títulos; instrumento en la portada (variante A) con el dato real de la tesis; fila de datos (1,102 sujetos, 94 regiones).
- **Alineación:** a la izquierda (web).
- **Mejora a probar:** numeración gigante tono sobre tono en los títulos de sección (reemplaza al "01" chico en mono de hoy). Va como variante; la pieza va sin ella.

## Lo que sale (delata IA o choca con el gusto)

- Instrument Serif y Geist / Geist Mono → Piazzolla, Source Sans 3, STIX Two Text itálica y Source Code Pro (solo en el instrumento).
- Rótulos chicos en mono y en mayúsculas (tags, fechas, "// Teaching", "01") → Source Sans 3 en caja normal, gris secundario.
- Texto con degradé dorado ("Mesch"), brillos (glow), grano, grilla de fondo y halos difuminados → colores planos y luz ambiente.
- Dorado `#D6A232` sobre azul noche → paleta Resonancia.

## Texto

Se conserva el texto actual (inglés por defecto, con ES). Cambios mínimos:

| Dónde | Hoy | Propuesta |
|---|---|---|
| Portada, frase | (dentro de la bajada) | Bridging cognitive **neuroscience** and deep learning |
| Portada, bajada (STIX itálica) | Licensed Psychologist and Data Scientist bridging… | Licensed psychologist and data scientist. Academic Coordinator at Humai, researcher at Universidad Favaloro and MSc in AI student at UdeSA. |
| Títulos de sección | Featured Projects · Teaching & Research · About · Experience & Education · Get in touch | Featured **projects** · Teaching & **research** · **About** · Experience & **education** · Get in **touch** |
| About, párrafo 2 | My core interest is the intersection of AI and mental health… | My core interest is ==AI for mental health==: using machine learning to make sense of brain signals, clinical data and behavioral patterns… |
| Research, bajada | …at the intersection of cognitive science and machine learning. | AI instructor, academic researcher and speaker on cognitive science and machine learning. |
| Revistas | en mono | en STIX itálica: *Psicología y Sociedad*, *Anuario de Investigaciones* |

"At the intersection of" está en `yo/ai-writing-blacklist.md` (sección de frases hechas).

## Para revisar con Sebastián (datos del sitio actual)

- La portada dice "Academic Coordinator at Humai", pero Experience dice "AI and Neuroscience Mentor" (2026–) y "Academic Director" (2023–2026). ¿Cuál va?
- La tarjeta "New Frontiers in Neuroscience · INECO" enlaza al mismo artículo de SciELO que la publicación de *Psicología y Sociedad*.
- En SciELO, la revista de ese enlace (`scielo.br/j/psoc`) figura como *Psicologia & Sociedade*. Verificar el nombre antes de publicarlo.

## Variantes

- **A · Paper (claro):** portada con el instrumento (AUC de la tesis contra el azar) y la fila de datos.
- **B · Resonancia (oscuro):** portada con su cerebro de nodos redibujado en la paleta (hubs en cobalto) sobre dendritas.
- **Mejora a probar:** A con numeración gigante tono sobre tono.

## Capturas (13/11/2026, tres rondas de autocrítica)

- `capturas/hoja-portadas.png`: hoy, A y B, cada una en su tema y en el otro.
- `capturas/A-claro-completo.png` y `capturas/A-oscuro-completo.png`: la página entera.
- `capturas/A-claro-celular.png` y `capturas/A-oscuro-celular.png`: 390 px.
- `capturas/hoja-mejora.png`: la mejora a probar al lado del original.
- `capturas/0-original-*.png`: el sitio publicado hoy (rama `main`).

Correcciones de la autocrítica: el nombre pasó de tres líneas a dos; las dendritas, de dos esquinas a una (la de arriba a la izquierda cruzaba los roles); la tesis pasó a tarjeta destacada a lo ancho (con 9 tarjetas quedaba una sola al final); en celular, idioma y tema van dentro del menú, y las dendritas se generan para la franja de arriba (el alcance del generador escala con el alto).
