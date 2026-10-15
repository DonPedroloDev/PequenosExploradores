import { Link } from 'react-router-dom';
import { buttonClasses } from '../components/Button';
import { cardClasses, type CardVariant } from '../components/Card';
import { Cloud, Rays } from '../components/Decor';
import { usePageTitle } from '../hooks/usePageTitle';
import { asset } from '../lib/assets';
import { cx } from '../lib/cx';

const JUEGOS: { titulo: string; to: string; img: string; variante: CardVariant; encuadre: string; movil: string }[] = [
  {
    titulo: 'CULTIVA TU PLANTA',
    to: '/juegos/cultiva',
    img: 'game-cultiva.png',
    variante: 'verde',
    encuadre: 'lg:left-u47 lg:top-u12 lg:w-u292',
    movil: 'h-[160px]',
  },
  {
    titulo: 'SEPARA LOS RESIDUOS',
    to: '/juegos/residuos',
    img: 'game-residuos.png',
    variante: 'amarillo',
    encuadre: 'lg:left-u12 lg:top-u13 lg:w-u373',
    movil: 'my-[5px] h-[150px]',
  },
  {
    titulo: 'QUIZ ECOLÓGICO',
    to: '/juegos/quiz',
    img: 'game-quiz.png',
    variante: 'coral',
    encuadre: 'lg:left-u28 lg:top-u25 lg:w-u332',
    movil: 'h-[160px]',
  },
];

export default function Juegos() {
  usePageTitle('Juegos');
  return (
    <div className="relative px-5 text-center md:px-10 lg:h-u710 lg:px-0">
      <Cloud n={2} className="absolute hidden lg:left-u22 lg:top-u122 lg:block lg:w-u111" />
      <Cloud n={3} className="absolute right-2 top-4 w-[84px] md:right-10 md:w-[120px] lg:left-u1278 lg:right-auto lg:top-u7 lg:w-u145" />
      <img src={asset('mascot-juegos.png')} alt="" className="absolute hidden lg:left-u934 lg:top-u37 lg:block lg:w-u431" />

      <div className="relative mt-[22px] flex items-center justify-center gap-[10px] lg:contents">
        <Rays className="w-6 lg:absolute lg:left-u150 lg:top-u44 lg:w-u44" />
        <h1 className="text-[48px] leading-[46px] md:text-[66px] md:leading-[64px] lg:absolute lg:left-u170 lg:top-u48 lg:w-u800 lg:whitespace-nowrap lg:text-u84 lg:leading-u80">
          APRENDE <br className="md:hidden" />
          JUGANDO
        </h1>
        <Rays flip className="w-6 lg:absolute lg:left-u946 lg:top-u44 lg:w-u42" />
      </div>
      <p className="mt-[10px] text-[21px] font-medium leading-7 md:text-[26px] md:leading-8 lg:absolute lg:left-u169 lg:top-u138 lg:m-0 lg:w-u800 lg:text-u34 lg:leading-u40">
        Elige una aventura ecológica.
      </p>

      <ul className="mt-5 flex flex-col gap-[14px] md:mt-8 md:grid md:grid-cols-3 md:gap-4 lg:absolute lg:left-u99 lg:top-u241 lg:m-0 lg:w-u1244 lg:gap-u19">
        {JUEGOS.map((j) => (
          <li key={j.to}>
            <Link
              to={j.to}
              className={cx(
                cardClasses(j.variante, { juego: true, interactive: true }),
                'relative flex h-full flex-col items-center rounded-[18px] px-4 pb-5 pt-4 lg:block lg:h-u369 lg:p-0',
              )}
            >
              <img src={asset(j.img)} alt="" className={cx('w-auto object-contain md:h-[130px] lg:absolute lg:m-0 lg:h-auto', j.movil, j.encuadre)} />
              <span className="mt-[10px] font-display text-[26px] leading-7 md:text-[22px] md:leading-6 lg:absolute lg:inset-x-0 lg:top-u247 lg:m-0 lg:text-u33 lg:leading-u34">
                {j.titulo}
              </span>
              <span
                aria-hidden="true"
                className={cx(buttonClasses({ size: 'card' }), 'mt-3 md:mt-auto lg:absolute lg:left-u91 lg:top-u293 lg:m-0')}
              >
                JUGAR
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
