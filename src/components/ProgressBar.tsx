import { cx } from '../lib/cx';

type Props = { label: string; value: number; color: string; status?: string; statusTone?: 'ok' | 'alerta' };

/** Medidor del juego Cultiva (0–100). */
export function ProgressBar({ label, value, color, status, statusTone = 'ok' }: Props) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div>
      <div className="flex justify-between font-display text-[17px] leading-[22px] md:text-xl md:leading-6">
        <span>{label}</span>
        {status && (
          <span
            className={cx(
              'font-body text-sm font-semibold leading-[22px] md:text-base md:leading-6',
              statusTone === 'alerta' && 'text-error',
            )}
          >
            {status}
          </span>
        )}
      </div>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={v}
        aria-valuetext={status ? `${v} de 100, ${status}` : undefined}
        className="mt-1.5 h-[18px] overflow-hidden rounded-[9px] border-2.5 border-tinta bg-campo md:mt-2 md:h-[22px] md:rounded-[11px]"
      >
        <div className="h-full transition-[width] duration-500 ease-out" style={{ width: `${v}%`, background: color }} />
      </div>
    </div>
  );
}
