import { bancoQuiz, PREGUNTAS_POR_PARTIDA, type Pregunta } from '../../data/quiz';
import { isNum, isObj } from '../../lib/guards';
import { shuffle } from '../../lib/random';

/** `orden[i]` = índice de la opción original que se muestra en la posición i (0 = correcta). */
export type QuizPregunta = { id: string; orden: number[] };

export type QuizState = {
  questions: QuizPregunta[];
  index: number;
  /** Posición elegida en la pregunta actual (null = sin responder). */
  selected: number | null;
  correctCount: number;
};

export type QuizAction = { type: 'answer'; choice: number } | { type: 'next' } | { type: 'reset' };

export function createQuiz(): QuizState {
  return {
    questions: shuffle(bancoQuiz)
      .slice(0, PREGUNTAS_POR_PARTIDA)
      .map((p) => ({ id: p.id, orden: shuffle([0, 1, 2, 3]) })),
    index: 0,
    selected: null,
    correctCount: 0,
  };
}

export function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'answer': {
      if (state.selected !== null || state.index >= state.questions.length) return state;
      const correcta = state.questions[state.index].orden[action.choice] === 0;
      return { ...state, selected: action.choice, correctCount: state.correctCount + (correcta ? 1 : 0) };
    }
    case 'next':
      if (state.selected === null) return state;
      return { ...state, index: state.index + 1, selected: null };
    case 'reset':
      return createQuiz();
  }
}

export const getPregunta = (id: string): Pregunta => bancoQuiz.find((p) => p.id === id)!;

/** Solo se reanuda una partida en curso y con preguntas que sigan existiendo en el banco. */
export function isQuizInProgress(v: unknown): v is QuizState {
  if (!isObj(v) || !Array.isArray(v.questions) || !isNum(v.index) || !isNum(v.correctCount)) return false;
  if (v.selected !== null && !isNum(v.selected)) return false;
  if (v.index >= v.questions.length) return false;
  return v.questions.every(
    (q) => isObj(q) && bancoQuiz.some((b) => b.id === q.id) && Array.isArray(q.orden) && q.orden.length === 4,
  );
}
