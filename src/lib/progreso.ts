import { load, save } from './storage';

export type GameId = 'cultiva' | 'residuos' | 'quiz';

// TODO: revisar — nombres de las insignias de Cultiva y Residuos.
export const insignias: Record<GameId, string> = {
  cultiva: 'MANO VERDE',
  residuos: 'HÉROE DEL RECICLAJE',
  quiz: 'GUARDIÁN DEL PLANETA',
};

type Registro = { mejor: number; total: number; partidas: number; insignia?: string };
type Progreso = Partial<Record<GameId, Registro>>;

const KEY = 'progreso';

export function getProgreso(): Progreso {
  return load<Progreso>(KEY) ?? {};
}

/** Se gana la insignia al llegar al 50 % (en Cultiva, al florecer). */
export function ganaInsignia(game: GameId, score: number, total: number) {
  return game === 'cultiva' ? score >= total : score / total >= 0.5;
}

/**
 * Registra una partida terminada. Devuelve si la insignia es nueva.
 * Se guarda: mejor marca, número de partidas e insignia (fecha ISO).
 */
export function registrarPartida(game: GameId, score: number, total: number) {
  const progreso = getProgreso();
  const prev = progreso[game];
  const gana = ganaInsignia(game, score, total);
  const nueva = gana && !prev?.insignia;
  progreso[game] = {
    mejor: Math.max(prev?.mejor ?? 0, score),
    total,
    partidas: (prev?.partidas ?? 0) + 1,
    insignia: prev?.insignia ?? (gana ? new Date().toISOString() : undefined),
  };
  save(KEY, progreso);
  return { gana, nueva };
}
