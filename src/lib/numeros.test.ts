import { describe, expect, test } from 'vitest';
import { formatoNumero } from './numeros';

describe('formatoNumero', () => {
  test('en inglés, coma de miles y punto decimal', () => {
    expect(formatoNumero(1225, 0, 'en')).toBe('1,225');
    expect(formatoNumero(0.79, 2, 'en')).toBe('0.79');
  });
  test('en español, punto de miles y coma decimal (si no, 1,225 se lee como uno coma dos)', () => {
    expect(formatoNumero(1225, 0, 'es')).toBe('1.225');
    expect(formatoNumero(0.79, 2, 'es')).toBe('0,79');
  });
  test('redondea a los decimales pedidos, también mientras cuenta', () => {
    expect(formatoNumero(612.6, 0, 'es')).toBe('613');
    expect(formatoNumero(0.4049, 2, 'en')).toBe('0.40');
  });
});
