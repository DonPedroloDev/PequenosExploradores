import { Button } from '../components/Button';
import { Card, cardVariant } from '../components/Card';
import { Cloud, Rays } from '../components/Decor';
import { usePageTitle } from '../hooks/usePageTitle';
import { asset } from '../lib/assets';
import { cx } from '../lib/cx';

/** En escritorio cada ilustración tiene su propio encuadre dentro de la tarjeta (D01). */
const ACCESOS = [
  { label: 'APRENDE', to: '/aprende/plantas', icon: 'icon-aprende.png', lg: 'lg:left-u84 lg:top-u26 lg:w-u146' },
  { label: 'CUIDA', to: '/aprende', icon: 'icon-cuida.png', lg: 'lg:left-u47 lg:top-u18 lg:w-u196' },
  { label: 'JUEGA', to: '/juegos', icon: 'icon-juega.png', lg: 'lg:left-u72 lg:top-u17 lg:w-u194' },
  { label: 'ESCRÍBENOS', to: '/contacto', icon: 'icon-escribenos.png', lg: 'lg:left-u47 lg:top-u19 lg:w-u184' },
];

export default function Inicio() {
  usePageTitle();
  return (
    <div className="relative px-5 md:px-10 lg:h-u710 lg:px-0">
      <Cloud n={1} className="absolute hidden lg:left-u654 lg:top-u21 lg:block lg:w-u106" />
      <Rays className="hidden lg:absolute lg:left-u30 lg:top-u52 lg:block lg:w-u56" />

      <h1 className="mt-[14px] text-m-display md:mt-6 md:text-[66px] md:leading-[64px] lg:absolute lg:left-u95 lg:top-u36 lg:m-0 lg:whitespace-nowrap lg:text-u84 lg:leading-u80">
        ¡EXPLORA,
        <br />
        APRENDE Y <br className="md:hidden" />
        CUIDA!
      </h1>
      <p className="mt-3 font-medium text-m-lead md:mt-4 md:text-[24px] md:leading-[32px] lg:absolute lg:left-u96 lg:top-u209 lg:m-0 lg:whitespace-nowrap lg:text-u30 lg:leading-u37">
        Descubre cómo cuidar las plantas <br className="hidden lg:inline" />y proteger nuestro planeta.
      </p>
      <div className="mt-5 flex items-center gap-[10px] lg:absolute lg:left-u56 lg:top-u304 lg:m-0 lg:items-start lg:gap-0">
        <Rays className="hidden lg:mr-u16 lg:mt-u8 lg:block lg:w-u40" />
        <Button to="/aprende" size="hero" className="w-[230px] lg:w-u280">
          COMENZAR
        </Button>
        <Rays flip className="w-[26px] lg:ml-u12 lg:mt-u12 lg:w-u36" />
      </div>

      <img
        src={asset('hero.png')}
        alt="Niña y niño observando un brote"
        className="-mx-5 mt-[18px] block w-[calc(100%+40px)] max-w-none md:mx-auto md:w-full md:max-w-[760px] lg:absolute lg:-top-u12 lg:left-u573 lg:m-0 lg:w-u867 lg:max-w-none"
      />

      <nav aria-label="Secciones" className="mt-[14px] md:mt-6 lg:absolute lg:left-u56 lg:top-u427 lg:m-0 lg:w-u1328">
        <ul className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4 lg:gap-u16">
          {ACCESOS.map((a, i) => (
            <li key={a.label}>
              <Card
                to={a.to}
                variant={cardVariant(i)}
                className="relative flex h-[168px] flex-col items-center justify-center md:h-[210px] lg:block lg:h-u239"
              >
                <img src={asset(a.icon)} alt="" className={cx('h-[82px] w-auto md:h-[110px] lg:absolute lg:h-auto', a.lg)} />
                <span className="mt-2 font-display text-[25px] leading-[26px] md:text-[32px] md:leading-[34px] lg:absolute lg:inset-x-0 lg:top-u156 lg:m-0 lg:text-center lg:text-u36 lg:leading-u36">
                  {a.label}
                </span>
                <img
                  src={asset('tuft.png')}
                  alt=""
                  className="mt-1.5 w-8 md:w-10 lg:absolute lg:left-u133 lg:top-u201 lg:m-0 lg:w-u48"
                />
              </Card>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
