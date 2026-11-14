import { useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import type { Variants } from 'motion/react';
import { PROYECTOS } from './datos';
import type { Proyecto } from './datos';
import { Cifra } from './Cifra';
import { SALIDA, reducido } from './animacion';

export type Estilo = 'mazo' | 'fila' | 'ficha';

interface Props {
  activo: number;
  dir: number;
  estilo: Estilo;
  onIr: (paso: number) => void;
}

/** El contenido de una carta. Alto fijo: la región, el título y dos líneas de bajada; lo que sobra se corta. */
function Carta({ p, frente }: { p: Proyecto; frente: boolean }) {
  return (
    <>
      <p className="region-carta">{p.region!.nombre}</p>
      <h3><a href={p.codigo} draggable={false} tabIndex={frente ? 0 : -1}>{p.titulo}</a>{p.nota && <span className="nota"> ({p.nota})</span>}</h3>
      <p className="desc">{p.desc}</p>
      <div className="pie-carta">
        {p.cifra && frente ? <Cifra cifra={p.cifra} /> : <span />}
        <a className="enlace-codigo" href={p.codigo} draggable={false} tabIndex={frente ? 0 : -1}>Code</a>
      </div>
    </>
  );
}

const SALTO = 12; // cuánto asoman las cartas de atrás en el mazo
const ESC = 0.04;
type Orden = { k: number; dir: number };
const mazo: Variants = {
  entrar: ({ k, dir }: Orden) => (k === 0 && dir < 0 ? { x: -300, y: 0, scale: 1, opacity: 0 } : { x: 0, y: 3 * SALTO, scale: 1 - 3 * ESC, opacity: 0 }),
  estar: ({ k }: Orden) => ({ x: 0, y: k * SALTO, scale: 1 - k * ESC, opacity: 1 }),
  salir: ({ dir }: Orden) => (dir > 0 ? { x: -300, opacity: 0 } : { y: 3 * SALTO, scale: 1 - 3 * ESC, opacity: 0 }),
};
const RESORTE = { type: 'spring', duration: 0.45, bounce: 0.12 } as const;
const arrastre = (onIr: (p: number) => void) => ({
  drag: 'x' as const,
  dragSnapToOrigin: true,
  dragElastic: 0.4,
  onDragEnd: (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    if (info.offset.x < -70 || info.velocity.x < -450) onIr(1);
    else if (info.offset.x > 70 || info.velocity.x > 450) onIr(-1);
  },
});

/** Carrusel de proyectos de alto fijo, en tres estilos para comparar. */
export function CarruselCompacto({ activo, dir, estilo, onIr }: Props) {
  const n = PROYECTOS.length;
  const quieto = reducido();
  const marcoRef = useRef<HTMLDivElement>(null);
  const [ancho, setAncho] = useState(0);
  useLayoutEffect(() => {
    const el = marcoRef.current!;
    const ro = new ResizeObserver(() => setAncho(el.clientWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  let marco;
  if (estilo === 'mazo') {
    const visibles = [0, 1, 2].map((k) => PROYECTOS[(activo + k) % n]);
    marco = (
      <AnimatePresence initial={false} custom={{ k: 0, dir }}>
        {visibles.map((p, k) => (
          <motion.article key={p.id} className="carta-c" data-frente={k === 0} style={{ zIndex: 3 - k }}
            custom={{ k, dir }} variants={mazo} initial="entrar" animate="estar" exit="salir"
            transition={quieto ? { duration: 0 } : RESORTE} aria-hidden={k !== 0}
            {...(k === 0 ? arrastre(onIr) : {})}>
            <Carta p={p} frente={k === 0} />
          </motion.article>
        ))}
      </AnimatePresence>
    );
  } else if (estilo === 'fila') {
    // Una fila con la carta siguiente asomando a la derecha; la fila entera se desliza.
    marco = (
      <motion.div className="fila-pista" animate={{ x: -activo * (ancho * 0.88 + 14) }}
        transition={quieto ? { duration: 0 } : { duration: 0.35, ease: SALIDA }} {...arrastre(onIr)}>
        {PROYECTOS.map((p, i) => (
          <article key={p.id} className="carta-c" data-frente={i === activo} aria-hidden={i !== activo}>
            <Carta p={p} frente={i === activo} />
          </article>
        ))}
      </motion.div>
    );
  } else {
    // Una sola ficha fija: el contenido se funde (sale rápido, entra un poco más lento).
    const p = PROYECTOS[activo];
    marco = (
      <article className="carta-c" data-frente="true">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={p.id} className="carta-contenido"
            initial={{ opacity: 0, y: 6, filter: 'blur(3px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: quieto ? 0 : 0.24, ease: SALIDA } }}
            exit={{ opacity: 0, y: -4, filter: 'blur(2px)', transition: { duration: quieto ? 0 : 0.14, ease: SALIDA } }}>
            <Carta p={p} frente />
          </motion.div>
        </AnimatePresence>
      </article>
    );
  }

  return (
    <div className={`carrusel-c estilo-${estilo}`}>
      <div className="marco-c" ref={marcoRef} aria-live="polite">{marco}</div>
      <div className="controles">
        <button className="flecha" aria-label="Previous project" onClick={() => onIr(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <button className="flecha" aria-label="Next project" onClick={() => onIr(1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 6l6 6-6 6" /></svg>
        </button>
        <div className="progreso-pista" aria-hidden="true">
          {!quieto && <div key={activo} className="progreso" onAnimationEnd={() => onIr(1)} />}
        </div>
        <span className="contador">{activo + 1} / {n}</span>
      </div>
    </div>
  );
}
