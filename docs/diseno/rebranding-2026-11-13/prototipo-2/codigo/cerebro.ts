// El cerebro de nodos del sitio actual (mismas coordenadas, viewBox 200 × 200, ya subido 8 unidades),
// como grafo: sirve para dibujarlo y para que las señales recorran caminos entre nodos.

export const NODOS: Record<string, [number, number]> = {
  T1: [32, 78], T3: [66, 46], T4: [94, 42], T5: [120, 50], R1: [156, 70], R2: [162, 94], R3: [152, 114],
  B1: [133, 128], B2: [108, 138], B3: [87, 122], B4: [60, 117], L1: [38, 104],
  H_UL: [72, 74], H_UC: [98, 72], H_UR: [122, 77], H_R: [138, 86], H_LL: [88, 101], H_CC: [115, 98], H_LR: [132, 111],
  S1: [118, 146], S2: [132, 144], S3: [123, 166], S4: [138, 168],
};

// [desde, hasta, grosor]
export const ARISTAS: [string, string, number][] = [
  ['T1', 'T3', 1.8], ['T3', 'T4', 1.65], ['T4', 'T5', 1.55], ['T5', 'R1', 1.3], ['R1', 'R2', 1.15], ['R2', 'R3', 1.3],
  ['R3', 'B1', 1.4], ['B1', 'B2', 1.55], ['B2', 'B3', 1.25], ['B3', 'B4', 1.5], ['B4', 'L1', 1.2], ['L1', 'T1', 1.05],
  ['T1', 'H_UL', 0.95], ['L1', 'H_UL', 1.1], ['L1', 'H_LL', 1.25], ['R1', 'H_R', 1.3], ['R2', 'H_R', 1.1], ['R2', 'H_LR', 1.25],
  ['R3', 'H_LR', 1], ['T3', 'H_UL', 1.4], ['T3', 'H_UC', 1.25], ['T4', 'H_UC', 1.35], ['T4', 'H_UR', 0.95], ['T5', 'H_UR', 1.3],
  ['T5', 'H_R', 1.35], ['H_UL', 'H_UC', 1.05], ['H_UC', 'H_UR', 1.3], ['H_UR', 'H_R', 1.3], ['H_UR', 'H_CC', 1.45],
  ['H_R', 'H_CC', 1.8], ['H_UL', 'H_LL', 1.2], ['H_CC', 'H_LR', 1.45], ['B4', 'H_LL', 1.25], ['B3', 'H_LL', 1.35],
  ['B3', 'H_CC', 1.45], ['B2', 'H_CC', 1.7], ['B2', 'H_LR', 1.05], ['B1', 'H_LR', 1.3], ['B2', 'S1', 1.55], ['B1', 'S2', 1.4],
  ['S1', 'S2', 1], ['S1', 'S3', 1.6], ['S2', 'S4', 1.6],
];

export const HUBS = ['H_UL', 'H_R', 'H_CC'];
const GRANDES = ['H_UC', 'H_UR', 'H_LL', 'H_LR'];

export function radio(id: string): number {
  if (HUBS.includes(id)) return 5;
  if (GRANDES.includes(id)) return 3.6;
  return id.startsWith('S') ? 2.6 : 3.2;
}

export const par = (a: string, b: string) => [a, b].sort().join('|');

export const VECINOS: Record<string, string[]> = {};
for (const [a, b] of ARISTAS) {
  (VECINOS[a] ??= []).push(b);
  (VECINOS[b] ??= []).push(a);
}

/** El camino más corto entre dos nodos (búsqueda en anchura). */
export function camino(desde: string, hasta: string): string[] {
  const previo: Record<string, string | null> = { [desde]: null };
  const cola = [desde];
  while (cola.length) {
    const actual = cola.shift()!;
    if (actual === hasta) break;
    for (const v of VECINOS[actual]) {
      if (!(v in previo)) { previo[v] = actual; cola.push(v); }
    }
  }
  const ruta: string[] = [];
  for (let n: string | null = hasta; n; n = previo[n] ?? null) ruta.unshift(n);
  return ruta;
}

/** Una caminata al azar de unos pasos, sin volver al nodo anterior. */
export function caminata(pasos: number): string[] {
  const ids = Object.keys(NODOS);
  const ruta = [ids[Math.floor(Math.random() * ids.length)]];
  for (let i = 0; i < pasos; i++) {
    const actual = ruta[ruta.length - 1];
    const opciones = VECINOS[actual].filter((v) => v !== ruta[ruta.length - 2]);
    if (!opciones.length) break;
    ruta.push(opciones[Math.floor(Math.random() * opciones.length)]);
  }
  return ruta;
}

/** Cuántos saltos hay desde un nodo a cada nodo cercano, hasta un máximo (mapa de conectividad desde una semilla). */
export function saltos(desde: string, maximo: number): Map<string, number> {
  const dist = new Map([[desde, 0]]);
  const cola = [desde];
  while (cola.length) {
    const actual = cola.shift()!;
    const d = dist.get(actual)!;
    if (d === maximo) continue;
    for (const v of VECINOS[actual]) if (!dist.has(v)) { dist.set(v, d + 1); cola.push(v); }
  }
  return dist;
}
