import { Link } from 'react-router-dom';
import { cx } from '../lib/cx';

export function ArrowLeft({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 22 16" className={className} aria-hidden="true">
      <path d="M9 2 L3 8 L9 14 M3 8 H20" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 22 16" className={className} aria-hidden="true">
      <path d="M13 2 L19 8 L13 14 M19 8 H2" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type Props = {
  to: string;
  children: string;
  /** En móvil se muestra como botón circular de 44 px (barras de juego). */
  compact?: boolean;
  /** Nombre accesible en la versión compacta, p. ej. "Volver a juegos". */
  srLabel?: string;
  className?: string;
};

/** Enlace "volver": flecha + texto Lilita verde. */
export function BackLink({ to, children, compact = false, srLabel, className }: Props) {
  return (
    <Link
      to={to}
      aria-label={compact ? srLabel : undefined}
      className={cx(
        'inline-flex shrink-0 items-center font-display text-hoja no-underline hover:text-tinta',
        compact
          ? 'h-11 w-11 justify-center rounded-full border-3 border-tinta text-tinta md:h-auto md:w-auto md:justify-start md:gap-[10px] md:rounded-none md:border-0 md:text-lg md:text-hoja'
          : 'min-h-11 gap-2 text-base md:gap-[10px] md:text-lg',
        className,
      )}
    >
      <ArrowLeft className={cx('h-[14px] w-5 md:h-4 md:w-[22px]', compact && 'w-[18px]')} />
      <span className={cx(compact && 'hidden md:inline')}>{children}</span>
    </Link>
  );
}
