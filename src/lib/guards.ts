/** Ayudas mínimas para validar estados guardados en localStorage. */
export const isObj = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null;
export const isNum = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v);
