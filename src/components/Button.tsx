import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cx } from '../lib/cx';

export type ButtonVariant = 'primary' | 'secondary';
/** hero: COMENZAR · md: acciones de página · lg: Resultado · card: JUGAR dentro de tarjetas · sm: pills pequeñas */
export type ButtonSize = 'hero' | 'md' | 'lg' | 'card' | 'sm';

const SIZES: Record<ButtonSize, string> = {
  hero: 'h-16 px-8 text-[30px] lg:h-u83 lg:px-u40 lg:text-u38',
  md: 'h-[60px] px-[30px] text-[22px] md:px-[34px] md:text-[24px]',
  lg: 'h-[62px] px-9 text-[24px] md:h-[72px] md:px-10 md:text-[30px]',
  card: 'h-[52px] w-[180px] text-[26px] lg:h-u58 lg:w-u214 lg:text-u32',
  sm: 'h-12 px-6 text-xl',
};

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-sol hover:bg-sol-hover',
  secondary: 'border-3 border-tinta bg-transparent hover:bg-arena-suave',
};

export function buttonClasses({
  variant = 'primary',
  size = 'md',
  disabled = false,
}: { variant?: ButtonVariant; size?: ButtonSize; disabled?: boolean } = {}) {
  return cx(
    'inline-flex select-none items-center justify-center whitespace-nowrap rounded-full font-display leading-none text-tinta no-underline transition-colors duration-150',
    VARIANTS[variant],
    SIZES[size],
    disabled && 'pointer-events-none opacity-35',
  );
}

type Common = { variant?: ButtonVariant; size?: ButtonSize; className?: string; children: ReactNode };
type AsLink = Common & { to: string; disabled?: boolean; onClick?: () => void };
type AsButton = Common & { to?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>;

/** Botón redondo de la marca. Con `to` se renderiza como enlace de React Router. */
export const Button = forwardRef<HTMLButtonElement, AsLink | AsButton>(function Button(props, ref) {
  const { variant, size, className, children } = props;
  if (props.to !== undefined) {
    const { to, disabled, onClick } = props;
    const classes = cx(buttonClasses({ variant, size, disabled }), className);
    if (disabled) {
      return (
        <span className={classes} aria-disabled="true">
          {children}
        </span>
      );
    }
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }
  const { variant: _v, size: _s, className: _c, children: _ch, to: _to, type = 'button', ...rest } = props;
  return (
    <button ref={ref} type={type} {...rest} className={cx(buttonClasses({ variant, size, disabled: rest.disabled }), className)}>
      {children}
    </button>
  );
});
