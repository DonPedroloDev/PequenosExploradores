import { useEffect, useReducer, type Reducer } from 'react';
import { load, save } from '../lib/storage';

/**
 * useReducer que se guarda en localStorage para poder reanudar la partida.
 * `isValid` descarta estados guardados con una forma vieja o corrupta.
 */
export function usePersistentReducer<S, A>(
  key: string,
  reducer: Reducer<S, A>,
  createInitial: () => S,
  isValid: (s: unknown) => s is S,
) {
  const [state, dispatch] = useReducer(reducer, undefined, () => {
    const saved = load<unknown>(key);
    return isValid(saved) ? saved : createInitial();
  });

  useEffect(() => {
    save(key, state);
  }, [key, state]);

  return [state, dispatch] as const;
}
