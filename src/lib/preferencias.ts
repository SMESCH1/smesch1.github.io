// Preferencias de quien visita (tema e idioma), guardadas en el navegador. El almacenamiento puede estar bloqueado
// (ventana privada, datos borrados): nunca falla, y sin valor guardado se sigue al sistema.

export type Tema = 'claro' | 'oscuro';
export type Idioma = 'en' | 'es';
type Almacen = { getItem(clave: string): string | null; setItem(clave: string, valor: string): void } | null;

export function leerPreferencia<T extends string>(almacen: Almacen, clave: string, validos: readonly T[]): T | null {
  try {
    const v = almacen?.getItem(clave) ?? null;
    return v !== null && (validos as readonly string[]).includes(v) ? (v as T) : null;
  } catch {
    return null;
  }
}

export function guardarPreferencia(almacen: Almacen, clave: string, valor: string): void {
  try {
    almacen?.setItem(clave, valor);
  } catch {
    // sin almacenamiento, la preferencia dura lo que dura la visita
  }
}

export function idiomaInicial(guardado: Idioma | null, idiomaNavegador: string | undefined): Idioma {
  if (guardado) return guardado;
  return idiomaNavegador?.toLowerCase().startsWith('es') ? 'es' : 'en';
}

export function temaInicial(guardado: Tema | null, sistemaOscuro: boolean): Tema {
  return guardado ?? (sistemaOscuro ? 'oscuro' : 'claro');
}

/** El almacenamiento del navegador, o null si ni siquiera se puede acceder. */
export function almacenLocal(): Almacen {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}
