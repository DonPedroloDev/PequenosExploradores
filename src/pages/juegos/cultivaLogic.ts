import { isNum, isObj } from '../../lib/guards';
import { shuffle } from '../../lib/random';

export const DIAS = 7;
export const ETAPAS = ['SEMILLA', 'BROTE', 'PLANTA', 'FLOR'] as const;
export const ULTIMA_ETAPA = ETAPAS.length - 1;
export const RANGO = { min: 30, max: 90 };

export type Medidor = 'water' | 'sun' | 'love';
export const MEDIDORES: Medidor[] = ['water', 'sun', 'love'];

export type CultivaState = {
  /** Día actual (1–7). */
  day: number;
  /** Índice en ETAPAS. */
  stage: number;
  water: number;
  sun: number;
  love: number;
  status: 'playing' | 'won' | 'done';
  /** Para el globo de diálogo: si la última acción hizo crecer la planta. */
  grew: boolean;
};

export type CultivaAction = { type: 'act'; medidor: Medidor } | { type: 'reset' };

const clamp = (n: number) => Math.max(0, Math.min(100, n));

export function createCultiva(): CultivaState {
  // Una necesidad empieza baja y las otras bien; cambia en cada partida.
  const [water, sun, love] = shuffle([25, 80, 60]);
  return { day: 1, stage: 0, water, sun, love, status: 'playing', grew: false };
}

/**
 * Reglas: cada acción = 1 día; sube +40 su medidor y baja −15 los otros dos (0–100).
 * Si al terminar el día todos quedan entre 30 y 90, la planta avanza una etapa.
 * Al llegar a FLOR gana; si no, la partida termina al acabar el día 7.
 */
export function cultivaReducer(state: CultivaState, action: CultivaAction): CultivaState {
  switch (action.type) {
    case 'act': {
      if (state.status !== 'playing') return state;
      const next = { ...state };
      for (const m of MEDIDORES) next[m] = clamp(state[m] + (m === action.medidor ? 40 : -15));
      const enRango = MEDIDORES.every((m) => next[m] >= RANGO.min && next[m] <= RANGO.max);
      next.grew = enRango && state.stage < ULTIMA_ETAPA;
      if (next.grew) next.stage = state.stage + 1;
      if (next.stage === ULTIMA_ETAPA) next.status = 'won';
      else if (state.day >= DIAS) next.status = 'done';
      else next.day = state.day + 1;
      return next;
    }
    case 'reset':
      return createCultiva();
  }
}

/** La necesidad más baja (la acción recomendada). */
export function necesidad(state: CultivaState): Medidor {
  return MEDIDORES.reduce((a, b) => (state[b] < state[a] ? b : a));
}

export function isCultivaInProgress(v: unknown): v is CultivaState {
  return (
    isObj(v) &&
    v.status === 'playing' &&
    isNum(v.day) &&
    v.day >= 1 &&
    v.day <= DIAS &&
    isNum(v.stage) &&
    v.stage >= 0 &&
    v.stage < ULTIMA_ETAPA &&
    MEDIDORES.every((m) => isNum(v[m]))
  );
}
