export interface Trazo { t0: number; largo: number }
export interface Tiempo { retraso: number; duracion: number }

/** Crecimiento lineal desde el origen: una "onda" sale de la esquina a velocidad constante. Cada trazo empieza cuando
 *  la onda llega a su origen (t0, distancia desde la esquina) y tarda lo que mide; la punta más lejana llega al final. */
export function tiemposDeCrecimiento(trazos: Trazo[], duracionTotal: number): Tiempo[] {
  if (!trazos.length) return [];
  const fin = Math.max(...trazos.map((t) => t.t0 + t.largo));
  const velocidad = fin / duracionTotal;
  return trazos.map((t) => ({ retraso: t.t0 / velocidad, duracion: t.largo / velocidad }));
}
