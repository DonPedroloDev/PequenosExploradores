import { cx } from '../lib/cx';

/** Segmentos de progreso de los pasos: completado (verde), actual (amarillo), pendiente. */
export function StepDots({ current, total = 4 }: { current: number; total?: number }) {
  return (
    <div className="flex gap-[5px] md:gap-1.5" aria-hidden="true">
      {Array.from({ length: total }, (_, i) => {
        const n = i + 1;
        return (
          <span
            key={n}
            className={cx(
              'h-[10px] w-9 rounded-[5px] md:w-11',
              n < current && 'bg-hoja',
              n === current && 'bg-sol shadow-[inset_0_0_0_2px_#0F2E22]',
              n > current && 'bg-hoja-suave shadow-[inset_0_0_0_2px_#9CC5A8]',
            )}
          />
        );
      })}
    </div>
  );
}
