import { useMemo, useRef, useState } from 'react';
import type { PointerEvent as EventoPuntero } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ARISTAS, HUBS, NODOS, VB, caminata, camino, par, radio, saltos } from './grafo';
import { RedCerebral } from './RedCerebral';
import { emitirPulso } from './senales';
import { SALIDA, SVG_NS, conMouse, gsap, reducido, token, useGSAP } from '../lib/animacion';

const ORIGEN = 'S3'; // la señal del proyecto sube desde el tronco

export interface NodoProyecto { nodo: string; titulo: string; region: string }

interface Props {
  proyectos: NodoProyecto[];
  activo: number;
  onElegir: (i: number) => void;
  etiqueta: string;
  /** false cuando la portada no se ve: las señales de fondo se detienen. */
  enPantalla: boolean;
}

/** El cerebro como índice de proyectos.
 *  - Cada proyecto tiene un nodo (aro punteado): tocarlo lo abre en el carrusel.
 *  - Al cambiar de proyecto, una señal cobalto sube desde el tronco por el camino más corto y lo deja encendido.
 *  - Semilla: con el mouse sobre cualquier nodo se enciende su vecindario (a uno y dos saltos).
 *  - Señales de fondo tenues, que el registro de actividad escucha. */
export function CerebroInteractivo({ proyectos, activo, onElegir, etiqueta, enPantalla }: Props) {
  const svg = useRef<SVGSVGElement>(null);
  const visible = useRef(enPantalla);
  visible.current = enPantalla;
  const [sobre, setSobre] = useState<number | null>(null);
  const [foco, setFoco] = useState<string | null>(null);
  const vecindario = useMemo(() => (foco ? saltos(foco, 2) : null), [foco]);
  const destino = proyectos[activo].nodo;

  const moverCursor = (e: EventoPuntero) => {
    if (!conMouse()) return;
    const raiz = svg.current!;
    const p = raiz.createSVGPoint();
    p.x = e.clientX;
    p.y = e.clientY;
    const q = p.matrixTransform(raiz.getScreenCTM()!.inverse());
    let mejor: string | null = null;
    let dmin = 12;
    for (const [id, [x, y]] of Object.entries(NODOS)) {
      const d = Math.hypot(q.x - x, q.y - y);
      if (d < dmin) { dmin = d; mejor = id; }
    }
    if (mejor !== foco) setFoco(mejor);
  };

  // Entrada (una vez) y señales de fondo.
  useGSAP((_ctx, contextSafe) => {
    const raiz = svg.current!;
    const aristas = gsap.utils.toArray<SVGLineElement>('.arista', raiz);
    const nodos = gsap.utils.toArray<SVGCircleElement>('.nodos circle', raiz);
    const capa = raiz.querySelector<SVGGElement>('.ambiente')!;
    const porPar = new Map(aristas.map((l) => [l.dataset.par!, l]));
    if (reducido()) return;

    gsap.timeline()
      .from(aristas, { drawSVG: 0, duration: 0.7, ease: 'vaiven', stagger: 0.018 })
      .from(nodos, { opacity: 0, scale: 0.6, transformOrigin: '50% 50%', duration: 0.4, ease: 'salida', stagger: { each: 0.015, from: 'random' } }, 0.3);

    let vivo = true;
    const lanzar = contextSafe!(() => {
      if (!vivo) return;
      if (!visible.current || document.hidden) { gsap.delayedCall(1, lanzar); return; }
      const ruta = caminata(gsap.utils.random(2, 4, 1));
      const [x0, y0] = NODOS[ruta[0]];
      const punto = document.createElementNS(SVG_NS, 'circle');
      punto.setAttribute('class', 'senal-ambiente');
      punto.setAttribute('r', '1.3');
      punto.setAttribute('cx', String(x0));
      punto.setAttribute('cy', String(y0));
      capa.appendChild(punto);
      const viaje = gsap.timeline({ onComplete: () => punto.remove() }).from(punto, { opacity: 0, duration: 0.15 });
      for (let i = 1; i < ruta.length; i++) {
        const [x, y] = NODOS[ruta[i]];
        const arista = porPar.get(par(ruta[i - 1], ruta[i]))!;
        const base = Number(arista.getAttribute('stroke-opacity'));
        viaje
          .call(() => { gsap.timeline().to(arista, { strokeOpacity: base + 0.3, duration: 0.1 }).to(arista, { strokeOpacity: base, duration: 0.5 }); })
          .to(punto, { attr: { cx: x, cy: y }, duration: 0.45, ease: 'none' })
          .call(() => emitirPulso(HUBS.includes(ruta[i]) ? 0.16 : 0.07));
      }
      viaje.to(punto, { opacity: 0, duration: 0.2 });
      gsap.delayedCall(gsap.utils.random(0.5, 1.1), lanzar);
    });
    gsap.delayedCall(1.2, lanzar);
    return () => { vivo = false; capa.replaceChildren(); };
  }, { scope: svg });

  // Cada proyecto: la señal cobalto sube por el camino más corto y lo deja encendido.
  // revertOnUpdate deshace lo del proyecto anterior antes de animar el nuevo.
  useGSAP(() => {
    const raiz = svg.current!;
    const ruta = camino(ORIGEN, destino);
    const capa = raiz.querySelector('.proyecto-senal')!;
    const nodo = raiz.querySelector<SVGCircleElement>(`.nodos [data-id="${destino}"]`)!;
    const cobalto = token('--cobalto');
    const r = radio(destino);
    const quieto = reducido();

    const punto = document.createElementNS(SVG_NS, 'circle');
    punto.setAttribute('class', 'senal-proyecto');
    punto.setAttribute('r', '2');
    punto.setAttribute('cx', String(NODOS[ORIGEN][0]));
    punto.setAttribute('cy', String(NODOS[ORIGEN][1]));
    const anillo = document.createElementNS(SVG_NS, 'circle');
    anillo.setAttribute('class', 'anillo');
    anillo.setAttribute('cx', String(NODOS[destino][0]));
    anillo.setAttribute('cy', String(NODOS[destino][1]));
    anillo.setAttribute('r', String(r * 1.9));
    anillo.setAttribute('stroke-width', '1.4');
    anillo.setAttribute('opacity', '0');
    capa.append(punto, anillo);

    const tl = gsap.timeline({ delay: 0.1 });
    for (let i = 1; i < ruta.length; i++) {
      const arista = raiz.querySelector(`.arista[data-par="${par(ruta[i - 1], ruta[i])}"]`)!;
      const [x, y] = NODOS[ruta[i]];
      tl.to(punto, { attr: { cx: x, cy: y }, duration: quieto ? 0 : 0.11, ease: 'none' })
        .to(arista, { stroke: cobalto, strokeOpacity: 1, duration: quieto ? 0 : 0.15 }, '<');
    }
    tl.to(punto, { opacity: 0, duration: 0.12 })
      .to(nodo, { attr: { r: r * 1.9 }, fill: cobalto, duration: 0.3, ease: 'salida' }, '<')
      .call(() => emitirPulso(1, true), [], '<');
    if (!quieto) {
      tl.fromTo(anillo, { attr: { r: r * 1.9, 'stroke-width': 1.4 }, opacity: 0.9 },
        { attr: { r: r * 1.9 + 9, 'stroke-width': 0.2 }, opacity: 0, duration: 1.4, ease: 'salida', repeat: -1, repeatDelay: 0.4 });
    }
    return () => { punto.remove(); anillo.remove(); };
  }, { scope: svg, dependencies: [destino], revertOnUpdate: true });

  return (
    <div className="cerebro-caja" onPointerMove={moverCursor} onPointerLeave={() => setFoco(null)}>
      <RedCerebral ref={svg} etiqueta={etiqueta}>
        {vecindario && (
          <g className="semilla" key={foco}>
            {ARISTAS.filter(([a, b]) => vecindario.has(a) && vecindario.has(b) && Math.min(vecindario.get(a)!, vecindario.get(b)!) < 2).map(([a, b, w]) => (
              <line key={par(a, b)} x1={NODOS[a][0]} y1={NODOS[a][1]} x2={NODOS[b][0]} y2={NODOS[b][1]} strokeWidth={w + 0.3}
                strokeOpacity={Math.min(vecindario.get(a)!, vecindario.get(b)!) === 0 ? 0.95 : 0.45} />
            ))}
            {[...vecindario].map(([id, h]) => (
              <circle key={id} cx={NODOS[id][0]} cy={NODOS[id][1]} r={radio(id) + (h === 0 ? 1.6 : 0.6)} opacity={[1, 0.75, 0.4][h]} />
            ))}
          </g>
        )}
        <g className="ambiente" />
        <g className="proyecto-senal" />
        {proyectos.map((p, i) => {
          const [x, y] = NODOS[p.nodo];
          return (
            <g
              key={p.nodo}
              className={`objetivo${i === activo ? ' es-activo' : ''}`}
              role="button"
              tabIndex={0}
              aria-label={`${p.titulo}: ${p.region}`}
              aria-pressed={i === activo}
              onClick={() => onElegir(i)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onElegir(i); } }}
              onPointerEnter={() => conMouse() && setSobre(i)}
              onPointerLeave={() => setSobre(null)}
              onFocus={() => setSobre(i)}
              onBlur={() => setSobre(null)}
            >
              <circle className="aro-mapa" cx={x} cy={y} r={radio(p.nodo) + 3.4} />
              <circle className="zona" cx={x} cy={y} r={9} />
            </g>
          );
        })}
      </RedCerebral>
      <AnimatePresence>
        {sobre !== null && sobre !== activo && (() => {
          const [x, y] = NODOS[proyectos[sobre].nodo];
          return (
            // El ancla se ubica en el nodo; la etiqueta se anima adentro (Motion pisa el transform del elemento que anima).
            <div key={sobre} className="etiqueta-ancla" style={{ left: `${((x - VB.x) / VB.w) * 100}%`, top: `${((y - VB.y) / VB.h) * 100}%` }}>
              <motion.div className="etiqueta-nodo" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }} transition={{ duration: 0.15, ease: SALIDA }}>
                {proyectos[sobre].titulo}
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
