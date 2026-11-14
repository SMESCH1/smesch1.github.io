import { useRef } from 'react';
import type { ReactNode } from 'react';
import { DENDRITAS_CELULAR, DENDRITAS_ESCRITORIO, RED_CELULAR, RED_ESCRITORIO } from './fondos';
import type { Lienzo } from './fondos';
import { tiemposDeCrecimiento } from './crecimiento';
import { gsap, reducido, useGSAP } from '../lib/animacion';

const DURACION = 2.4; // s hasta que el trazo más lejano llega a su punta
const OPACIDAD = 0.24; // portada (gusto-visual, sección 6)

function Svg({ lienzo, clase, children }: { lienzo: Lienzo; clase: string; children: ReactNode }) {
  return (
    <svg className={clase} viewBox={`0 0 ${lienzo.ancho} ${lienzo.alto}`} preserveAspectRatio="xMaxYMin slice">
      {children}
    </svg>
  );
}

/** La marca de fondo de la portada (gusto-visual): dendritas en oscuro, red de nodos y aristas en claro, desde la
 *  esquina de arriba a la derecha. Crecen en forma lineal desde el origen hacia los bordes (corrección del 13/11/2026). */
export function Fondo() {
  const raiz = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (reducido()) {
      gsap.from(raiz.current, { opacity: 0, duration: 0.6 }); // reducido no es cero: aparece con un fundido
      return;
    }
    for (const svg of gsap.utils.toArray<SVGSVGElement>('svg', raiz.current)) {
      const trazos = gsap.utils.toArray<SVGElement>('[data-t0]', svg);
      const tiempos = tiemposDeCrecimiento(trazos.map((t) => ({ t0: Number(t.dataset.t0), largo: Number(t.dataset.largo ?? 0) })), DURACION);
      const tl = gsap.timeline({ defaults: { ease: 'none' } });
      trazos.forEach((t, i) => {
        if (t instanceof SVGCircleElement) {
          tl.from(t, { opacity: 0, scale: 0.6, transformOrigin: '50% 50%', duration: 0.25, ease: 'salida' }, tiempos[i].retraso);
        } else {
          tl.from(t, { drawSVG: 0, duration: tiempos[i].duracion }, tiempos[i].retraso);
        }
      });
    }
  }, { scope: raiz });

  return (
    <div className="fondo-marca" aria-hidden="true" ref={raiz}>
      {([['escritorio', DENDRITAS_ESCRITORIO], ['celular', DENDRITAS_CELULAR]] as const).map(([tam, d]) => (
        <Svg key={tam} lienzo={d} clase={`fondo-dendritas solo-${tam}`}>
          <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" opacity={OPACIDAD}>
            {d.ramas.map(([camino, grosor, t0, largo], i) => (
              <path key={i} d={camino} strokeWidth={Math.max(1, grosor)} data-t0={t0} data-largo={largo} />
            ))}
          </g>
        </Svg>
      ))}
      {([['escritorio', RED_ESCRITORIO], ['celular', RED_CELULAR]] as const).map(([tam, r]) => (
        <Svg key={tam} lienzo={r} clase={`fondo-red solo-${tam}`}>
          <g fill="none" stroke="currentColor" strokeLinecap="round" opacity={OPACIDAD}>
            {r.aristas.map(([x1, y1, x2, y2, grosor, t0, largo], i) => (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={grosor} data-t0={t0} data-largo={largo} />
            ))}
            <g fill="var(--fondo)">
              {r.nodos.map(([cx, cy, radio, grosor, t0], i) => (
                <circle key={i} cx={cx} cy={cy} r={radio} strokeWidth={grosor} data-t0={t0} data-largo={0} />
              ))}
            </g>
          </g>
        </Svg>
      ))}
    </div>
  );
}
