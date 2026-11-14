import { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { usePreferencias } from '../contexto/preferencias';
import { PROYECTOS } from '../contenido/proyectos';
import { Cifra } from './Textos';
import { SALIDA, reducido } from '../lib/animacion';

interface Props {
  activo: number;
  onIr: (paso: number) => void;
  /** Avance automático en pausa (cursor o foco adentro, o la portada fuera de pantalla). */
  pausado: boolean;
  /** true después de que la persona tocó algo: recién ahí se anuncian los cambios a los lectores de pantalla. */
  anunciar: boolean;
}

const ANCHO_CARTA = 0.88; // la siguiente asoma a la derecha
const ESPACIO = 14;

/** Carrusel de proyectos en fila, de alto fijo (el texto se corta para que el cerebro de abajo no se mueva).
 *  Avanza solo cada 6 s; se desliza arrastrando o con las flechas. */
export function CarruselFila({ activo, onIr, pausado, anunciar }: Props) {
  const { t, idioma } = usePreferencias();
  const marco = useRef<HTMLDivElement>(null);
  const [ancho, setAncho] = useState(0);
  const quieto = reducido();
  const n = PROYECTOS.length;

  useLayoutEffect(() => {
    const el = marco.current!;
    const ro = new ResizeObserver(() => setAncho(el.clientWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className={`carrusel${pausado ? ' pausado' : ''}`} role="group" aria-roledescription="carousel" aria-label={t.misProyectos.titulo.join('')}>
      <div className="marco" ref={marco} aria-live={anunciar ? 'polite' : 'off'}>
        <motion.div
          className="pista"
          animate={{ x: -activo * (ancho * ANCHO_CARTA + ESPACIO) }}
          transition={quieto ? { duration: 0 } : { duration: 0.35, ease: SALIDA }}
          drag="x"
          dragSnapToOrigin
          dragElastic={0.4}
          onDragEnd={(_, info) => {
            if (info.offset.x < -70 || info.velocity.x < -450) onIr(1);
            else if (info.offset.x > 70 || info.velocity.x > 450) onIr(-1);
          }}
        >
          {PROYECTOS.map((p, i) => {
            const tx = p.textos[idioma];
            const frente = i === activo;
            return (
              <article key={p.id} className="carta" data-frente={frente} aria-hidden={!frente}
                aria-roledescription="slide" aria-label={`${i + 1} / ${n}`}>
                <p className="region-carta">{tx.region}</p>
                <h3><a href={p.codigo} draggable={false} tabIndex={frente ? 0 : -1}>{tx.titulo}</a></h3>
                <p className="desc">{tx.desc}</p>
                <div className="pie-carta">
                  {p.cifra && frente ? <Cifra valor={p.cifra.valor} decimales={p.cifra.decimales} rotulo={tx.cifra!} /> : <span />}
                  <a className="enlace" href={p.codigo} draggable={false} tabIndex={frente ? 0 : -1}>{t.proyectos.codigo}</a>
                </div>
              </article>
            );
          })}
        </motion.div>
      </div>
      <div className="controles">
        <button className="flecha" aria-label={t.misProyectos.anterior} onClick={() => onIr(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <button className="flecha" aria-label={t.misProyectos.siguiente} onClick={() => onIr(1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
        </button>
        <div className="progreso-pista" aria-hidden="true">
          {!quieto && <div key={activo} className="progreso" onAnimationEnd={() => onIr(1)} />}
        </div>
        <span className="contador" aria-hidden="true">{activo + 1} / {n}</span>
      </div>
    </div>
  );
}
