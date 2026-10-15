import { useEffect, useRef, useState } from 'react';
import { usePageTitle } from '../hooks/usePageTitle';
import { asset } from '../lib/assets';
import { cx } from '../lib/cx';
import { insignias, registrarPartida, type GameId } from '../lib/progreso';
import { Button } from './Button';
import { Confetti } from './Confetti';
import { Cloud, Rays } from './Decor';

type Props = {
  game: GameId;
  score: number;
  total: number;
  /** Resumen de la partida, p. ej. "Respondiste 4 de 5 preguntas correctas." */
  resumen: string;
  onReplay: () => void;
};

/** Pantalla de resultado compartida por los 3 juegos (D11 / M11). Guarda la insignia en localStorage. */
export function Resultado({ game, score, total, resumen, onReplay }: Props) {
  usePageTitle('Resultado');
  const [registro, setRegistro] = useState<{ gana: boolean; nueva: boolean } | null>(null);
  const registrado = useRef(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (registrado.current) return;
    registrado.current = true;
    setRegistro(registrarPartida(game, score, total));
  }, [game, score, total]);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  const bien = score / total >= 0.5;
  const insignia = insignias[game];
  // TODO: revisar — texto cuando aún no se gana la insignia.
  const pista = game === 'cultiva' ? `Haz que florezca para ganar: ${insignia}` : `Acierta la mitad para ganar: ${insignia}`;

  return (
    <div className="relative flex flex-col items-center px-5 text-center md:px-10 lg:pb-u100">
      {registro?.gana && <Confetti />}
      <Cloud n={2} className="absolute left-[10px] top-10 w-[70px] lg:left-u160 lg:top-u100 lg:w-u120" />
      <Cloud n={3} className="absolute hidden lg:left-u1130 lg:top-u50 lg:block lg:w-u150" />

      <img
        src={asset('mascot.png')}
        alt=""
        className="mt-4 w-[310px] motion-safe:animate-crece lg:mt-u4 lg:w-u446"
      />
      <div className="mt-4 flex items-start justify-center gap-3 lg:mt-0 lg:gap-u18">
        <Rays className="hidden w-u46 lg:block" />
        <h1 ref={titleRef} tabIndex={-1} className="text-[54px] leading-[52px] outline-none lg:text-u84 lg:leading-u80">
          {bien ? '¡BIEN HECHO!' : '¡BUEN INTENTO!'}
        </h1>
        <Rays flip className="hidden w-u46 lg:block" />
      </div>
      <p className="mt-[10px] text-xl font-medium leading-7 lg:text-u30 lg:leading-u38">{resumen}</p>

      {registro && (
        <p
          className={cx(
            'mt-4 rounded-full px-[18px] py-[10px] font-display text-[17px] leading-5 lg:mt-u24 lg:flex lg:h-12 lg:items-center lg:px-6 lg:py-0 lg:text-[22px]',
            registro.gana ? 'bg-hoja text-crema' : 'border-3 border-arena bg-arena-suave text-tinta',
          )}
        >
          {registro.gana ? `${registro.nueva ? 'NUEVA INSIGNIA' : 'INSIGNIA'}: ${insignia}` : pista.toUpperCase()}
        </p>
      )}

      <div className="mt-[26px] flex w-full flex-col gap-[10px] md:w-auto md:flex-row md:justify-center md:gap-4 lg:mt-u40">
        <Button size="lg" onClick={onReplay}>
          JUGAR OTRA VEZ
        </Button>
        <Button size="lg" variant="secondary" to="/juegos" className="h-[58px] text-[22px] md:h-[72px] md:px-9 md:text-[30px]">
          OTRO JUEGO
        </Button>
      </div>
    </div>
  );
}
