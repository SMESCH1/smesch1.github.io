import { describe, expect, test } from 'vitest';
import { guardarPreferencia, idiomaInicial, leerPreferencia, temaInicial } from './preferencias';

const memoria = (datos: Record<string, string> = {}) => ({
  getItem: (k: string) => datos[k] ?? null,
  setItem: (k: string, v: string) => { datos[k] = v; },
});
const roto = {
  getItem: () => { throw new Error('bloqueado'); },
  setItem: () => { throw new Error('bloqueado'); },
};

describe('leerPreferencia', () => {
  test('devuelve lo guardado si es un valor válido', () => {
    expect(leerPreferencia(memoria({ tema: 'claro' }), 'tema', ['claro', 'oscuro'])).toBe('claro');
  });
  test('ignora un valor guardado que no es válido', () => {
    expect(leerPreferencia(memoria({ tema: 'violeta' }), 'tema', ['claro', 'oscuro'])).toBeNull();
  });
  test('si el navegador bloquea el almacenamiento, devuelve null en vez de fallar', () => {
    expect(leerPreferencia(roto, 'tema', ['claro', 'oscuro'])).toBeNull();
    expect(leerPreferencia(null, 'tema', ['claro', 'oscuro'])).toBeNull();
  });
});

describe('guardarPreferencia', () => {
  test('guarda el valor', () => {
    const m = memoria();
    guardarPreferencia(m, 'idioma', 'es');
    expect(m.getItem('idioma')).toBe('es');
  });
  test('no falla si el almacenamiento está bloqueado', () => {
    expect(() => guardarPreferencia(roto, 'idioma', 'es')).not.toThrow();
  });
});

describe('idiomaInicial', () => {
  test('respeta lo guardado', () => {
    expect(idiomaInicial('en', 'es-AR')).toBe('en');
  });
  test('sin nada guardado, español si el navegador está en español', () => {
    expect(idiomaInicial(null, 'es-AR')).toBe('es');
    expect(idiomaInicial(null, 'es')).toBe('es');
  });
  test('sin nada guardado y otro idioma, inglés', () => {
    expect(idiomaInicial(null, 'pt-BR')).toBe('en');
    expect(idiomaInicial(null, undefined)).toBe('en');
  });
});

describe('temaInicial', () => {
  test('respeta lo guardado', () => {
    expect(temaInicial('claro', true)).toBe('claro');
  });
  test('sin nada guardado, sigue al sistema', () => {
    expect(temaInicial(null, true)).toBe('oscuro');
    expect(temaInicial(null, false)).toBe('claro');
  });
});
