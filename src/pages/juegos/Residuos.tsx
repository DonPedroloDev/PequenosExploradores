import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { GameBar, StatusPill } from '../../components/GameBar';
import { Placeholder } from '../../components/Placeholder';
import { Resultado } from '../../components/Resultado';
import { botes, getBote, getResiduo, type BoteId } from '../../data/residuos';
import { usePageTitle } from '../../hooks/usePageTitle';
import { usePersistentReducer } from '../../hooks/usePersistentReducer';
import { asset } from '../../lib/assets';
import { cx } from '../../lib/cx';
import { PUNTOS_POR_ACIERTO, createResiduos, isResiduosInProgress, residuosReducer } from './residuosLogic';

/** Distancia mínima (px) para que un toque se considere arrastre. */
const UMBRAL_ARRASTRE = 6;
const ESPERA_SIGUIENTE = 1100;

type Arrastre = { pointerId: number; x0: number; y0: number; dx: number; dy: number; moved: boolean };

export default function Residuos() {
  usePageTitle('Separa los residuos');
  const [state, dispatch] = usePersistentReducer('residuos', residuosReducer, createResiduos, isResiduosInProgress);
  const [drag, setDrag] = useState<Arrastre | null>(null);
  const [over, setOver] = useState<BoteId | null>(null);
  const [seleccionado, setSeleccionado] = useState(false);
  const binRefs = useRef<Partial<Record<BoteId, HTMLButtonElement | null>>>({});
  const fueArrastre = useRef(false);

  const total = state.queue.length;
  const terminado = state.index >= total;
  const item = terminado ? null : getResiduo(state.queue[state.index]);
  const aciertos = state.score / PUNTOS_POR_ACIERTO;

  const soltar = useCallback(
    (bote: BoteId) => {
      setSeleccionado(false);
      dispatch({ type: 'drop', bote });
    },
    [dispatch],
  );

  // Tras mostrar el resultado del intento, pasa al siguiente residuo.
  useEffect(() => {
    if (!state.feedback) return;
    const t = window.setTimeout(() => dispatch({ type: 'next' }), ESPERA_SIGUIENTE);
    return () => window.clearTimeout(t);
  }, [state.feedback, dispatch]);

  // Atajos de teclado: 1, 2, 3 = botes.
  useEffect(() => {
    if (terminado || state.feedback) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      const i = ['1', '2', '3'].indexOf(e.key);
      if (i >= 0) soltar(botes[i].id);
      if (e.key === 'Escape') setSeleccionado(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [terminado, state.feedback, soltar]);

  const boteBajo = (x: number, y: number): BoteId | null => {
    for (const b of botes) {
      const r = binRefs.current[b.id]?.getBoundingClientRect();
      if (r && x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return b.id;
    }
    return null;
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLButtonElement>) => {
    if (state.feedback || (e.pointerType === 'mouse' && e.button !== 0)) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    fueArrastre.current = false;
    setDrag({ pointerId: e.pointerId, x0: e.clientX, y0: e.clientY, dx: 0, dy: 0, moved: false });
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLButtonElement>) => {
    if (!drag || e.pointerId !== drag.pointerId) return;
    const dx = e.clientX - drag.x0;
    const dy = e.clientY - drag.y0;
    const moved = drag.moved || Math.hypot(dx, dy) > UMBRAL_ARRASTRE;
    if (!moved) return;
    setDrag({ ...drag, dx, dy, moved });
    setOver(boteBajo(e.clientX, e.clientY));
  };

  const terminarArrastre = (e: ReactPointerEvent<HTMLButtonElement>, cancelado = false) => {
    if (!drag || e.pointerId !== drag.pointerId) return;
    if (drag.moved) {
      // Evita que el click que sigue al arrastre cuente como "tocar"; se limpia tras ese click.
      fueArrastre.current = true;
      window.setTimeout(() => (fueArrastre.current = false), 0);
      const bote = cancelado ? null : boteBajo(e.clientX, e.clientY);
      if (bote) soltar(bote);
    }
    setDrag(null);
    setOver(null);
  };

  if (terminado || !item) {
    return (
      <Resultado
        game="residuos"
        score={aciertos}
        total={total}
        resumen={`Separaste bien ${aciertos} de ${total} residuos.`}
        onReplay={() => dispatch({ type: 'reset' })}
      />
    );
  }

  const fb = state.feedback;
  const arrastrando = !!drag?.moved;

  return (
    <div className="lg:pb-u12">
      <GameBar
        titulo="SEPARA LOS RESIDUOS"
        sideWidth="lg:w-u250"
        aside={
          <div className="flex gap-2 md:gap-[10px]">
            <StatusPill tone="hoja">
              <span className="sr-only">Residuo </span>
              {state.index + 1} / {total}
            </StatusPill>
            <StatusPill tone="sol">PUNTOS {state.score}</StatusPill>
          </div>
        }
      />

      <p id="instruccion" className="mt-4 px-5 text-center text-lg font-medium leading-[25px] lg:mt-u12 lg:text-[26px] lg:leading-[34px]">
        Arrastra cada residuo al bote correcto.
        <span className="sr-only"> También puedes elegir el bote con su botón o con las teclas 1, 2 y 3.</span>
      </p>

      {/* Zona de la tarjeta */}
      <div className="relative mx-5 mt-4 h-[200px] md:mx-auto md:max-w-[560px] lg:mx-0 lg:mt-0 lg:h-u258 lg:max-w-none">
        <div
          key={item.id}
          className="absolute left-1/2 top-[6px] -ml-[90px] motion-safe:animate-aparece lg:top-u24 lg:-ml-u110"
          style={{ zIndex: arrastrando ? 40 : 2 }}
        >
          <button
            type="button"
            aria-describedby="instruccion"
            aria-pressed={seleccionado}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={(e) => terminarArrastre(e)}
            onPointerCancel={(e) => terminarArrastre(e, true)}
            onClick={() => {
              if (fueArrastre.current) {
                fueArrastre.current = false;
                return;
              }
              if (!fb) setSeleccionado((s) => !s);
            }}
            style={
              arrastrando
                ? { transform: `translate(${drag!.dx}px, ${drag!.dy}px) rotate(-4deg) scale(1.05)`, transition: 'none' }
                : undefined
            }
            className={cx(
              'flex h-[172px] w-[180px] touch-none select-none flex-col rounded-[18px] border-3 border-tinta bg-campo p-[10px] text-tinta shadow-[0_10px_0_rgba(15,46,34,.10)] lg:h-u200 lg:w-u220 lg:rounded-[20px] lg:p-u12 lg:shadow-[0_12px_0_rgba(15,46,34,.10)]',
              arrastrando ? 'cursor-grabbing' : 'cursor-grab -rotate-[4deg] transition-[transform,opacity] duration-200 ease-out',
              seleccionado && !arrastrando && '-translate-y-2 shadow-drop-target',
              fb?.ok && 'scale-75 opacity-0',
              fb && !fb.ok && 'animate-shake',
            )}
          >
            <Placeholder label={item.id} className="h-24 w-full rounded-[10px] lg:h-u116 lg:rounded-xl" />
            <span className="mt-2 block w-full text-center font-display text-[17px] leading-[19px] lg:mt-u10 lg:text-u20 lg:leading-u22">
              {item.nombre}
            </span>
          </button>
        </div>

        <div aria-live="assertive" className="absolute right-0 top-[150px] lg:left-[calc(50%+160*var(--u))] lg:right-auto lg:top-u80">
          {fb && (
            <span
              className={cx(
                'inline-flex h-10 items-center whitespace-nowrap rounded-full px-[14px] font-display text-[17px] motion-safe:animate-aparece lg:h-12 lg:px-[22px] lg:text-[22px]',
                fb.ok ? 'bg-hoja text-crema' : 'bg-coral-fuerte text-tinta',
              )}
            >
              {fb.ok ? `¡MUY BIEN! +${PUNTOS_POR_ACIERTO}` : `¡Ups! Va en ${getBote(fb.bote).nombre.toLowerCase()}`}
            </span>
          )}
        </div>
        {seleccionado && !fb && (
          <p className="absolute inset-x-0 -bottom-1 text-center font-display text-base text-hoja motion-safe:animate-aparece lg:bottom-u2 lg:text-lg">
            ¡AHORA ELIGE UN BOTE!
          </p>
        )}
      </div>

      {/* Botes: zonas para soltar y también botones (toque / teclado) */}
      <ul className="mx-5 mt-[14px] grid grid-cols-3 items-end gap-2 md:mx-auto md:max-w-[640px] md:gap-4 lg:mt-0 lg:w-u936 lg:max-w-none lg:gap-u18">
        {botes.map((b, i) => {
          const activo = over === b.id;
          return (
            <li key={b.id}>
              <button
                ref={(el) => {
                  binRefs.current[b.id] = el;
                }}
                type="button"
                disabled={!!fb}
                onClick={() => soltar(b.id)}
                aria-label={`${b.nombre}: echar aquí ${item.nombre.toLowerCase()} (tecla ${i + 1})`}
                className={cx(
                  'flex h-[176px] w-full flex-col items-center rounded-[18px] px-1 pt-3 text-center text-tinta transition-[transform,box-shadow,background-color] duration-150 md:h-[200px] lg:h-u220 lg:rounded-card-lg lg:pt-u14',
                  activo ? cx(b.activo, 'border-4 -translate-y-1.5 shadow-drop-target lg:-translate-y-2') : cx(b.reposo, 'border-3'),
                  !fb && !activo && 'hover:-translate-y-1',
                  seleccionado && !activo && 'shadow-drop-target',
                )}
              >
                <img src={asset(b.imagen)} alt="" className="h-24 w-auto md:h-[120px] lg:h-u140" />
                <span className="mt-2 font-display text-[15px] leading-[17px] md:text-lg md:leading-5 lg:mt-u10 lg:text-u22 lg:leading-u26">
                  {b.nombre}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
