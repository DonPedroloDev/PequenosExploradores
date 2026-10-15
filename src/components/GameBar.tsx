import type { ReactNode } from 'react';
import { cx } from '../lib/cx';
import { BackLink } from './BackLink';

type Props = {
  titulo: string;
  /** Contenido a la derecha (contador, día, pausa…). */
  aside?: ReactNode;
  /** En móvil, el aside va en la misma fila (Cultiva) o en una fila debajo. */
  asideInline?: boolean;
  /** Ancho de las columnas laterales en escritorio para centrar el título. */
  sideWidth: string;
};

/** Barra superior de los juegos: volver · título · estado. */
export function GameBar({ titulo, aside, asideInline = false, sideWidth }: Props) {
  return (
    <div className="px-5 md:px-10 lg:px-u96">
      <div className="mt-1 flex items-center justify-between gap-[10px] md:mt-[14px] md:h-[60px] md:gap-4">
        <div className={cx('flex shrink-0 md:flex-1 lg:flex-none', sideWidth)}>
          <BackLink to="/juegos" compact srLabel="Volver a juegos">
            JUEGOS
          </BackLink>
        </div>
        <h1 className={cx('text-center text-2xl leading-[26px] md:text-[36px] md:leading-10 lg:text-h2-game', !asideInline && 'mr-auto md:mr-0')}>
          {titulo}
        </h1>
        <div
          className={cx(
            'items-center justify-end gap-[10px] md:flex md:flex-1 lg:flex-none',
            asideInline ? 'flex shrink-0' : 'hidden',
            sideWidth,
          )}
        >
          {aside}
        </div>
      </div>
      {!asideInline && aside && <div className="mt-3 md:hidden">{aside}</div>}
    </div>
  );
}

/** Pill de estado de la barra (DÍA n DE 7, n / 10…). */
export function StatusPill({ children, tone }: { children: ReactNode; tone: 'arena' | 'hoja' | 'sol' }) {
  return (
    <span
      className={cx(
        'inline-flex h-10 shrink-0 items-center whitespace-nowrap rounded-full px-[14px] font-display text-[17px] md:h-12 md:px-5 md:text-xl',
        tone === 'arena' && 'border-3 border-arena bg-arena-suave',
        tone === 'hoja' && 'border-3 border-hoja bg-hoja-suave',
        tone === 'sol' && 'bg-sol',
      )}
    >
      {children}
    </span>
  );
}
