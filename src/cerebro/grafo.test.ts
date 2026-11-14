import { describe, expect, test } from 'vitest';
import { ARISTAS, NODOS, VECINOS, camino, caminata, par, saltos } from './grafo';

const adyacentes = (a: string, b: string) => ARISTAS.some(([x, y]) => par(x, y) === par(a, b));

describe('par', () => {
  test('da la misma clave sin importar el orden', () => {
    expect(par('H_CC', 'B2')).toBe(par('B2', 'H_CC'));
  });
});

describe('VECINOS', () => {
  test('todo nodo del dibujo tiene al menos un vecino', () => {
    for (const id of Object.keys(NODOS)) expect(VECINOS[id]?.length ?? 0).toBeGreaterThan(0);
  });
});

describe('camino', () => {
  test('va del origen al destino por aristas que existen', () => {
    const ruta = camino('S3', 'H_UL');
    expect(ruta[0]).toBe('S3');
    expect(ruta.at(-1)).toBe('H_UL');
    for (let i = 1; i < ruta.length; i++) expect(adyacentes(ruta[i - 1], ruta[i])).toBe(true);
  });

  test('es el más corto: del tronco al hub central hay 3 saltos (S3, S1, B2, H_CC)', () => {
    expect(camino('S3', 'H_CC')).toEqual(['S3', 'S1', 'B2', 'H_CC']);
  });

  test('de un nodo a sí mismo es solo ese nodo', () => {
    expect(camino('R2', 'R2')).toEqual(['R2']);
  });
});

describe('saltos', () => {
  test('la semilla está a 0 y sus vecinos a 1', () => {
    const d = saltos('H_CC', 2);
    expect(d.get('H_CC')).toBe(0);
    for (const v of VECINOS.H_CC) expect(d.get(v)).toBe(1);
  });

  test('no pasa del máximo pedido', () => {
    const d = saltos('T4', 2);
    expect(Math.max(...d.values())).toBeLessThanOrEqual(2);
    expect(d.has('S4')).toBe(false);
  });
});

describe('caminata', () => {
  test('cada paso cruza una arista y nunca vuelve al nodo de recién', () => {
    let semilla = 0.37;
    const azar = () => (semilla = (semilla * 9301 + 49297) % 233280 / 233280);
    for (let k = 0; k < 50; k++) {
      const ruta = caminata(4, azar);
      expect(ruta.length).toBeGreaterThanOrEqual(1);
      expect(ruta.length).toBeLessThanOrEqual(5);
      for (let i = 1; i < ruta.length; i++) {
        expect(adyacentes(ruta[i - 1], ruta[i])).toBe(true);
        if (i >= 2) expect(ruta[i]).not.toBe(ruta[i - 2]);
      }
    }
  });
});
