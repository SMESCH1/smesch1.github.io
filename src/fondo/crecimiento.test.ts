import { describe, expect, test } from 'vitest';
import { tiemposDeCrecimiento } from './crecimiento';

describe('tiemposDeCrecimiento', () => {
  const trazos = [
    { t0: 0, largo: 100 },   // sale de la esquina
    { t0: 100, largo: 50 },  // hija: empieza donde termina la madre
    { t0: 40, largo: 10 },
  ];

  test('el trazo que sale de la esquina arranca en 0', () => {
    expect(tiemposDeCrecimiento(trazos, 3)[0].retraso).toBe(0);
  });

  test('la punta más lejana llega justo al final de la duración total', () => {
    const t = tiemposDeCrecimiento(trazos, 3);
    const fin = Math.max(...t.map((x) => x.retraso + x.duracion));
    expect(fin).toBeCloseTo(3);
  });

  test('la velocidad es la misma para todos los trazos (crecimiento lineal)', () => {
    const t = tiemposDeCrecimiento(trazos, 3);
    const velocidades = trazos.map((x, i) => x.largo / t[i].duracion);
    for (const v of velocidades) expect(v).toBeCloseTo(velocidades[0]);
  });

  test('una hija empieza cuando la madre termina', () => {
    const [madre, hija] = tiemposDeCrecimiento(trazos, 3);
    expect(hija.retraso).toBeCloseTo(madre.retraso + madre.duracion);
  });

  test('sin trazos no falla', () => {
    expect(tiemposDeCrecimiento([], 3)).toEqual([]);
  });
});
