import type { Idioma } from './preferencias';

const LOCALES: Record<Idioma, string> = { en: 'en-US', es: 'es-AR' };

/** Un número con los separadores del idioma: 1,225 y 0.79 en inglés; 1.225 y 0,79 en español. */
export function formatoNumero(n: number, decimales: number, idioma: Idioma): string {
  return new Intl.NumberFormat(LOCALES[idioma], { minimumFractionDigits: decimales, maximumFractionDigits: decimales })
    .format(Number(n.toFixed(decimales)));
}
