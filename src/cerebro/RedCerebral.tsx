import type { ReactNode, Ref } from 'react';
import { ARISTAS, HUBS, NODOS, VB, par, radio } from './grafo';

interface Props {
  ref?: Ref<SVGSVGElement>;
  etiqueta: string;
  children?: ReactNode;
}

/** El cerebro de nodos, sin animación: aristas en el color del texto y los tres hubs en cobalto (la firma). */
export function RedCerebral({ ref, etiqueta, children }: Props) {
  return (
    <svg ref={ref} className="cerebro" viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`} role="img" aria-label={etiqueta}>
      <g className="aristas">
        {ARISTAS.map(([a, b, w]) => (
          <line
            key={par(a, b)}
            className="arista"
            data-par={par(a, b)}
            x1={NODOS[a][0]} y1={NODOS[a][1]} x2={NODOS[b][0]} y2={NODOS[b][1]}
            strokeWidth={w}
            strokeOpacity={+(0.3 + (w - 0.95) * 0.35).toFixed(2)}
          />
        ))}
      </g>
      <g className="nodos">
        {Object.entries(NODOS).map(([id, [x, y]]) => (
          <circle key={id} data-id={id} className={HUBS.includes(id) ? 'hub' : 'nodo'} cx={x} cy={y} r={radio(id)} />
        ))}
      </g>
      {children}
    </svg>
  );
}
