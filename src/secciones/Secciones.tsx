import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { usePreferencias } from '../contexto/preferencias';
import { PROYECTOS } from '../contenido/proyectos';
import { CERTIFICACIONES, DOCENCIA, EDUCACION, EXPERIENCIA, PUBLICACIONES, STACK } from '../contenido/trayectoria';
import type { Entrada } from '../contenido/trayectoria';
import { Cifra, ConResaltado, Firma } from '../componentes/Textos';
import { SALIDA } from '../lib/animacion';

/** Entra al verse (una vez): sube 16 px y aparece. Con movimiento reducido, MotionConfig deja solo la opacidad. */
const aparecer = (retraso = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease: SALIDA, delay: retraso },
});

function Seccion({ id, titulo, bajada, extra, children }: {
  id: string; titulo: readonly [string, string, string]; bajada?: string; extra?: ReactNode; children: ReactNode;
}) {
  return (
    <section className="seccion" id={id} aria-labelledby={`titulo-${id}`}>
      <div className="contenedor">
        <motion.div className="seccion-cab" {...aparecer()}>
          <div>
            <h2 id={`titulo-${id}`} className="titulo"><Firma partes={titulo} /></h2>
            {bajada && <p className="bajada">{bajada}</p>}
          </div>
          {extra}
        </motion.div>
        {children}
      </div>
    </section>
  );
}

function Fechas({ e }: { e: Entrada }) {
  const { t } = usePreferencias();
  if (e.hasta === undefined) return <>{e.desde}</>;
  return <>{e.desde}–{e.hasta === null ? t.trayectoria.presente : e.hasta}</>;
}

function LineaDeTiempo({ entradas }: { entradas: Entrada[] }) {
  const { idioma } = usePreferencias();
  return (
    <ul className="linea-tiempo">
      {entradas.map((e, i) => (
        <motion.li key={e.titulo.en + e.lugar} className={e.actual ? 'actual' : undefined} {...aparecer(i * 0.05)}>
          <p className="lt-titulo">{e.titulo[idioma]}</p>
          <p className="lt-meta">{e.lugar} · <Fechas e={e} /></p>
          {e.desc && <p className="lt-desc">{e.desc[idioma]}</p>}
        </motion.li>
      ))}
    </ul>
  );
}

export function Proyectos() {
  const { t, idioma } = usePreferencias();
  return (
    <Seccion id="proyectos" titulo={t.proyectos.titulo}
      extra={<a className="enlace" href="https://github.com/SMESCH1?tab=repositories" target="_blank" rel="noopener noreferrer">{t.proyectos.todos}</a>}>
      <div className="proyectos">
        {PROYECTOS.map((p, i) => {
          const tx = p.textos[idioma];
          return (
            <motion.article key={p.id} className={`proyecto${i === 0 ? ' destacado' : ''}`} {...aparecer((i % 2) * 0.06)}>
              <p className="temas">{tx.temas}</p>
              <h3><a href={p.codigo} target="_blank" rel="noopener noreferrer">{tx.titulo}</a></h3>
              <p className="desc">{tx.desc}</p>
              {p.cifra && <Cifra valor={p.cifra.valor} decimales={p.cifra.decimales} rotulo={tx.cifra!} />}
              <ul className="tech">{p.tech.map((x) => <li key={x}>{x}</li>)}</ul>
              <div className="enlaces-card">
                <a className="enlace" href={p.codigo} target="_blank" rel="noopener noreferrer">{t.proyectos.codigo}</a>
                {p.demo && <a className="enlace" href={p.demo} target="_blank" rel="noopener noreferrer">{t.proyectos.demo}</a>}
              </div>
            </motion.article>
          );
        })}
      </div>
    </Seccion>
  );
}

