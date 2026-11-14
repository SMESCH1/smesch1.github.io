import { useEffect, useState } from 'react';
import { MotionConfig, motion } from 'motion/react';
import { Portada } from './Portada';
import type { Variante } from './Portada';
import type { Estilo } from './CarruselCompacto';
import { PROYECTOS } from './datos';
import { Cifra } from './Cifra';
import { Resaltado } from './Resaltado';
import type { ModoResaltado } from './Resaltado';

type Tema = 'tema-oscuro' | 'tema-claro';
const VARIANTES: [Variante, string][] = [['proyectos', 'Proyectos + cerebro'], ['cerebro', 'Cerebro vivo'], ['carrusel', 'Carrusel'], ['mapa', 'Mapa (anterior)']];
const ESTILOS: [Estilo, string][] = [['mazo', 'Mazo'], ['fila', 'Fila'], ['ficha', 'Ficha']];

function leer<T extends string>(clave: string, validos: readonly T[], porDefecto: T): T {
  const v = new URLSearchParams(window.location.search).get(clave) as T | null;
  return v && validos.includes(v) ? v : porDefecto;
}

/** Prototipo de las tres portadas. Se elige con ?portada=cerebro|carrusel|mapa y ?tema=oscuro|claro, o con el selector de abajo. */
export function PrototipoApp() {
  const [variante, setVariante] = useState<Variante>(() => leer('portada', ['proyectos', 'cerebro', 'carrusel', 'mapa'] as const, 'proyectos'));
  const [estilo, setEstilo] = useState<Estilo>(() => leer('estilo', ['mazo', 'fila', 'ficha'] as const, 'mazo'));
  const [registro, setRegistro] = useState(() => leer('registro', ['si', 'no'] as const, 'no') === 'si');
  const [semilla, setSemilla] = useState(() => leer('semilla', ['si', 'no'] as const, 'si') === 'si');
  const [resaltador, setResaltador] = useState<ModoResaltado>(() => leer('resaltador', ['recto', 'dibujado'] as const, 'recto'));
  const [movilSinCerebro, setMovilSinCerebro] = useState(() => leer('movil', ['cerebro', 'sin'] as const, 'cerebro') === 'sin');
  const [tema, setTema] = useState<Tema>(() => (leer('tema', ['oscuro', 'claro'] as const, 'oscuro') === 'claro' ? 'tema-claro' : 'tema-oscuro'));

  useEffect(() => {
    document.documentElement.className = tema;
    const url = new URL(window.location.href);
    url.searchParams.set('portada', variante);
    url.searchParams.set('tema', tema === 'tema-claro' ? 'claro' : 'oscuro');
    url.searchParams.set('estilo', estilo);
    url.searchParams.set('registro', registro ? 'si' : 'no');
    url.searchParams.set('movil', movilSinCerebro ? 'sin' : 'cerebro');
    url.searchParams.set('semilla', semilla ? 'si' : 'no');
    url.searchParams.set('resaltador', resaltador);
    window.history.replaceState(null, '', url);
  }, [variante, tema, estilo, registro, movilSinCerebro, semilla, resaltador]);

  const cambiarTema = () => setTema((t) => (t === 'tema-oscuro' ? 'tema-claro' : 'tema-oscuro'));

  return (
    // reducedMotion="user": Motion deja solo la opacidad si la persona pidió menos movimiento
    <MotionConfig reducedMotion="user">
      <nav className="nav">
        <div className="contenedor">
          <a className="nombre" href="#top">Sebastián Mesch Henriques</a>
          <ul>
            <li className="enlace"><a href="#projects">Projects</a></li>
            <li className="enlace"><a href="#research">Research</a></li>
            <li className="enlace"><a href="#about">About</a></li>
            <li className="enlace"><a href="#contact">Contact</a></li>
            <li className="en-menu"><button className="boton-chico" aria-label="Change language">EN · ES</button></li>
            <li className="en-menu">
              <button className="boton-chico" aria-label="Change theme" onClick={cambiarTema}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* key: al cambiar de variante, la portada se monta de nuevo y repite la entrada */}
      <Portada key={`${variante}-${estilo}-${registro}`} variante={variante} opciones={{ estilo, registro, movilSinCerebro, semilla }} />

      <main>
        <section className="seccion" id="projects">
          <div className="contenedor">
            <div className="seccion-cab">
              <h2 className="titulo">Featured <span className="clave">projects</span></h2>
            </div>
            <div className="proyectos">
              {PROYECTOS.map((p, i) => (
                <motion.article
                  key={p.id}
                  className="proyecto"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: (i % 2) * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
                >
                  <p className="temas">{p.temas}</p>
                  <h3>{p.titulo}{p.nota && <span className="nota"> ({p.nota})</span>}</h3>
                  <p className="desc">{p.desc}</p>
                  {p.cifra && <Cifra cifra={p.cifra} />}
                  <ul className="tech">{p.tech.map((t) => <li key={t}>{t}</li>)}</ul>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="seccion" id="about">
          <div className="contenedor">
            <div className="seccion-cab"><h2 className="titulo"><span className="clave">About</span></h2></div>
            <div className="sobre-texto" key={`${resaltador}-${tema}`}>
              <p>I'm a data scientist with an unusual background: I hold a degree in Psychology with a specialization in Neurosciences (Universidad Favaloro), and I'm completing a Master's in Artificial Intelligence at UdeSA. That combination shapes how I design products and research.</p>
              <p>My core interest is <Resaltado modo={resaltador}>AI for mental health</Resaltado>: using machine learning to make sense of brain signals, clinical data and behavioral patterns. I've co-authored indexed publications in neuroscience and behavioral science, and I teach AI for psychology and clinical settings.</p>
            </div>
          </div>
        </section>
      </main>

      <div className="selector" role="group" aria-label="Prototipo: portada y tema">
        <div className="fila-selector">
          {VARIANTES.map(([v, nombre]) => (
            <button key={v} aria-pressed={variante === v} onClick={() => setVariante(v)}>{nombre}</button>
          ))}
          <button onClick={cambiarTema}>{tema === 'tema-oscuro' ? 'Claro' : 'Oscuro'}</button>
        </div>
        {variante === 'proyectos' && (
          <div className="fila-selector">
            {ESTILOS.map(([e, nombre]) => (
              <button key={e} aria-pressed={estilo === e} onClick={() => setEstilo(e)}>{nombre}</button>
            ))}
            <button aria-pressed={semilla} onClick={() => setSemilla((v) => !v)}>Semilla</button>
            <button aria-pressed={registro} onClick={() => setRegistro((r) => !r)}>Registro</button>
            <button aria-pressed={resaltador === 'dibujado'} onClick={() => setResaltador((r) => (r === 'recto' ? 'dibujado' : 'recto'))}>Resaltador dibujado</button>
            <button aria-pressed={movilSinCerebro} onClick={() => setMovilSinCerebro((m) => !m)}>Celular sin cerebro</button>
          </div>
        )}
      </div>
    </MotionConfig>
  );
}
