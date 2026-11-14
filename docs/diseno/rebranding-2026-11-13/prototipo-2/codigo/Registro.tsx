import { useRef } from 'react';
import { escucharPulsos } from './senales';
import { gsap, reducido, useGSAP } from './animacion';

const N = 160;          // muestras en pantalla
const ANCHO = 400;
const ALTO = 56;
const BASE = 44;        // y de la línea de base
const PASO = 1 / 30;    // s por muestra

/** Variación "registro": una tira tipo EEG debajo del cerebro. Cada señal que llega a un nodo deja un pico;
 *  la del proyecto, además, una marca en cobalto. Es ilustrativa (gusto-visual: un esquema dice que no es dato). */
export function Registro() {
  const raiz = useRef<SVGSVGElement>(null);

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
    const pendientes: number[] = [];
    const quitar = escucharPulsos((fuerza, proyecto) => {
      energia = Math.min(1.2, energia + fuerza);
      if (proyecto) pendientes.push(0);
    });
    const tick = (_t: number, dt: number) => {
      acumulado += dt / 1000;
      while (acumulado >= PASO) {
        acumulado -= PASO;
        fase += 0.9;
        // ruido de fondo chico + la energía de los pulsos, que se disipa rápido y oscila
        const ruido = (Math.random() - 0.5) * 0.06;
        valores.push(energia * Math.sin(fase) + ruido);
        valores.shift();
        energia *= 0.8;
        // las marcas de proyecto corren con la traza
        for (const m of Array.from(marcas.children) as SVGLineElement[]) {
          const nx = Number(m.getAttribute('x1')) - ANCHO / (N - 1);
          if (nx < 0) m.remove();
          else { m.setAttribute('x1', String(nx)); m.setAttribute('x2', String(nx)); }
        }
        while (pendientes.length) {
          pendientes.pop();
          const l = document.createElementNS('http://www.w3.org/2000/svg', 'line');
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
      <figcaption>activity · illustrative, not recorded data</figcaption>
    </figure>
  );
}
