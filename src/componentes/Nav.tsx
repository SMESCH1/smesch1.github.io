import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { usePreferencias } from '../contexto/preferencias';
import { SALIDA } from '../lib/animacion';

const SECCIONES = ['proyectos', 'investigacion', 'sobre', 'experiencia', 'contacto'] as const;

/** La sección que ocupa la franja central de la pantalla, para marcarla en la navegación. */
function useSeccionActiva() {
  const [activa, setActiva] = useState<string | null>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entradas) => { for (const e of entradas) if (e.isIntersecting) setActiva(e.target.id); },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    for (const id of SECCIONES) { const el = document.getElementById(id); if (el) obs.observe(el); }
    return () => obs.disconnect();
  }, []);
  return activa;
}

function IconoTema({ oscuro }: { oscuro: boolean }) {
  return oscuro ? (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
  );
}

export function Nav() {
  const { t, tema, cambiarTema, cambiarIdioma } = usePreferencias();
  const activa = useSeccionActiva();
  const [abierto, setAbierto] = useState(false);
  const boton = useRef<HTMLButtonElement>(null);

  // Escape cierra el menú y devuelve el foco al botón.
  useEffect(() => {
    if (!abierto) return;
    const tecla = (e: KeyboardEvent) => { if (e.key === 'Escape') { setAbierto(false); boton.current?.focus(); } };
    window.addEventListener('keydown', tecla);
    return () => window.removeEventListener('keydown', tecla);
  }, [abierto]);

  const enlaces = SECCIONES.map((id) => (
    <li key={id}>
      <a href={`#${id}`} aria-current={activa === id ? 'true' : undefined} onClick={() => setAbierto(false)}>{t.nav[id]}</a>
    </li>
  ));
  const ajustes = (
    <>
      <button className="boton-chico" onClick={cambiarIdioma} aria-label={t.idioma.etiqueta}>{t.idioma.boton}</button>
      <button className="boton-chico" onClick={cambiarTema} aria-label={tema === 'oscuro' ? t.tema.aClaro : t.tema.aOscuro}>
        <IconoTema oscuro={tema === 'oscuro'} />
      </button>
    </>
  );

  return (
    <nav className="nav" aria-label="Main">
      <div className="contenedor">
        <a className="nombre" href="#top">Sebastián Mesch Henriques</a>
        <ul className="enlaces-escritorio">{enlaces}</ul>
        <div className="ajustes-escritorio">{ajustes}</div>
        <button ref={boton} className="boton-chico boton-menu" aria-expanded={abierto} aria-controls="menu-celular"
          aria-label={abierto ? t.nav.cerrar : t.nav.menu} onClick={() => setAbierto((a) => !a)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {abierto ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>
      <AnimatePresence>
        {abierto && (
          <motion.div id="menu-celular" className="menu-celular"
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: SALIDA }}>
            <ul>{enlaces}</ul>
            <div className="ajustes-celular">{ajustes}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
