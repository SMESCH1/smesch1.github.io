import { useRef, useState } from 'react';
import { useInView } from 'motion/react';
import { usePreferencias } from '../contexto/preferencias';
import { PROYECTOS } from '../contenido/proyectos';
import { CarruselFila } from './CarruselFila';
import { Firma } from './Textos';
import { CerebroInteractivo } from '../cerebro/CerebroInteractivo';
import { Registro } from '../cerebro/Registro';

/** "My projects" en la portada: el carrusel arriba (alto fijo) y el cerebro abajo, sincronizados.
 *  Avanza solo salvo con el cursor o el foco adentro, o con la portada fuera de pantalla. */
export function ProyectosCerebro() {
  const { t, idioma } = usePreferencias();
  const raiz = useRef<HTMLElement>(null);
  const enPantalla = useInView(raiz, { margin: '-10% 0px' });
  const [activo, setActivo] = useState(0);
  const [encima, setEncima] = useState(false);
  const [toco, setToco] = useState(false); // la persona ya interactuó: se anuncian los cambios
  const n = PROYECTOS.length;

  const ir = (paso: number) => setActivo((i) => (i + paso + n) % n);
  const elegir = (i: number) => { setToco(true); setActivo(i); };
  const nodos = PROYECTOS.map((p) => ({ nodo: p.nodo, titulo: p.textos[idioma].titulo, region: p.textos[idioma].region }));

  return (
    <section
      ref={raiz}
      className="lado-proyectos"
      aria-labelledby="titulo-mis-proyectos"
      onPointerEnter={() => setEncima(true)}
      onPointerLeave={() => setEncima(false)}
      onFocus={() => { setEncima(true); setToco(true); }}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setEncima(false); }}
    >
      <h2 id="titulo-mis-proyectos" className="titulo lado-titulo"><Firma partes={t.misProyectos.titulo} /></h2>
      <CarruselFila activo={activo} onIr={(p) => { if (encima) setToco(true); ir(p); }} pausado={encima || !enPantalla} anunciar={toco} />
      <div className="lado-cerebro">
        <CerebroInteractivo proyectos={nodos} activo={activo} onElegir={elegir} etiqueta={t.misProyectos.cerebro} enPantalla={enPantalla} />
        <Registro leyenda={t.misProyectos.registro} enPantalla={enPantalla} />
        <p className="nota-mapa">{t.misProyectos.nota}</p>
      </div>
    </section>
  );
}
