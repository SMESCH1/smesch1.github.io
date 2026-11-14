/** Parte un texto donde `==así==` marca lo resaltado (la misma convención que armar-presentaciones). */
export function partirResaltado(texto: string): { texto: string; resaltado: boolean }[] {
  return texto
    .split(/==(.+?)==/)
    .map((t, i) => ({ texto: t, resaltado: i % 2 === 1 }))
    .filter((p) => p.texto !== '');
}
