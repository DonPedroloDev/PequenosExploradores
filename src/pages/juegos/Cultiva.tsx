import { Fragment, useEffect, useRef, useState } from 'react';
import { Button } from '../../components/Button';
import { GameBar, StatusPill } from '../../components/GameBar';
import { ProgressBar } from '../../components/ProgressBar';
import { Resultado } from '../../components/Resultado';
import { usePageTitle } from '../../hooks/usePageTitle';
import { usePersistentReducer } from '../../hooks/usePersistentReducer';
import { asset } from '../../lib/assets';
import { cx } from '../../lib/cx';
import {
  DIAS,
  ETAPAS,
  MEDIDORES,
  RANGO,
  ULTIMA_ETAPA,
  createCultiva,
  cultivaReducer,
  isCultivaInProgress,
  necesidad,
  type CultivaState,
  type Medidor,
} from './cultivaLogic';

const INFO: Record<
  Medidor,
  {
    label: string;
    accion: string;
    corta: string;
    color: string;
    boton: string;
    anillo: string;
    pide: string;
    suave: string;
    mucho: string;
  }
> = {
  water: {
    label: 'AGUA',
    accion: 'REGAR',
    corta: 'REGAR',
    color: '#4892C4',
    boton: 'bg-agua-boton',
    anillo: 'shadow-[0_0_0_5px_rgba(72,146,196,.35)] lg:shadow-[0_0_0_6px_rgba(72,146,196,.35)]',
    pide: '¡Tengo sed! ¿Me riegas?',
    suave: '¿Me das un poquito de agua?', // TODO: revisar
    mucho: '¡Glu, glu! Ya tengo mucha agua.', // TODO: revisar
  },
  sun: {
    label: 'SOL',
    accion: 'DAR SOL',
    corta: 'DAR SOL',
    color: '#FFCD33',
    boton: 'bg-sol',
    anillo: 'shadow-[0_0_0_5px_rgba(255,205,51,.55)] lg:shadow-[0_0_0_6px_rgba(255,205,51,.55)]',
    pide: '¡Quiero sol!',
    suave: '¿Me llevas a un ratito de sol?', // TODO: revisar
    mucho: '¡Uf, qué calor! Mucho sol.', // TODO: revisar
  },
  love: {
    label: 'CARIÑO',
    accion: 'DAR CARIÑO',
    corta: 'CARIÑO',
    color: '#F07A5C',
    boton: 'bg-coral-suave',
    anillo: 'shadow-[0_0_0_5px_rgba(240,122,92,.35)] lg:shadow-[0_0_0_6px_rgba(240,122,92,.35)]',
    pide: '¿Me das cariño?',
    suave: '¿Me cantas una canción?', // TODO: revisar
    mucho: '¡Ya me apapachaste mucho!', // TODO: revisar
  },
};

/** Tamaño de la mascota según la etapa (crece con un rebote al avanzar). */
const ESCALA = [0.7, 0.8, 0.9, 1];
const ESPERA_RESULTADO = 1600;

function mensaje(s: CultivaState) {
  // TODO: revisar — mensajes del globo además de los del README.
  if (s.status === 'won') return '¡Florecí! ¡Gracias por cuidarme!';
  if (s.status === 'done') return '¡Gracias por cuidarme esta semana!';
  if (s.grew) return `¡Mira, crecí! Ya soy ${ETAPAS[s.stage].toLowerCase()}.`;
  const demasiado = MEDIDORES.find((m) => s[m] > RANGO.max);
  if (demasiado) return INFO[demasiado].mucho;
  const n = necesidad(s);
  return s[n] < RANGO.min ? INFO[n].pide : INFO[n].suave;
}

function estado(v: number): { texto: string; alerta: boolean } {
  if (v < RANGO.min) return { texto: '¡Muy poca!', alerta: true };
  if (v > RANGO.max) return { texto: '¡Demasiada!', alerta: true };
  return { texto: 'Bien', alerta: false };
}

function PauseIcon() {
  return (
    <>
      <span className="h-4 w-[5px] rounded-sm bg-tinta" />
      <span className="h-4 w-[5px] rounded-sm bg-tinta" />
    </>
  );
}

