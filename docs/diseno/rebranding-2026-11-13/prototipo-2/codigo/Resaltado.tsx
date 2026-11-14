import { useRef } from 'react';
import type { ReactNode } from 'react';
import { useInView } from 'motion/react';
import { Highlighter } from '@/components/ui/highlighter';

export type ModoResaltado = 'recto' | 'dibujado';

/** El resaltador de gusto-visual (uno o dos por pieza), animado al entrar en pantalla.
 *  - recto: bloque sol que se extiende de izquierda a derecha (CSS), del 24 % al 88 % de la línea, como en tokens.css.
 *  - dibujado: el Highlighter de Magic UI (rough-notation), trazo a mano.
 *  En oscuro, los dos quedan como manda el gusto: la palabra en sol y en negrita, sin bloque. */
export function Resaltado({ modo, children }: { modo: ModoResaltado; children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const visto = useInView(ref, { once: true, margin: '-15% 0px' });
  const oscuro = document.documentElement.classList.contains('tema-oscuro');

  if (modo === 'dibujado' && !oscuro) {
    return (
      <span className="resaltado-dibujado">
        <Highlighter action="highlight" color="#FFD830" iterations={1} padding={3} animationDuration={700} isView>
          {children}
        </Highlighter>
      </span>
    );
  }
  return <span ref={ref} className={`resaltado-recto${visto ? ' visto' : ''}`}>{children}</span>;
}
