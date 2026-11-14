import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { TEXTOS } from '../contenido/textos';
import type { Textos } from '../contenido/textos';
import { almacenLocal, guardarPreferencia, idiomaInicial, leerPreferencia, temaInicial } from '../lib/preferencias';
import type { Idioma, Tema } from '../lib/preferencias';

interface Preferencias {
  idioma: Idioma;
  t: Textos;
  cambiarIdioma: () => void;
  tema: Tema;
  cambiarTema: () => void;
}

const Contexto = createContext<Preferencias | null>(null);

/** Idioma y tema de quien visita: lo guardado o, si no hay, lo del sistema. Se reflejan en <html> (lang y clase). */
export function ProveedorPreferencias({ children }: { children: ReactNode }) {
  const [idioma, setIdioma] = useState<Idioma>(() =>
    idiomaInicial(leerPreferencia(almacenLocal(), 'idioma', ['en', 'es'] as const), navigator.language));
  const [tema, setTema] = useState<Tema>(() =>
    temaInicial(leerPreferencia(almacenLocal(), 'tema', ['claro', 'oscuro'] as const), window.matchMedia('(prefers-color-scheme: dark)').matches));

  useEffect(() => {
    document.documentElement.lang = idioma;
  }, [idioma]);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle('tema-oscuro', tema === 'oscuro');
    html.classList.toggle('tema-claro', tema === 'claro');
  }, [tema]);

  const valor: Preferencias = {
    idioma,
    t: TEXTOS[idioma],
    tema,
    cambiarIdioma: () => {
      const nuevo = idioma === 'en' ? 'es' : 'en';
      guardarPreferencia(almacenLocal(), 'idioma', nuevo);
      setIdioma(nuevo);
    },
    cambiarTema: () => {
      const nuevo = tema === 'oscuro' ? 'claro' : 'oscuro';
      guardarPreferencia(almacenLocal(), 'tema', nuevo);
      setTema(nuevo);
    },
  };
  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePreferencias() {
  const p = useContext(Contexto);
  if (!p) throw new Error('usePreferencias va adentro de <ProveedorPreferencias>');
  return p;
}
