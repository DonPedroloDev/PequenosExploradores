import { useMemo } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const COLORS = ['#FFCD33', '#1F6E44', '#F07A5C', '#4892C4', '#9CC5A8'];

/** Confeti decorativo. No se muestra con prefers-reduced-motion. */
export function Confetti({ pieces = 60 }: { pieces?: number }) {
  const reduced = usePrefersReducedMotion();
  const items = useMemo(
    () =>
      Array.from({ length: pieces }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.8,
        duration: 2.4 + Math.random() * 1.6,
        size: 8 + Math.random() * 8,
        color: COLORS[i % COLORS.length],
        round: i % 3 === 0,
      })),
    [pieces],
  );
  if (reduced) return null;
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {items.map((p, i) => (
        <span
          key={i}
          className="absolute -top-5 block"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.round ? p.size : p.size * 0.5,
            background: p.color,
            borderRadius: p.round ? '50%' : 2,
            animation: `confeti ${p.duration}s ${p.delay}s cubic-bezier(.3,.6,.6,1) forwards`,
          }}
        />
      ))}
    </div>
  );
}
