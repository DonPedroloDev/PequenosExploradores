const PREFIX = 'pe:';

/** Lee JSON de localStorage. Si no hay, está corrupto o el navegador lo bloquea, devuelve null. */
export function load<T>(key: string): T | null {
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function save(key: string, value: unknown) {
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    /* almacenamiento lleno o bloqueado: el juego sigue sin guardar */
  }
}

export function remove(key: string) {
  try {
    window.localStorage.removeItem(PREFIX + key);
  } catch {
    /* ignorar */
  }
}
