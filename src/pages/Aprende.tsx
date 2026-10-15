import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { cardClasses } from '../components/Card';
import { Cloud, Rays } from '../components/Decor';
import { pasos } from '../data/pasos';
import { usePageTitle } from '../hooks/usePageTitle';
import { asset } from '../lib/assets';
import { cx } from '../lib/cx';

/** Encuadre de cada ilustración en las tarjetas de escritorio (D02). */
const ENCUADRE: Record<number, string> = {
  1: 'lg:left-u40 lg:top-u13 lg:w-u243',
  2: 'lg:left-u27 lg:top-u12 lg:w-u265',
  3: 'lg:left-u36 lg:top-u9 lg:w-u243',
  4: 'lg:left-u33 lg:top-u24 lg:w-u242',
};

export default function Aprende() {
  usePageTitle('Aprende a cuidar tu planta');
  return (
    <div className="relative px-5 text-center md:px-10 lg:h-u710 lg:px-0">
      <Cloud n={2} className="absolute left-[10px] top-[30px] w-[70px] md:left-6 md:w-[100px] lg:left-u22 lg:top-u120 lg:w-u111" />
      <Cloud n={3} className="absolute hidden lg:left-u1278 lg:top-u7 lg:block lg:w-u145" />
      <img
        src={asset('mascot.png')}
        alt=""
        className="mx-auto mt-1 w-[270px] md:w-[340px] lg:absolute lg:left-u930 lg:top-u21 lg:m-0 lg:w-u445"
      />
      <Rays className="hidden lg:absolute lg:left-u128 lg:top-u32 lg:block lg:w-u52" />
      <Rays className="hidden lg:absolute lg:left-u276 lg:top-u126 lg:block lg:w-u38" />
      <Rays flip className="hidden lg:absolute lg:left-u790 lg:top-u124 lg:block lg:w-u40" />

      <h1 className="relative mt-[10px] text-m-h1 md:text-[62px] md:leading-[60px] lg:absolute lg:left-u151 lg:top-u31 lg:m-0 lg:w-u800 lg:text-u82 lg:leading-u80">
        APRENDE A CUIDAR <br className="hidden md:inline" />
        TU PLANTA
      </h1>
      <p className="mt-[10px] font-medium text-m-lead md:text-[24px] md:leading-[32px] lg:absolute lg:left-u139 lg:top-u199 lg:m-0 lg:w-u800 lg:whitespace-nowrap lg:text-u29 lg:leading-u36">
        Sigue estos pasos para ayudarla a crecer sana y fuerte.
      </p>

      <ol className="mt-5 grid grid-cols-2 gap-3 md:mt-8 md:gap-4 lg:absolute lg:left-u56 lg:top-u280 lg:m-0 lg:w-u1328 lg:grid-cols-4 lg:gap-u16">
        {pasos.map((p) => (
          <li key={p.n}>
            <Link
              to={`/aprende/paso/${p.n}`}
              className={cx(
                cardClasses(p.variante, { interactive: true }),
                'relative flex h-[196px] flex-col items-center justify-center gap-2 md:h-[240px] lg:block lg:h-u278',
              )}
            >
              <img src={asset(p.imagen)} alt="" className={cx('h-[118px] w-auto md:h-[150px] lg:absolute lg:h-auto', ENCUADRE[p.n])} />
              <span className="font-display text-[22px] leading-6 md:text-[30px] md:leading-8 lg:absolute lg:inset-x-0 lg:top-u222 lg:text-center lg:text-u34 lg:leading-u34">
                {p.n}. {p.nombre}
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <div className="mt-[22px] flex justify-center md:mt-8 lg:absolute lg:left-u508 lg:top-u584 lg:m-0 lg:items-start">
        <Rays className="hidden lg:mr-u20 lg:mt-u4 lg:block lg:w-u42" />
        <Button to="/aprende/paso/1" size="hero" className="w-full md:w-[300px] lg:w-u300">
          COMENZAR
        </Button>
        <Rays flip className="hidden lg:ml-u18 lg:mt-u4 lg:block lg:w-u42" />
      </div>
    </div>
  );
}
