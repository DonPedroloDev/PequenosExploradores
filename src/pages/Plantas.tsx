import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from '../components/BackLink';
import { cardClasses } from '../components/Card';
import { Chip } from '../components/Chip';
import { Cloud, Rays } from '../components/Decor';
import { Placeholder } from '../components/Placeholder';
import { filtros, plantas, type Categoria } from '../data/plantas';
import { usePageTitle } from '../hooks/usePageTitle';
import { asset } from '../lib/assets';
import { cx } from '../lib/cx';

export default function Plantas() {
  usePageTitle('Conoce las plantas');
  const [filtro, setFiltro] = useState<Categoria | 'todas'>('todas');
  const visibles = filtro === 'todas' ? plantas : plantas.filter((p) => p.categorias.includes(filtro));

  return (
    <div className="relative lg:pb-u92">
      <img
        src={asset('step-luz.png')}
        alt=""
        className="absolute right-[10px] top-1 w-[118px] md:right-10 md:w-[170px] lg:-top-u4 lg:left-u1110 lg:right-auto lg:w-u236"
      />
      <Cloud n={3} className="absolute hidden lg:left-u940 lg:top-u18 lg:block lg:w-u130" />
      <Rays className="hidden lg:absolute lg:left-u44 lg:top-u26 lg:block lg:w-u40" />

      <div className="px-5 md:px-10 lg:px-u96 lg:pt-u24">
        <h1 className="relative mt-[14px] text-m-h1 md:text-[62px] md:leading-[60px] lg:m-0 lg:whitespace-nowrap lg:text-u82 lg:leading-u80">
          CONOCE <br className="md:hidden" />
          LAS PLANTAS
        </h1>
        <p className="relative mt-[10px] max-w-[calc(100%-110px)] text-m-body font-medium md:max-w-[560px] md:text-[22px] md:leading-[30px] lg:max-w-none lg:text-u28 lg:leading-u36">
          Cada planta es diferente. Descubre qué necesita para crecer feliz.
        </p>
      </div>

      <div
        role="group"
        aria-label="Filtrar plantas"
        className="sin-scrollbar mt-4 flex gap-2 overflow-x-auto px-5 pb-1 pt-1 md:px-10 lg:mt-u36 lg:gap-3 lg:px-u96"
      >
        {filtros.map((f) => (
          <Chip key={f.id} active={filtro === f.id} onClick={() => setFiltro(f.id)}>
            {f.label}
          </Chip>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        {visibles.length === 1 ? 'Se muestra 1 planta' : `Se muestran ${visibles.length} plantas`}
      </p>

      <ul className="mt-4 grid grid-cols-2 gap-3 px-5 md:gap-4 md:px-10 lg:mt-u30 lg:grid-cols-4 lg:gap-u16 lg:px-u56">
        {visibles.map((p) => (
          <li key={p.slug}>
            <Link
              to={`/aprende/plantas/${p.slug}`}
              className={cx(
                cardClasses(p.variante, { interactive: true }),
                'relative flex h-full flex-col px-[10px] pb-3 pt-[10px] md:p-[13px] lg:h-u300',
              )}
            >
              <Placeholder label={p.slug} className="h-[110px] rounded-[10px] md:h-[170px] md:rounded-xl" />
              <span className="mt-[10px] font-display text-[22px] leading-6 md:mt-[14px] md:text-[30px] md:leading-8">
                {p.nombre}
              </span>
              <span className="mt-2 flex gap-2 md:mt-[10px] md:pr-11">
                {p.etiquetas.map((t, i) => (
                  <span
                    key={t}
                    className={cx(
                      'whitespace-nowrap rounded-full border-2 bg-campo px-[10px] py-0.5 text-sm font-semibold leading-5 md:px-3 md:py-[3px] md:text-[15px]',
                      p.variante === 'amarillo' ? 'border-arena' : p.variante === 'coral' ? 'border-coral' : 'border-hoja',
                      i > 0 && 'hidden md:inline',
                    )}
                  >
                    {t}
                  </span>
                ))}
              </span>
              <span
                aria-hidden="true"
                className="absolute bottom-[13px] right-[13px] hidden h-10 w-10 items-center justify-center rounded-full bg-sol md:flex"
              >
                <ArrowRight className="h-4 w-5" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {visibles.length === 0 && <p className="px-5 text-center text-m-body">No encontramos plantas con ese filtro.</p>}
    </div>
  );
}