export default function Cultiva() {
  usePageTitle('Cultiva tu planta');
  const [state, dispatch] = usePersistentReducer('cultiva', cultivaReducer, createCultiva, isCultivaInProgress);
  const [verResultado, setVerResultado] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const jugando = state.status === 'playing';
  const recomendada = necesidad(state);

  // Al terminar, deja ver la planta un momento y luego muestra el resultado.
  useEffect(() => {
    if (jugando) return;
    const t = window.setTimeout(() => setVerResultado(true), ESPERA_RESULTADO);
    return () => window.clearTimeout(t);
  }, [jugando]);

  const reiniciar = () => {
    dialogRef.current?.close();
    setVerResultado(false);
    dispatch({ type: 'reset' });
  };

  if (verResultado) {
    return (
      <Resultado
        game="cultiva"
        score={state.stage}
        total={ULTIMA_ETAPA}
        resumen={
          state.status === 'won'
            ? `¡Tu planta floreció en el día ${state.day}!`
            : `Tu planta llegó a la etapa ${ETAPAS[state.stage]}.`
        }
        onReplay={reiniciar}
      />
    );
  }

  const pausa = () => dialogRef.current?.showModal();

  return (
    <div className="lg:pb-u118">
      <GameBar
        titulo="CULTIVA TU PLANTA"
        sideWidth="lg:w-u220"
        asideInline
        aside={
          <>
            <StatusPill tone="arena">
              <span className="md:hidden" aria-hidden="true">
                DÍA {state.day}/{DIAS}
              </span>
              <span className="hidden md:inline">
                DÍA {state.day} DE {DIAS}
              </span>
              <span className="sr-only md:hidden">
                Día {state.day} de {DIAS}
              </span>
            </StatusPill>
            <button
              type="button"
              onClick={pausa}
              aria-label="Pausa"
              className="hidden h-12 w-12 shrink-0 items-center justify-center gap-[5px] rounded-full border-3 border-tinta hover:bg-arena-suave md:flex"
            >
              <PauseIcon />
            </button>
          </>
        }
      />

      <div className="relative mx-5 mt-[14px] md:mx-auto md:max-w-[760px] md:px-10 lg:mx-u96 lg:mt-u18 lg:h-u500 lg:max-w-none lg:px-0">
        {/* Escena */}
        <div className="relative h-[320px] overflow-hidden rounded-[22px] border-3 border-hoja bg-hoja-suave md:h-[400px] lg:absolute lg:inset-0 lg:h-auto lg:rounded-game">
          <button
            type="button"
            onClick={pausa}
            aria-label="Pausa"
            className="absolute left-[14px] top-[14px] z-10 flex h-11 w-11 items-center justify-center gap-[5px] rounded-full border-3 border-tinta bg-campo md:hidden"
          >
            <PauseIcon />
          </button>

          <img
            src={asset('mascot.png')}
            alt={`Tu plantita, etapa ${ETAPAS[state.stage].toLowerCase()}`}
            style={{ transform: `scale(${ESCALA[state.stage]})` }}
            className="absolute left-[14px] top-[70px] w-[320px] origin-bottom transition-transform duration-700 ease-[cubic-bezier(.34,1.56,.64,1)] md:left-1/2 md:top-[110px] md:-ml-[200px] md:w-[400px] lg:left-u46 lg:top-u118 lg:ml-0 lg:w-u470"
          />

          <p
            aria-live="polite"
            className="absolute right-4 top-4 max-w-[62%] rounded-2xl border-3 border-tinta bg-campo px-[14px] py-[10px] text-base font-semibold leading-5 md:right-auto md:left-1/2 md:top-6 md:max-w-none md:px-5 md:py-3 md:text-xl md:leading-[26px] lg:left-u300 lg:top-u38"
          >
            <span key={`${state.day}-${state.status}`} className="motion-safe:animate-aparece">
              {mensaje(state)}
            </span>
            <span
              aria-hidden="true"
              className="absolute -bottom-[9px] left-6 h-[13px] w-[13px] rotate-45 border-b-3 border-r-3 border-tinta bg-campo md:-bottom-[11px] md:left-[34px] md:h-4 md:w-4"
            />
          </p>

          <ol
            aria-label="Etapas de la planta"
            className="absolute inset-x-0 bottom-[14px] flex items-center justify-center gap-1.5 font-display text-sm md:gap-[10px] md:text-base lg:bottom-u26 lg:left-u40 lg:right-auto lg:justify-start"
          >
            {ETAPAS.map((etapa, i) => (
              <Fragment key={etapa}>
                {i > 0 && (
                  <li aria-hidden="true" className={cx('h-[3px] w-3 rounded-sm md:w-[26px]', i <= state.stage ? 'bg-hoja' : 'bg-hoja-muted')} />
                )}
                <li className="flex items-center gap-1.5 md:gap-[10px]" aria-current={i === state.stage ? 'step' : undefined}>
                  <span
                    aria-hidden="true"
                    className={cx(
                      'rounded-full',
                      i < state.stage && 'h-[11px] w-[11px] bg-hoja md:h-[14px] md:w-[14px]',
                      i === state.stage && 'h-[14px] w-[14px] bg-sol shadow-[0_0_0_2.5px_#0F2E22] md:h-[18px] md:w-[18px] md:shadow-[0_0_0_3px_#0F2E22]',
                      i > state.stage && 'hidden h-[14px] w-[14px] border-2.5 border-hoja-muted md:block',
                    )}
                  />
                  <span className={cx(i > state.stage && 'text-[#5E8B70]')}>{etapa}</span>
                </li>
              </Fragment>
            ))}
          </ol>
        </div>

        {/* Panel de necesidades y acciones */}
        <div className="lg:absolute lg:left-u623 lg:top-u43 lg:w-u584">
          <h2 className="mt-5 hidden text-[28px] leading-8 md:block lg:mt-0 lg:text-[32px] lg:leading-9">¿QUÉ NECESITA HOY?</h2>
          <div className="mt-[18px] flex flex-col gap-3 md:mt-[22px] md:gap-4">
            {MEDIDORES.map((m) => {
              const e = estado(state[m]);
              return (
                <ProgressBar
                  key={m}
                  label={INFO[m].label}
                  value={state[m]}
                  color={INFO[m].color}
                  status={e.texto}
                  statusTone={e.alerta ? 'alerta' : 'ok'}
                />
              );
            })}
          </div>
          <div className="mt-5 grid grid-cols-3 gap-[10px] md:gap-[14px] lg:mt-[30px]">
            {MEDIDORES.map((m) => (
              <button
                key={m}
                type="button"
                disabled={!jugando}
                onClick={() => dispatch({ type: 'act', medidor: m })}
                aria-label={`${INFO[m].accion}${jugando && m === recomendada ? ' (recomendado)' : ''}`}
                className={cx(
                  'flex h-16 items-center justify-center rounded-[18px] border-3 border-tinta px-1 font-display text-lg leading-5 text-tinta transition-[transform,filter] duration-150 hover:-translate-y-0.5 hover:brightness-95 disabled:opacity-55 md:text-xl lg:h-[72px] lg:rounded-[20px] lg:text-2xl',
                  INFO[m].boton,
                  jugando && m === recomendada && INFO[m].anillo,
                )}
              >
                <span className="md:hidden">{INFO[m].corta}</span>
                <span className="hidden md:inline">{INFO[m].accion}</span>
              </button>
            ))}
          </div>
          <p className="mt-[14px] text-center text-base leading-[23px] text-hoja-texto md:text-lg md:leading-[26px] lg:mt-5 lg:text-left">
            Cada acción cuenta como un día. ¡Haz que florezca antes del día {DIAS}!
          </p>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby="pausa-titulo"
        className="w-[calc(100%-40px)] max-w-[420px] rounded-card-lg border-3 border-tinta bg-crema p-0 text-tinta backdrop:bg-tinta/40"
      >
        <div className="flex flex-col items-center gap-3 px-6 pb-7 pt-6 text-center">
          <img src={asset('mascot.png')} alt="" className="w-40" />
          <h2 id="pausa-titulo" className="text-[40px] leading-[44px]">
            PAUSA
          </h2>
          <p className="text-m-body">Tu planta te espera. ¿Qué quieres hacer?</p>
          <Button autoFocus onClick={() => dialogRef.current?.close()} className="mt-2 w-full">
            CONTINUAR
          </Button>
          <Button variant="secondary" onClick={reiniciar} className="w-full">
            EMPEZAR DE NUEVO
          </Button>
          <Button variant="secondary" to="/juegos" className="w-full">
            SALIR
          </Button>
        </div>
      </dialog>
    </div>
  );
}
