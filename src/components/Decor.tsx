import { asset } from '../lib/assets';
import { cx } from '../lib/cx';

/** Tres trazos amarillos que flanquean títulos y botones. `flip` = lado derecho (espejo). */
export function Rays({ flip = false, className }: { flip?: boolean; className?: string }) {
  return (
    <span aria-hidden="true" className={cx('pointer-events-none block shrink-0', flip && '-scale-x-100', className)}>
      <img
        src={asset('rays.svg')}
        alt=""
        className={cx('block w-full motion-safe:animate-pulso', flip ? 'origin-left' : 'origin-right')}
      />
    </span>
  );
}

const CLOUDS = { 1: 'cloud.png', 2: 'cloud-2.png', 3: 'cloud-3.png' } as const;

/** Nube verde decorativa. Posiciónala con className (absolute + coordenadas). */
export function Cloud({ n = 1, className }: { n?: 1 | 2 | 3; className?: string }) {
  return <img src={asset(CLOUDS[n])} alt="" aria-hidden="true" className={cx('pointer-events-none select-none', className)} />;
}

/** Arbustos en las esquinas inferiores de la página, por encima del contenido. */
export function Bushes() {
  return (
    <div aria-hidden="true">
      <img
        src={asset('bush-left.png')}
        alt=""
        className="pointer-events-none absolute bottom-0 left-0 z-10 w-[104px] select-none md:w-[160px] lg:w-u206"
      />
      <img
        src={asset('bush-right.png')}
        alt=""
        className="pointer-events-none absolute bottom-0 right-0 z-10 w-[114px] select-none md:w-[176px] lg:w-u227"
      />
    </div>
  );
}
