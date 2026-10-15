/** Ruta pública de un asset copiado en /public/assets. */
export const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;
