import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { NODOS, camino, par, radio } from './cerebro';
import { EN_EL_MAPA } from './datos';
import { RedCerebral } from './RedCerebral';
import { Cifra } from './Cifra';
import { SVG_NS, gsap, reducido, token, useGSAP } from './animacion';

const ORIGEN = 'S3'; // la señal sube desde el tronco
const ESPERA = 6000;

/** Portada 3 · cada proyecto se ilumina en una región del cerebro: una señal sube por el tronco hasta ese nodo
 *  y la ficha del proyecto aparece abajo (GSAP para el cerebro, Motion para la ficha). */
export function MapaCerebral() {
  const svg = useRef<SVGSVGElement>(null);
  const [activo, setActivo] = useState(0);
  const [pausado, setPausado] = useState(false);
  const proyecto = EN_EL_MAPA[activo];

  // Avanza solo, salvo con el cursor encima o con menos movimiento pedido.
  useEffect(() => {
    if (pausado || reducido()) return;
    const t = window.setTimeout(() => setActivo((i) => (i + 1) % EN_EL_MAPA.length), ESPERA);
    return () => window.clearTimeout(t);
  }, [activo, pausado]);

  // Entrada, una sola vez: el cerebro se traza.
  useGSAP(() => {
    if (reducido()) return;
    gsap.from('.arista', { drawSVG: 0, duration: 0.8, ease: 'power2.inOut', stagger: 0.02 });
    gsap.from('.nodos circle', { opacity: 0, scale: 0.6, transformOrigin: '50% 50%', duration: 0.4, ease: 'salida', stagger: { each: 0.015, from: 'random' }, delay: 0.2 });
  }, { scope: svg });

  // Cada cambio de proyecto: la señal recorre el camino más corto desde el tronco y enciende ese camino en cobalto.
  // revertOnUpdate deshace lo del proyecto anterior antes de animar el nuevo.
  useGSAP(() => {
    const raiz = svg.current!;
    const destino = proyecto.region!.nodo;
    const ruta = camino(ORIGEN, destino);
    const capa = raiz.querySelector('.senales')!;
    const nodo = raiz.querySelector<SVGCircleElement>(`.nodos [data-id="${destino}"]`)!;
    const cobalto = token('--cobalto');
    const lento = reducido();

    const punto = document.createElementNS(SVG_NS, 'circle');
    punto.setAttribute('class', 'senal');
    punto.setAttribute('r', '1.8');
    punto.setAttribute('cx', String(NODOS[ORIGEN][0]));
    punto.setAttribute('cy', String(NODOS[ORIGEN][1]));
    capa.appendChild(punto);
    const anillo = document.createElementNS(SVG_NS, 'circle');
    anillo.setAttribute('class', 'anillo');
    anillo.setAttribute('cx', String(NODOS[destino][0]));
    anillo.setAttribute('cy', String(NODOS[destino][1]));
    anillo.setAttribute('r', String(radio(destino)));
    anillo.setAttribute('opacity', '0');
    capa.appendChild(anillo);

    const tl = gsap.timeline({ delay: 0.15 });
    for (let i = 1; i < ruta.length; i++) {
      const arista = raiz.querySelector(`.arista[data-par="${par(ruta[i - 1], ruta[i])}"]`)!;
      const [x, y] = NODOS[ruta[i]];
      tl.to(punto, { attr: { cx: x, cy: y }, duration: lento ? 0 : 0.22, ease: 'none' })
        .to(arista, { stroke: cobalto, strokeOpacity: 1, duration: lento ? 0 : 0.2 }, '<');
    }
    tl.to(punto, { opacity: 0, duration: 0.15 })
      .to(nodo, { attr: { r: radio(destino) * 1.9 }, fill: cobalto, duration: 0.35, ease: 'back.out(3)' }, '<');
    if (!lento) {
      tl.fromTo(anillo, { attr: { r: radio(destino) * 1.9, 'stroke-width': 1.4 }, opacity: 0.9 },
        { attr: { r: radio(destino) * 1.9 + 10, 'stroke-width': 0.2 }, opacity: 0, duration: 1.4, ease: 'power2.out', repeat: -1, repeatDelay: 0.3 });
    }
    return () => { punto.remove(); anillo.remove(); };
  }, { scope: svg, dependencies: [activo], revertOnUpdate: true });

  return (
    <div className="mapa" onPointerEnter={() => setPausado(true)} onPointerLeave={() => setPausado(false)}>
      <RedCerebral ref={svg} etiqueta="Brain map: each project lights up a region">
        {EN_EL_MAPA.map((p, i) => {
          const [x, y] = NODOS[p.region!.nodo];
          return (
            <g key={p.id} className="clicable" onClick={() => setActivo(i)} role="button" aria-label={p.titulo}>
              <circle className="aro-mapa" cx={x} cy={y} r={radio(p.region!.nodo) + 3.4} />
              <circle cx={x} cy={y} r={10} fill="transparent" />
            </g>
          );
        })}
      </RedCerebral>
      <AnimatePresence mode="wait" initial={false}>
        <motion.article
          key={proyecto.id}
          className="ficha"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <p className="region">{proyecto.region!.nombre}</p>
          <h3>
            <a href={proyecto.codigo}>{proyecto.titulo}</a>
            {proyecto.nota && <span className="nota"> ({proyecto.nota})</span>}
          </h3>
          {proyecto.cifra && <Cifra cifra={proyecto.cifra} />}
          <p className="desc">{proyecto.desc}</p>
        </motion.article>
      </AnimatePresence>
      <div className="pie-mapa">
        <div className="puntos">
          {EN_EL_MAPA.map((p, i) => (
            <button key={p.id} aria-label={p.titulo} aria-current={i === activo} onClick={() => setActivo(i)} />
          ))}
        </div>
        <p className="nota-mapa">A playful map, not exact anatomy.</p>
      </div>
    </div>
  );
}
