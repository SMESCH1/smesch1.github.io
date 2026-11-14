// Un canal mínimo para que el registro de actividad se entere de cada señal que llega a un nodo del cerebro.
type Oyente = (fuerza: number, proyecto: boolean) => void;
const oyentes = new Set<Oyente>();

export function escucharPulsos(oyente: Oyente) {
  oyentes.add(oyente);
  return () => { oyentes.delete(oyente); };
}

export function emitirPulso(fuerza: number, proyecto = false) {
  for (const o of oyentes) o(fuerza, proyecto);
}