export function Investigacion() {
  const { t, idioma } = usePreferencias();
  return (
    <Seccion id="investigacion" titulo={t.investigacion.titulo} bajada={t.investigacion.bajada}>
      <div className="dos-col">
        <div>
          <h3 className="sub">{t.investigacion.docencia}</h3>
          <LineaDeTiempo entradas={DOCENCIA} />
        </div>
        <div>
          <h3 className="sub">{t.investigacion.publicaciones}</h3>
          <ul className="pubs">
            {PUBLICACIONES.map((p, i) => {
              // Tipo y año; el título si no repite el tipo; la revista (STIX itálica) y el lugar. El enlace va en lo primero que nombra.
              const nombre = p.titulo[idioma] !== p.tipo[idioma] ? p.titulo[idioma] : null;
              const lugar = <>{p.revista && p.revista !== nombre && <><span className="revista">{p.revista}</span>, </>}{p.lugar}</>;
              const enlace = (contenido: ReactNode) => (p.url ? <a className="enlace" href={p.url} target="_blank" rel="noopener noreferrer">{contenido}</a> : contenido);
              return (
                <motion.li key={p.titulo.en + p.lugar} {...aparecer(i * 0.05)}>
                  <p className="pub-tipo">{p.tipo[idioma]} · {p.desde}</p>
                  {nombre && <p className="pub-titulo">{enlace(nombre)}</p>}
                  <p className="pub-lugar">{nombre ? lugar : enlace(lugar)}</p>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </Seccion>
  );
}

export function SobreMi() {
  const { t, idioma } = usePreferencias();
  return (
    <Seccion id="sobre" titulo={t.sobre.titulo}>
      <div className="sobre">
        <div className="sobre-texto">
          {t.sobre.parrafos.map((p, i) => <motion.p key={i} {...aparecer(i * 0.05)}><ConResaltado texto={p} /></motion.p>)}
        </div>
        <dl className="stack">
          {STACK.map((g) => (
            <div key={g.grupo.en}>
              <dt>{g.grupo[idioma]}</dt>
              <dd>{g.items.join(' · ')}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Seccion>
  );
}

export function Trayectoria() {
  const { t } = usePreferencias();
  return (
    <Seccion id="experiencia" titulo={t.trayectoria.titulo}>
      <div className="tres-col">
        <div><h3 className="sub">{t.trayectoria.experiencia}</h3><LineaDeTiempo entradas={EXPERIENCIA} /></div>
        <div><h3 className="sub">{t.trayectoria.formacion}</h3><LineaDeTiempo entradas={EDUCACION} /></div>
        <div><h3 className="sub">{t.trayectoria.certificaciones}</h3><LineaDeTiempo entradas={CERTIFICACIONES} /></div>
      </div>
    </Seccion>
  );
}

export function Contacto() {
  const { t } = usePreferencias();
  return (
    <Seccion id="contacto" titulo={t.contacto.titulo} bajada={t.contacto.bajada}>
      <div className="contacto">
        <dl className="datos">
          <dt>{t.contacto.email}</dt><dd><a className="enlace" href="mailto:lic.mesch@gmail.com">lic.mesch@gmail.com</a></dd>
          <dt>LinkedIn</dt><dd><a className="enlace" href="https://www.linkedin.com/in/sebasti%C3%A1n-mesch-henriques/" target="_blank" rel="noopener noreferrer">/in/sebastian-mesch-henriques</a></dd>
          <dt>GitHub</dt><dd><a className="enlace" href="https://github.com/SMESCH1" target="_blank" rel="noopener noreferrer">@SMESCH1</a></dd>
          <dt>{t.contacto.ubicacion}</dt><dd>{t.contacto.ubicacionValor}</dd>
        </dl>
        {/* El mismo servicio que el sitio anterior (FormSubmit), con su trampa para bots. */}
        <form className="formulario" action="https://formsubmit.co/lic.mesch@gmail.com" method="POST">
          <input type="hidden" name="_subject" value="Nuevo mensaje desde smesch1.github.io" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="text" name="_honey" className="trampa" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <div className="campo"><label htmlFor="f-nombre">{t.contacto.nombre}</label><input id="f-nombre" name="name" required autoComplete="name" maxLength={120} /></div>
          <div className="campo"><label htmlFor="f-email">{t.contacto.email}</label><input id="f-email" name="email" type="email" required autoComplete="email" maxLength={200} /></div>
          <div className="campo"><label htmlFor="f-mensaje">{t.contacto.mensaje}</label><textarea id="f-mensaje" name="message" required rows={5} maxLength={4000} /></div>
          <button className="boton principal" type="submit">{t.contacto.enviar}</button>
        </form>
      </div>
    </Seccion>
  );
}

export function Pie() {
  const { t } = usePreferencias();
  return <footer className="pie"><div className="contenedor"><span>{t.pie.derechos}</span><span>Buenos Aires</span></div></footer>;
}
