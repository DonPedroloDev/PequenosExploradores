import { cx } from '../lib/cx';

/** Etiqueta informativa: borde verde, texto verde, Lilita. */
export function Tag({ children, className }: { children: string; className?: string }) {
  return (
    <span
      className={cx(
        'inline-flex h-8 items-center whitespace-nowrap rounded-full border-2.5 border-hoja px-3 font-display text-[15px] text-hoja md:h-[34px] md:px-[14px] md:text-base',
        className,
      )}
    >
      {children}
    </span>
  );
}
