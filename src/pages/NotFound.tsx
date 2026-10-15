import { Button } from '../components/Button';
import { Cloud } from '../components/Decor';
import { usePageTitle } from '../hooks/usePageTitle';
import { asset } from '../lib/assets';

export default function NotFound() {
  usePageTitle('Página no encontrada');
  return (
    <div className="relative flex flex-col items-center px-5 text-center md:px-10 lg:pb-u160">
      <Cloud n={2} className="absolute left-[10px] top-10 w-[70px] lg:left-u160 lg:top-u100 lg:w-u120" />
      <Cloud n={3} className="absolute right-[10px] top-2 w-[84px] lg:right-u160 lg:top-u50 lg:w-u150" />
      <img src={asset('mascot.png')} alt="" className="mt-4 w-[260px] -rotate-6 md:w-[340px] lg:mt-u4 lg:w-u400" />
      <p className="mt-4 font-display text-[64px] leading-none text-hoja md:text-[84px]">404</p>
      <h1 className="mt-2 max-w-[760px] text-[38px] leading-[40px] md:text-[56px] md:leading-[56px]">
        ¡UPS! ESTA PÁGINA SE PERDIÓ EN EL BOSQUE.
      </h1>
      <p className="mt-3 text-m-lead font-medium md:text-[24px] md:leading-8">Vamos de regreso por el camino.</p>
      <div className="mt-6 flex w-full flex-col gap-3 md:w-auto md:flex-row">
        <Button to="/">VOLVER AL INICIO</Button>
        <Button to="/juegos" variant="secondary">
          IR A JUGAR
        </Button>
      </div>
    </div>
  );
}
