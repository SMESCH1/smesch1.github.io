import { describe, expect, test } from 'vitest';
import { partirResaltado } from './resaltado';

describe('partirResaltado', () => {
  test('marca lo que va entre ==', () => {
    expect(partirResaltado('Me interesa la ==IA para la salud mental==: usar ML')).toEqual([
      { texto: 'Me interesa la ', resaltado: false },
      { texto: 'IA para la salud mental', resaltado: true },
      { texto: ': usar ML', resaltado: false },
    ]);
  });
  test('un texto sin marcas queda entero', () => {
    expect(partirResaltado('sin marcas')).toEqual([{ texto: 'sin marcas', resaltado: false }]);
  });
  test('no deja pedazos vacíos', () => {
    expect(partirResaltado('==todo==')).toEqual([{ texto: 'todo', resaltado: true }]);
  });
});
