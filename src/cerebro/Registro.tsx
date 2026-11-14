import { useRef } from 'react';
import { escucharPulsos } from './senales';
import { SVG_NS, gsap, reducido, useGSAP } from '../lib/animacion';

const N = 160;          // muestras en pantalla
const ANCHO = 400;
const ALTO = 56;
const BASE = 44;        // y de la línea de base
const PASO = 1 / 30;    // s por muestra

/** Registro de actividad: una tira tipo EEG debajo del cerebro. Cada señal que llega a un nodo deja un pico; la del
 *  proyecto, además, una marca cobalto. Es ilustrativo y lo dice (gusto-visual: un esquema aclara que no es dato). */
export function Registro({ leyenda, enPantalla }: { leyenda: string; enPantalla: boolean }) {
  const raiz = useRef<SVGSVGElement>(null);
  const visible = useRef(enPantalla);
  visible.current = enPantalla;

  useGSAP(() => {
    const traza = raiz.current!.querySelector<SVGPolylineElement>('.traza')!;
    const marcas = raiz.current!.querySelector<SVGGElement>('.marcas')!;
    const valores = new Array<number>(N).fill(0);
    const x = (i: number) => (i / (N - 1)) * ANCHO;
    const dibujar = () => traza.setAttribute('points', valores.map((v, i) => `${x(i).toFixed(1)},${(BASE - v * 34).toFixed(1)}`).join(' '));
    dibujar();
    if (reducido()) return;

    let energia = 0;
    let fase = 0;
    let acumulado = 0;
    let pendientes = 0;
    const quitar = escucharPulsos((fuerza, proyecto) => {
      energia = Math.min(1.2, energia + fuerza);
      if (proyecto) pendientes++;
    });
    const tick = (_t: number, dt: number) => {
      if (!visible.current || document.hidden) return; // fuera de pantalla no se dibuja
      acumulado += dt / 1000;
      while (acumulado >= PASO) {
        acumulado -= PASO;
        fase += 0.9;
        valores.push(energia * Math.sin(fase) + (Math.random() - 0.5) * 0.06);
        valores.shift();
        energia *= 0.8;
        for (const m of Array.from(marcas.children) as SVGLineElement[]) {
          const nx = Number(m.getAttribute('x1')) - ANCHO / (N - 1);
          if (nx < 0) m.remove();
          else { m.setAttribute('x1', String(nx)); m.setAttribute('x2', String(nx)); }
        }
        for (; pendientes > 0; pendientes--) {
          const l = document.createElementNS(SVG_NS, 'line');
          l.setAttribute('class', 'marca-proyecto');
          l.setAttribute('x1', String(ANCHO));
          l.setAttribute('x2', String(ANCHO));
          l.setAttribute('y1', '4');
          l.setAttribute('y2', String(BASE + 6));
          marcas.appendChild(l);
        }
      }
      dibujar();
    };
    gsap.ticker.add(tick);
    return () => { gsap.ticker.remove(tick); quitar(); };
  }, { scope: raiz });

  return (
    <figure className="registro">
      <svg ref={raiz} className="instrumento" viewBox={`0 0 ${ANCHO} ${ALTO}`} preserveAspectRatio="none" aria-hidden="true">
        <line className="eje" x1="0" y1={BASE + 8} x2={ANCHO} y2={BASE + 8} />
        <g className="marcas" />
        <polyline className="traza" fill="none" />
      </svg>
      <figcaption>{leyenda}</figcaption>
    </figure>
  );
}
