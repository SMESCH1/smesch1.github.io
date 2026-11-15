import { describe, expect, test } from 'vitest';
import { TEXTOS } from './textos';
import { PROYECTOS } from './proyectos';
import { CERTIFICACIONES, DOCENCIA, EDUCACION, EXPERIENCIA, PUBLICACIONES, STACK } from './trayectoria';
import { NODOS } from '../cerebro/grafo';

/** Todas las rutas de hojas de un objeto (a.b.0.c) con su valor. */
function hojas(o: unknown, ruta = ''): [string, unknown][] {
  if (o && typeof o === 'object') return Object.entries(o).flatMap(([k, v]) => hojas(v, ruta ? `${ruta}.${k}` : k));
  return [[ruta, o]];
}

describe('textos de la interfaz', () => {
  test('inglés y español tienen exactamente las mismas claves', () => {
    expect(hojas(TEXTOS.es).map(([k]) => k).sort()).toEqual(hojas(TEXTOS.en).map(([k]) => k).sort());
  });
  test('no hay textos vacíos (en un título con firma, lo de antes y después puede faltar; la palabra clave no)', () => {
    const borde = /\.(titulo|frase)\.(0|2)$/;
    for (const idioma of ['en', 'es'] as const) {
      for (const [k, v] of hojas(TEXTOS[idioma])) {
        if (borde.test(k)) continue;
        expect(String(v).trim(), `${idioma}.${k}`).not.toBe('');
      }
    }
  });
});

describe('proyectos', () => {
  test('cada proyecto tiene sus textos en los dos idiomas', () => {
    for (const p of PROYECTOS) {
      for (const idioma of ['en', 'es'] as const) {
        const t = p.textos[idioma];
        for (const campo of ['temas', 'titulo', 'desc', 'region'] as const) expect(t[campo].trim(), `${p.id}.${idioma}.${campo}`).not.toBe('');
        if (p.cifra) expect(t.cifra?.trim(), `${p.id}.${idioma}.cifra`).toBeTruthy();
      }
    }
  });
  test('cada proyecto apunta a un nodo del cerebro que existe, y no se repiten', () => {
    const nodos = PROYECTOS.map((p) => p.nodo);
    for (const n of nodos) expect(NODOS, n).toHaveProperty(n);
    expect(new Set(nodos).size).toBe(nodos.length);
  });
  test('los enlaces al código son de GitHub (un proyecto sin enlace es de un repo privado)', () => {
    for (const p of PROYECTOS) if (p.codigo !== undefined) expect(p.codigo).toMatch(/^https:\/\/github\.com\/SMESCH1\//);
  });
  test('mi-amigo-el-fit está en el hipotálamo y no enlaza a su repo, que es privado (sería un 404)', () => {
    const fit = PROYECTOS.find((p) => p.id === 'fit');
    expect(fit?.nodo).toBe('B2');
    expect(fit).not.toHaveProperty('codigo');
  });
});

describe('trayectoria', () => {
  test('todas las entradas tienen título en los dos idiomas', () => {
    for (const lista of [DOCENCIA, PUBLICACIONES, EXPERIENCIA, EDUCACION, CERTIFICACIONES]) {
      for (const e of lista) {
        expect(e.titulo.en.trim()).not.toBe('');
        expect(e.titulo.es.trim()).not.toBe('');
      }
    }
  });
  test('el stack tiene sus grupos en los dos idiomas', () => {
    for (const g of STACK) {
      expect(g.grupo.en.trim()).not.toBe('');
      expect(g.grupo.es.trim()).not.toBe('');
      expect(g.items.length).toBeGreaterThan(0);
    }
  });
});
