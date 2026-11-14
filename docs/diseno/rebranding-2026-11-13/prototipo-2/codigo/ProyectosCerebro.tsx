import { useState } from 'react';
import { PROYECTOS } from './datos';
import { CarruselCompacto } from './CarruselCompacto';
import type { Estilo } from './CarruselCompacto';
import { CerebroInteractivo } from './CerebroInteractivo';
import { Registro } from './Registro';

interface Props { estilo: Estilo; registro: boolean; semilla: boolean }

/** Portada 4 · "My projects": el carrusel arriba (alto fijo) y el cerebro abajo, sincronizados.
 *  El carrusel avanza solo (6 s) salvo con el cursor o el foco adentro; tocar un nodo lleva a su proyecto. */
export function ProyectosCerebro({ estilo, registro, semilla }: Props) {
  const [activo, setActivo] = useState(0);
  const [dir, setDir] = useState(1);
  const [pausado, setPausado] = useState(false);
  const n = PROYECTOS.length;

  const ir = (paso: number) => { setDir(paso >= 0 ? 1 : -1); setActivo((i) => (i + paso + n) % n); };
  const elegir = (i: number) => { setDir(i >= activo ? 1 : -1); setActivo(i); };

  return (
    <section
      className={`lado-proyectos${pausado ? ' pausado' : ''}${registro ? ' con-registro' : ''}`}
      aria-label="My projects"
      onPointerEnter={() => setPausado(true)}
      onPointerLeave={() => setPausado(false)}
      onFocus={() => setPausado(true)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setPausado(false); }}
    >
      <div className="lado-cab">
        <h2 className="titulo lado-titulo">My <span className="clave">projects</span></h2>
      </div>
      <CarruselCompacto activo={activo} dir={dir} estilo={estilo} onIr={ir} />
      <div className="lado-cerebro">
        <CerebroInteractivo activo={activo} onElegir={elegir} semilla={semilla} />
        {registro && <Registro />}
        <p className="nota-mapa">Tap a node to open its project. A playful map, not exact anatomy.</p>
      </div>
    </section>
  );
}
