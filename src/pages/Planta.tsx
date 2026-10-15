import { useParams } from 'react-router-dom';
import { BackLink } from '../components/BackLink';
import { Button } from '../components/Button';
import { Card, type CardVariant } from '../components/Card';
import { Placeholder } from '../components/Placeholder';
import { Tag } from '../components/Tag';
import { getPlanta } from '../data/plantas';
import { usePageTitle } from '../hooks/usePageTitle';
import { asset } from '../lib/assets';
import NotFound from './NotFound';

export default function Planta() {
  const { slug = '' } = useParams();
  const planta = getPlanta(slug);
  usePageTitle(planta ? planta.nombre.charAt(0) + planta.nombre.slice(1).toLowerCase() : 'Página no encontrada');
  if (!planta) return <NotFound />;

  const fichas: { titulo: string; texto: string; icono: string; alto: string; variante: CardVariant }[] = [
    { titulo: 'AGUA', texto: planta.agua, icono: 'icon-cuida.png', alto: 'h-12', variante: 'amarillo' },
    { titulo: 'LUZ', texto: planta.luz, icono: 'step-luz.png', alto: 'h-14', variante: 'verde' },
    { titulo: 'CRECE EN', texto: planta.creceEn, icono: 'icon-aprende.png', alto: 'h-[50px]', variante: 'coral' },
  ];

  return (
    <div className="px-5 md:mx-auto md:max-w-[760px] md:px-10 lg:max-w-none lg:px-u96 lg:pb-u120 lg:pt-u16">
      <BackLink to="/aprende/plantas" className="mt-1.5 lg:mt-0 lg:h-u28 lg:min-h-0">
        TODAS LAS PLANTAS
      </BackLink>

      <div className="lg:mt-u16 lg:flex lg:gap-u64">
        <Card
          variant="amarillo"
          className="mt-3 h-[260px] rounded-[20px] p-[14px] md:h-[400px] lg:mt-0 lg:h-u500 lg:w-u540 lg:shrink-0 lg:rounded-card-lg lg:p-5"
        >
          <Placeholder label={`${planta.slug} (estilo de la mascota)`} className="h-full md:rounded-2xl" />
        </Card>

        <div className="flex flex-col lg:w-u644">
          <div className="mt-4 flex gap-2 lg:mt-0">
            {[...planta.etiquetas].reverse().map((t) => (
              <Tag key={t}>{t.toUpperCase()}</Tag>
            ))}
          </div>
          <h1 className="mt-[10px] text-[58px] leading-[56px] lg:text-display-lg">{planta.nombre}</h1>
          <p className="mt-1 text-[19px] font-medium leading-[26px] lg:mt-1.5 lg:text-[26px] lg:leading-[34px]">{planta.frase}</p>

          <ul className="mt-4 flex flex-col gap-[10px] lg:mt-[22px] lg:grid lg:grid-cols-3 lg:gap-[18px]">
            {fichas.map((f) => (
              <li key={f.titulo}>
                <Card
                  variant={f.variante}
                  className="flex h-20 items-center gap-[14px] px-[14px] lg:h-full lg:min-h-[168px] lg:flex-col lg:gap-0 lg:px-[14px] lg:py-3 lg:text-center"
                >
                  <span className="flex w-16 justify-center lg:w-auto">
                    <img src={asset(f.icono)} alt="" className={`${f.alto} lg:h-[70px]`} />
                  </span>
                  <span>
                    <span className="block font-display text-lg leading-[22px] lg:mt-2 lg:text-xl">{f.titulo}</span>
                    <span className="block text-base font-medium leading-[22px] lg:mt-1 lg:text-[17px]">{f.texto}</span>
                  </span>
                </Card>
              </li>
            ))}
          </ul>

          <h2 className="mt-5 text-[21px] leading-[26px] lg:mt-6 lg:text-2xl lg:leading-7">DATOS CURIOSOS</h2>
          <ul className="mt-2 flex flex-col gap-2 lg:mt-[10px]">
            {planta.datos.map((d) => (
              <li key={d} className="flex items-start gap-[10px] text-[17px] leading-6 lg:items-center lg:gap-3 lg:text-[21px] lg:leading-7">
                <span
                  aria-hidden="true"
                  className="mt-[7px] h-[10px] w-[10px] flex-none rounded-full bg-sol shadow-[0_0_0_2px_#0F2E22] lg:mt-0 lg:h-3 lg:w-3"
                />
                {d}
              </li>
            ))}
          </ul>

          <Button to="/aprende/paso/1" className="mt-[22px] lg:mt-6 lg:self-start">
            APRENDE A SEMBRARLA
          </Button>
        </div>
      </div>
    </div>
  );
}
