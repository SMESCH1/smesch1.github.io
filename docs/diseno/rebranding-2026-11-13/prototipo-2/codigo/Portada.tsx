import { useRef } from 'react';
import { CerebroVivo } from './CerebroVivo';
import { Carrusel } from './Carrusel';
import { MapaCerebral } from './MapaCerebral';
import { Fondo } from './Fondo';
import { ProyectosCerebro } from './ProyectosCerebro';
import type { Estilo } from './CarruselCompacto';
import { SplitText, gsap, reducido, useGSAP } from './animacion';

export type Variante = 'proyectos' | 'cerebro' | 'carrusel' | 'mapa';
export interface Opciones { estilo: Estilo; registro: boolean; movilSinCerebro: boolean; semilla: boolean }

/** La portada: texto a la izquierda (igual en las tres) y, a la derecha, la variante que se prueba. */
export function Portada({ variante, opciones }: { variante: Variante; opciones: Opciones }) {
  const raiz = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (reducido()) return;
    // El nombre sube línea por línea, detrás de una máscara (SplitText).
    SplitText.create('.nombre-grande', {
      type: 'lines', mask: 'lines', autoSplit: true,
      onSplit: (self) => gsap.from(self.lines, { yPercent: 105, duration: 0.9, ease: 'salida', stagger: 0.08 }),
    });
    gsap.from(['.roles', '.frase', '.bajada-portada', '.acciones', '.redes'],
      { y: 16, opacity: 0, duration: 0.7, ease: 'salida', stagger: 0.06, delay: 0.3 });
  }, { scope: raiz });

  return (
    <header className={`portada portada-${variante}${opciones.movilSinCerebro ? ' movil-sin-cerebro' : ''}`} id="top" ref={raiz}>
      <Fondo />
      <div className="contenedor">
        <div>
          <p className="roles">AI engineer · Data scientist · Neuroscientist</p>
          <h1 className="titulo nombre-grande">Sebastián<br />Mesch Henriques</h1>
          <p className="titulo frase">Bridging cognitive <span className="clave">neuroscience</span> and deep learning</p>
          <p className="bajada-portada">
            Licensed psychologist and data scientist. Academic Coordinator at Humai, researcher at Universidad Favaloro and MSc in AI student at UdeSA.
          </p>
          <div className="acciones">
            <a className="boton principal" href="#projects">See projects</a>
            <a className="boton borde" href="#research">Research</a>
            <a className="boton borde" href="#contact">Contact</a>
          </div>
          <div className="redes">
            <a href="https://github.com/SMESCH1">GitHub</a>
            <a href="https://www.linkedin.com/in/sebasti%C3%A1n-mesch-henriques/">LinkedIn</a>
            <span>Buenos Aires, open to remote</span>
          </div>
        </div>
        <div className="lado">
          {variante === 'proyectos' && <ProyectosCerebro estilo={opciones.estilo} registro={opciones.registro} semilla={opciones.semilla} />}
          {variante === 'cerebro' && <CerebroVivo />}
          {variante === 'carrusel' && <Carrusel />}
          {variante === 'mapa' && <MapaCerebral />}
        </div>
      </div>
    </header>
  );
}
