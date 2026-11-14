import { useRef } from 'react';
import type { ReactNode } from 'react';
import { useInView } from 'motion/react';
import { NumberTicker } from '@/components/ui/number-ticker';
import { partirResaltado } from '../lib/resaltado';

/** Un título con firma (gusto-visual): [antes, palabra clave en cobalto y subrayada, después]. */
export function Firma({ partes }: { partes: readonly [string, string, string] }) {
  return <>{partes[0]}<span className="clave">{partes[1]}</span>{partes[2]}</>;
}

/** El resaltador recto: un bloque sol que se extiende de izquierda a derecha la primera vez que se ve.
 *  En oscuro, como manda el gusto, la palabra en sol y en negrita, sin bloque. */
export function Resaltado({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const visto = useInView(ref, { once: true, margin: '-15% 0px' });
  return <span ref={ref} className={`resaltado${visto ? ' visto' : ''}`}>{children}</span>;
}

/** Un párrafo donde `==así==` se resalta. */
export function ConResaltado({ texto }: { texto: string }) {
  return <>{partirResaltado(texto).map((p, i) => (p.resaltado ? <Resaltado key={i}>{p.texto}</Resaltado> : p.texto))}</>;
}

/** Una cifra en cobalto que cuenta desde 0 la primera vez que se ve (NumberTicker de Magic UI, adaptado). */
export function Cifra({ valor, decimales, rotulo }: { valor: number; decimales: number; rotulo: string }) {
  return (
    <p className="cifra">
      <NumberTicker className="num" value={valor} decimalPlaces={decimales} />
      <span className="lbl">{rotulo}</span>
    </p>
  );
}
