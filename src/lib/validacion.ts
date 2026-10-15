import type { ContactPayload } from './contact';

export type Campo = keyof ContactPayload;
export type Errores = Partial<Record<Campo, string>>;

const CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validarCampo(campo: Campo, valor: string): string | undefined {
  const v = valor.trim();
  switch (campo) {
    case 'nombre':
      return v.length >= 2 ? undefined : '¿Cómo te llamas?';
    case 'correo':
      return CORREO.test(v) ? undefined : 'Revisa tu correo, parece que le falta algo.';
    case 'mensaje':
      return v.length >= 10 ? undefined : 'Cuéntanos un poquito más.';
  }
}

export function validar(values: ContactPayload): Errores {
  const errores: Errores = {};
  for (const campo of Object.keys(values) as Campo[]) {
    const e = validarCampo(campo, values[campo]);
    if (e) errores[campo] = e;
  }
  return errores;
}
