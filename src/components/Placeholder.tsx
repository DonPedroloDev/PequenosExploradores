import { cx } from '../lib/cx';

/** Recuadro rayado para ilustraciones que aún no existen. */
export function Placeholder({ label, className }: { label: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={`Ilustración pendiente: ${label}`}
      className={cx(
        'rayado flex items-center justify-center rounded-xl p-2 text-center font-mono text-[10.5px] font-medium text-tinta/60 md:text-xs',
        className,
      )}
    >
      <span aria-hidden="true">ilustración: {label}</span>
    </div>
  );
}
