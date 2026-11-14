import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import type { Variants } from 'motion/react';
import { PROYECTOS } from './datos';
import { Cifra } from './Cifra';
import { reducido } from './animacion';

const ALTO = 22;    // cuánto asoma cada carta de atrás
const ESCALA = 0.05;
type Orden = { k: number; dir: number };

// La carta del frente sale de costado; la de atrás pasa adelante; una nueva entra al fondo del mazo.
const variantes: Variants = {
  entrar: ({ k, dir }: Orden) =>
    k === 0 && dir < 0 ? { x: -360, y: 0, scale: 1, opacity: 0, rotate: -3 } : { x: 0, y: 3 * ALTO, scale: 1 - 3 * ESCALA, opacity: 0 },
  estar: ({ k }: Orden) => ({ x: 0, y: k * ALTO, scale: 1 - k * ESCALA, opacity: 1, rotate: 0 }),
  salir: ({ dir }: Orden) =>
    dir > 0 ? { x: -360, opacity: 0, rotate: -3 } : { y: 3 * ALTO, scale: 1 - 3 * ESCALA, opacity: 0 },
};

/** Portada 2 · un mazo de proyectos que avanza solo cada 6 s, con flechas, puntos y arrastre (Motion). */
export function Carrusel() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const [pausado, setPausado] = useState(false);
  const n = PROYECTOS.length;
  const ir = (paso: number) => { setDir(paso); setI((v) => (v + paso + n) % n); };
  const visibles = [0, 1, 2].map((k) => PROYECTOS[(i + k) % n]);

  return (
    <div className={`carrusel${pausado ? ' pausado' : ''}`}
      onPointerEnter={() => setPausado(true)} onPointerLeave={() => setPausado(false)}>
      <div className="mazo">
        <AnimatePresence initial={false} custom={{ k: 0, dir }}>
          {visibles.map((p, k) => (
            <motion.article
              key={p.id}
              className="carta"
              data-frente={k === 0}
              style={{ zIndex: 3 - k }}
              custom={{ k, dir }}
              variants={variantes}
              initial="entrar"
              animate="estar"
              exit="salir"
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
              drag={k === 0 ? 'x' : false}
              dragSnapToOrigin
              dragElastic={0.5}
              onDragEnd={(_, info) => {
                if (info.offset.x < -90 || info.velocity.x < -500) ir(1);
                else if (info.offset.x > 90 || info.velocity.x > 500) ir(-1);
              }}
              aria-hidden={k !== 0}
            >
              <p className="temas">{p.temas}</p>
              <h3>
                <a href={p.codigo} draggable={false}>{p.titulo}</a>
                {p.nota && <span className="nota"> ({p.nota})</span>}
              </h3>
              <p className="desc">{p.desc}</p>
              {p.cifra && k === 0 && <Cifra cifra={p.cifra} />}
              <ul className="tech">{p.tech.map((t) => <li key={t}>{t}</li>)}</ul>
              <div className="enlaces-card">
                <a href={p.codigo} draggable={false}>Code</a>
                {p.demo && <a href={p.demo} draggable={false}>Live demo</a>}
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
      <div className="controles">
        <button className="flecha" aria-label="Previous project" onClick={() => ir(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <button className="flecha" aria-label="Next project" onClick={() => ir(1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 6l6 6-6 6" /></svg>
        </button>
        <div className="progreso-pista" aria-hidden="true">
          {!reducido() && <div key={i} className="progreso" onAnimationEnd={() => ir(1)} />}
        </div>
        <div className="puntos">
          {PROYECTOS.map((p, j) => (
            <button key={p.id} aria-label={p.titulo} aria-current={j === i} onClick={() => ir(j - i)} />
          ))}
        </div>
      </div>
    </div>
  );
}
