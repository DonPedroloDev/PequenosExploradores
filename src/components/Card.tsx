import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cx } from '../lib/cx';

export type CardVariant = 'verde' | 'amarillo' | 'verde2' | 'coral';

/** Orden de rotación del diseño: verde → amarillo → verde (alt) → coral. */
export const CARD_ROTATION: CardVariant[] = ['verde', 'amarillo', 'verde2', 'coral'];
export const cardVariant = (index: number) => CARD_ROTATION[index % CARD_ROTATION.length];

const BASE: Record<CardVariant, string> = {
  verde: 'bg-hoja-suave border-hoja',
  amarillo: 'bg-arena-suave border-arena',
  verde2: 'bg-hoja-suave2 border-hoja',
  coral: 'bg-coral-suave border-coral',
};

/** Las tarjetas de Juegos usan tonos un poco más claros. */
const JUEGO: Partial<Record<CardVariant, string>> = {
  verde: 'bg-[#E3F5DF] border-hoja',
  coral: 'bg-coral-suave2 border-coral',
};

export function cardClasses(variant: CardVariant, { juego = false, interactive = false } = {}) {
  return cx(
    'border-3 rounded-card text-tinta no-underline',
    (juego && JUEGO[variant]) || BASE[variant],
    interactive && 'block transition-transform duration-150 ease-out hover:-translate-y-1',
  );
}

type CardProps = {
  variant: CardVariant;
  juego?: boolean;
  to?: string;
  className?: string;
  children: ReactNode;
  'aria-label'?: string;
};

/** Tarjeta con borde de 3 px. Con `to` es un enlace que sube 4 px al pasar el cursor. */
export function Card({ variant, juego, to, className, children, ...rest }: CardProps) {
  if (to) {
    return (
      <Link to={to} className={cx(cardClasses(variant, { juego, interactive: true }), className)} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <div className={cx(cardClasses(variant, { juego }), className)} {...rest}>
      {children}
    </div>
  );
}
