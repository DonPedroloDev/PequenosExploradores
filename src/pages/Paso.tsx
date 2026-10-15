import { Link, useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { StepDots } from '../components/StepDots';
import { getPaso, pasos } from '../data/pasos';
import { usePageTitle } from '../hooks/usePageTitle';
import { asset } from '../lib/assets';
import NotFound from './NotFound';

export default function Paso() {
  const { n } = useParams();
  const paso = getPaso(Number(n));
  usePageTitle(paso ? `Paso ${paso.n}: ${paso.nombre.toLowerCase()}` : 'Página no encontrada');
  if (!paso || String(paso.n) !== n) return <NotFound />;

  const anterior = getPaso(paso.n - 1);
  const siguiente = getPaso(paso.n + 1);
  const total = pasos.length;

  return (
    <div className="px-5 md:mx-auto md:max-w-[760px] md:px-10 lg:flex lg:max-w-none lg:gap-u64 lg:px-u96 lg:pb-u160 lg:pt-u32">
      {/* Encabezado móvil: paso + segmentos */}
      <div className="mt-2 flex items-center justify-between lg:hidden">
        <span className="font-display text-[17px] text-hoja md:text-xl">
          PASO {paso.n} DE {total}
        </span>
        <StepDots current={paso.n} total={total} />
      </div>

      <Card
        variant={paso.variante}
        className="relative mt-[14px] flex h-[250px] items-center justify-center rounded-[20px] md:h-[360px] lg:mt-0 lg:h-u518 lg:w-u540 lg:shrink-0 lg:rounded-card-lg"
      >
        <span
          aria-hidden="true"
          className="absolute left-[14px] top-[14px] flex h-[52px] w-[52px] items-center justify-center rounded-full bg-sol font-display text-[32px] md:left-6 md:top-6 md:h-[72px] md:w-[72px] md:text-[44px]"
        >
          {paso.n}
        </span>
        <img src={asset(paso.imagen)} alt={paso.alt} className="mt-5 w-[240px] md:w-[340px] lg:mt-u40 lg:w-u430" />
      </Card>

      <div className="flex flex-col lg:w-u644">
        <div className="hidden h-8 items-center justify-between lg:flex">
          <div className="flex items-center gap-[14px]">
            <span className="font-display text-xl text-hoja">
              PASO {paso.n} DE {total}
            </span>
            <StepDots current={paso.n} total={total} />
          </div>
          <Link to="/aprende" className="font-display text-lg text-hoja underline underline-offset-4 hover:text-tinta">
            VER TODOS LOS PASOS
          </Link>
        </div>

        <h1 className="mt-[18px] text-[58px] leading-[56px] lg:mt-[14px] lg:text-[76px] lg:leading-[72px]">{paso.nombre}</h1>
        <p className="mt-1.5 font-medium text-[19px] leading-[26px] lg:text-2xl lg:leading-8">{paso.subtitulo}</p>

        <ol className="mt-[18px] flex flex-col gap-3 lg:mt-[22px]">
          {paso.instrucciones.map((texto, i) => (
            <li key={i} className="flex items-start gap-3 lg:min-h-10 lg:items-center lg:gap-4">
              <span
                aria-hidden="true"
                className="flex h-[34px] w-[34px] flex-none items-center justify-center rounded-full bg-sol font-display text-[19px] lg:h-10 lg:w-10 lg:text-[22px]"
              >
                {i + 1}
              </span>
              <span className="pt-1 text-m-body lg:pt-0 lg:text-body-lg">{texto}</span>
            </li>
          ))}
        </ol>

        <aside className="mt-[18px] rounded-card border-3 border-coral bg-coral-suave px-4 pb-[14px] pt-3 lg:mt-[22px] lg:rounded-[18px] lg:px-5 lg:pb-4 lg:pt-[14px]">
          <h2 className="text-[19px] leading-6 lg:text-[22px] lg:leading-[26px]">¿SABÍAS QUE…?</h2>
          <p className="mt-1 text-[17px] leading-6 lg:text-xl lg:leading-7">{paso.dato}</p>
        </aside>

        <div className="mt-[22px] flex flex-col-reverse gap-[10px] lg:mt-[26px] lg:flex-row lg:justify-end lg:gap-[14px]">
          <Button
            to={anterior ? `/aprende/paso/${anterior.n}` : '/aprende'}
            disabled={!anterior}
            variant="secondary"
            className="h-14 text-xl lg:h-[60px] lg:px-[30px] lg:text-2xl"
          >
            ANTERIOR
          </Button>
          <Button to={siguiente ? `/aprende/paso/${siguiente.n}` : '/juegos/cultiva'}>
            {siguiente ? `SIGUIENTE PASO: ${siguiente.nombre}` : '¡TERMINÉ!'}
          </Button>
        </div>

        <Link
          to="/aprende"
          className="mt-4 self-center font-display text-base text-hoja underline underline-offset-4 hover:text-tinta lg:hidden"
        >
          VER TODOS LOS PASOS
        </Link>
      </div>
    </div>
  );
}
