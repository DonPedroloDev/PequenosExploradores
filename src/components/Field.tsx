import { forwardRef, useId, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { cx } from '../lib/cx';

type BaseProps = { label: string; error?: string; className?: string };
type InputProps = BaseProps & { multiline?: false } & InputHTMLAttributes<HTMLInputElement>;
type TextareaProps = BaseProps & { multiline: true } & TextareaHTMLAttributes<HTMLTextAreaElement>;

const control =
  'block w-full rounded-field border-2 bg-campo font-body text-[17px] text-tinta transition-[border-color,box-shadow] duration-150 focus:border-hoja-form focus:shadow-focus focus:outline-none md:text-input';

/** Campo de formulario con etiqueta, estado de foco y mensaje de error. */
export const Field = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps | TextareaProps>(function Field(
  props,
  ref,
) {
  const { label, error, className, multiline, id: idProp, ...rest } = props;
  const autoId = useId();
  const id = idProp ?? autoId;
  const errorId = `${id}-error`;
  const state = error ? 'border-2.5 border-error bg-error-bg' : 'border-campo-borde';
  const aria = { 'aria-invalid': error ? true : undefined, 'aria-describedby': error ? errorId : undefined };

  return (
    <div className={cx('flex flex-col', className)}>
      <label htmlFor={id} className="font-display text-[19px] leading-[22px] md:text-label">
        {label}
      </label>
      {multiline ? (
        <textarea
          ref={ref as React.Ref<HTMLTextAreaElement>}
          id={id}
          {...aria}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          className={cx(control, state, 'mt-2 h-[120px] min-h-[120px] resize-y px-[14px] py-3 leading-6 md:mt-[10px] md:px-[17px] md:py-[13px] md:leading-[26px]')}
        />
      ) : (
        <input
          ref={ref as React.Ref<HTMLInputElement>}
          id={id}
          {...aria}
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
          className={cx(control, state, 'mt-2 h-[54px] px-[14px] md:mt-[10px] md:h-[57px] md:px-[17px]')}
        />
      )}
      {error && (
        <p id={errorId} className="mt-1.5 font-body text-[15px] font-semibold leading-5 text-error">
          {error}
        </p>
      )}
    </div>
  );
});
