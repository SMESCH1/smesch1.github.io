import { useRef } from 'react';
import { usePreferencias } from '../contexto/preferencias';
import { Fondo } from '../fondo/Fondo';
import { ProyectosCerebro } from './ProyectosCerebro';
import { Firma } from './Textos';
import { SplitText, gsap, reducido, useGSAP } from '../lib/animacion';

/** La portada: el nombre y la presentación a la izquierda; "My projects" (carrusel y cerebro) a la derecha. */
export function Portada() {
  const { t } = usePreferencias();
  const raiz = useRef<HTMLElement>(null);

  // Entrada (una vez por visita): el nombre sube línea por línea detrás de una máscara; el resto, escalonado.
  useGSAP(() => {
    if (reducido()) return;
    SplitText.create('.nombre-grande', {
      type: 'lines', mask: 'lines', autoSplit: true, aria: 'auto',
      onSplit: (self) => gsap.from(self.lines, { yPercent: 105, duration: 0.9, ease: 'salida', stagger: 0.08 }),
    });
    gsap.from(['.roles', '.frase', '.bajada-portada', '.acciones', '.redes'], { y: 16, opacity: 0, duration: 0.7, ease: 'salida', stagger: 0.06, delay: 0.3 });
  }, { scope: raiz });

  return (
    <header className="portada" id="top" ref={raiz}>
      <Fondo />
      <div className="contenedor">
        <div className="presentacion">
          <p className="roles">{t.portada.roles}</p>
          <h1 className="titulo nombre-grande">Sebastián<br />Mesch Henriques</h1>
          <p className="titulo frase"><Firma partes={t.portada.frase} /></p>
          <p className="bajada-portada">{t.portada.bajada}</p>
          <div className="acciones">
            <a className="boton principal" href="#proyectos">{t.portada.verProyectos}</a>
            <a className="boton borde" href="#investigacion">{t.portada.verInvestigacion}</a>
            <a className="boton borde" href="#contacto">{t.portada.contacto}</a>
          </div>
          <div className="redes">
            <a href="https://github.com/SMESCH1" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/sebasti%C3%A1n-mesch-henriques/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <span>{t.portada.ubicacion}</span>
          </div>
        </div>
        <ProyectosCerebro />
      </div>
    </header>
  );
}
