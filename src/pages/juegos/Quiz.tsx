import { useEffect, useRef } from 'react';
import { Button } from '../../components/Button';
import { GameBar } from '../../components/GameBar';
import { Resultado } from '../../components/Resultado';
import { usePageTitle } from '../../hooks/usePageTitle';
import { usePersistentReducer } from '../../hooks/usePersistentReducer';
import { asset } from '../../lib/assets';
import { cx } from '../../lib/cx';
import { createQuiz, getPregunta, isQuizInProgress, quizReducer } from './quizLogic';

const LETRAS = ['A', 'B', 'C', 'D'];

function Check({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 22 18" className={className} aria-hidden="true">
      <path d="M3 9 L9 15 L19 3" stroke="currentColor" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Cross({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 18" className={className} aria-hidden="true">
      <path d="M4 4 L14 14 M14 4 L4 14" stroke="currentColor" strokeWidth="3.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export default function Quiz() {
  usePageTitle('Quiz ecológico');
  const [state, dispatch] = usePersistentReducer('quiz', quizReducer, createQuiz, isQuizInProgress);
  const nextRef = useRef<HTMLButtonElement>(null);
  const total = state.questions.length;
  const terminado = state.index >= total;
  const actual = terminado ? null : state.questions[state.index];
  const pregunta = actual ? getPregunta(actual.id) : null;
  const respondida = state.selected !== null;
  const acerto = actual && state.selected !== null && actual.orden[state.selected] === 0;

  // Al responder, el foco va a SIGUIENTE.
  useEffect(() => {
    if (respondida) nextRef.current?.focus();
  }, [respondida]);

  // Atajos: A–D o 1–4 para responder.
  useEffect(() => {
    if (terminado || respondida) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      const i = 'abcd'.indexOf(e.key.toLowerCase());
      const n = '1234'.indexOf(e.key);
      const choice = i >= 0 ? i : n;
      if (choice >= 0) dispatch({ type: 'answer', choice });
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [terminado, respondida, dispatch]);

  if (terminado || !actual || !pregunta) {
    return (
      <Resultado
        game="quiz"
        score={state.correctCount}
        total={total}
        resumen={`Respondiste ${state.correctCount} de ${total} preguntas correctas.`}
        onReplay={() => dispatch({ type: 'reset' })}
      />
    );
  }

  const progreso = (
    <div className="flex items-center justify-between gap-[14px]">
      <span className="font-display text-[17px] md:text-xl">
        PREGUNTA {state.index + 1} DE {total}
      </span>
      <ol className="flex gap-1.5" aria-hidden="true">
        {state.questions.map((q, i) => (
          <li
            key={q.id}
            className={cx(
              'h-[13px] w-[13px] rounded-full md:h-[14px] md:w-[14px]',
              i < state.index && 'bg-hoja',
              i === state.index && 'bg-sol shadow-[0_0_0_2.5px_#0F2E22]',
              i > state.index && 'border-2.5 border-hoja-muted',
            )}
          />
        ))}
      </ol>
    </div>
  );

  return (
    <div className="lg:pb-u118">
      <GameBar titulo="QUIZ ECOLÓGICO" sideWidth="lg:w-u280" aside={progreso} />

      <div className="px-5 md:mx-auto md:max-w-[760px] md:px-10 lg:mt-u18 lg:flex lg:max-w-none lg:items-start lg:px-u96">
        <img
          src={asset('game-quiz.png')}
          alt=""
          className="mx-auto mt-[10px] block w-[210px] md:w-[260px] lg:ml-u4 lg:mr-u40 lg:mt-u98 lg:w-u400 lg:shrink-0"
        />

        <section
          aria-labelledby="pregunta"
          className="mt-3 flex flex-col rounded-[22px] border-3 border-coral bg-coral-suave2 px-4 pb-[18px] pt-5 md:px-8 md:py-7 lg:mt-0 lg:min-h-u500 lg:w-u804 lg:rounded-game lg:px-10 lg:py-[34px]"
        >
          <h2 id="pregunta" className="text-[26px] uppercase leading-[30px] [text-wrap:balance] md:text-[34px] md:leading-10 lg:text-[40px] lg:leading-[46px]">
            {pregunta.pregunta}
          </h2>

          <ul className="mt-4 flex flex-col gap-[10px] lg:mt-7 lg:grid lg:grid-cols-2 lg:gap-4">
            {actual.orden.map((original, pos) => {
              const esCorrecta = original === 0;
              const elegida = state.selected === pos;
              return (
                <li key={original}>
                  <button
                    type="button"
                    disabled={respondida}
                    onClick={() => dispatch({ type: 'answer', choice: pos })}
                    className={cx(
                      'flex min-h-[60px] w-full items-center gap-3 rounded-2xl border-3 px-3 py-1.5 text-left font-display text-xl uppercase leading-6 text-tinta transition-[background-color,opacity] duration-150 lg:min-h-[76px] lg:gap-[14px] lg:rounded-[18px] lg:px-4 lg:text-2xl lg:leading-7',
                      !respondida && 'border-tinta bg-campo hover:bg-arena-suave',
                      respondida && esCorrecta && 'border-hoja bg-hoja-suave shadow-quiz-correct',
                      respondida && elegida && !esCorrecta && 'border-tinta bg-coral-fuerte',
                      respondida && !esCorrecta && !elegida && 'border-tinta bg-campo opacity-55',
                    )}
                  >
                    <span
                      className={cx(
                        'flex h-9 w-9 flex-none items-center justify-center rounded-full text-lg lg:h-11 lg:w-11 lg:text-[22px]',
                        respondida && esCorrecta
                          ? 'bg-hoja text-crema'
                          : respondida && elegida
                            ? 'bg-error text-crema'
                            : 'border-2.5 border-tinta bg-arena-suave',
                      )}
                    >
                      {respondida && esCorrecta ? (
                        <Check className="h-[15px] w-[18px] lg:h-[18px] lg:w-[22px]" />
                      ) : respondida && elegida ? (
                        <Cross className="h-4 w-4" />
                      ) : (
                        LETRAS[pos]
                      )}
                    </span>
                    <span>
                      <span className="sr-only">{LETRAS[pos]}. </span>
                      {pregunta.opciones[original]}
                      {respondida && esCorrecta && <span className="sr-only"> (respuesta correcta)</span>}
                      {respondida && elegida && !esCorrecta && <span className="sr-only"> (tu respuesta)</span>}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div aria-live="polite" className="lg:mt-auto">
            {respondida && (
              <div className="mt-4 flex flex-col gap-4 motion-safe:animate-aparece lg:mt-6 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
                <div>
                  <p className={cx('font-display text-[22px] leading-[26px] lg:text-[26px] lg:leading-[30px]', acerto ? 'text-hoja' : 'text-error')}>
                    {acerto ? '¡CORRECTO!' : '¡CASI!'}
                  </p>
                  <p className="mt-0.5 text-base leading-[23px] lg:text-[19px] lg:leading-[26px]">{pregunta.explicacion}</p>
                </div>
                <Button ref={nextRef} onClick={() => dispatch({ type: 'next' })} className="h-[58px] lg:h-[60px] lg:flex-none">
                  {state.index + 1 === total ? 'VER RESULTADO' : 'SIGUIENTE'}
                </Button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
