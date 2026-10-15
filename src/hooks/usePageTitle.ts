import { useEffect } from 'react';

/** Título de la pestaña: "Sección · Pequeños Exploradores". */
export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} · Pequeños Exploradores` : 'Pequeños Exploradores';
  }, [title]);
}
