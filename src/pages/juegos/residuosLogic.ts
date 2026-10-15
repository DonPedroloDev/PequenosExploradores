import { getResiduo, residuos, type BoteId } from '../../data/residuos';
import { isNum, isObj } from '../../lib/guards';
import { shuffle } from '../../lib/random';

export const RESIDUOS_POR_PARTIDA = 10;
export const PUNTOS_POR_ACIERTO = 10;

export type ResiduosState = {
  /** ids de los residuos de esta partida. */
  queue: string[];
  index: number;
  /** Puntos (10 por acierto). */
  score: number;
  feedback: { ok: boolean; bote: BoteId } | null;
};

export type ResiduosAction = { type: 'drop'; bote: BoteId } | { type: 'next' } | { type: 'reset' };

export function createResiduos(): ResiduosState {
  return {
    queue: shuffle(residuos).slice(0, RESIDUOS_POR_PARTIDA).map((r) => r.id),
    index: 0,
    score: 0,
    feedback: null,
  };
}

export function residuosReducer(state: ResiduosState, action: ResiduosAction): ResiduosState {
  switch (action.type) {
    case 'drop': {
      if (state.feedback || state.index >= state.queue.length) return state;
      const item = getResiduo(state.queue[state.index]);
      const ok = item?.bote === action.bote;
      // El pill de error dice a qué bote iba: guardamos el correcto.
      return {
        ...state,
        score: state.score + (ok ? PUNTOS_POR_ACIERTO : 0),
        feedback: { ok, bote: item?.bote ?? action.bote },
      };
    }
    case 'next':
      if (!state.feedback) return state;
      return { ...state, index: state.index + 1, feedback: null };
    case 'reset':
      return createResiduos();
  }
}

export function isResiduosInProgress(v: unknown): v is ResiduosState {
  if (!isObj(v) || !Array.isArray(v.queue) || !isNum(v.index) || !isNum(v.score)) return false;
  if (v.index >= v.queue.length) return false;
  return v.queue.every((id) => typeof id === 'string' && !!getResiduo(id));
}
