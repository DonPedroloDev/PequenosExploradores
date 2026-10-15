import { cx } from '../lib/cx';

/** Chip de filtro (toggle). Activo = fondo amarillo. */
export function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: string }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cx(
        'inline-flex h-[42px] shrink-0 items-center whitespace-nowrap rounded-full px-[18px] font-display text-[17px] text-tinta transition-colors duration-150 md:h-12 md:px-6 md:text-xl',
        active ? 'bg-sol' : 'border-2.5 border-hoja bg-campo hover:bg-arena-suave',
      )}
    >
      {children}
    </button>
  );
}
