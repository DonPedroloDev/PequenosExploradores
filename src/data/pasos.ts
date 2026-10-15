import type { CardVariant } from '../components/Card';

export type Paso = {
  n: 1 | 2 | 3 | 4;
  /** Nombre corto en mayúsculas (título del paso). */
  nombre: string;
  subtitulo: string;
  instrucciones: [string, string, string];
  dato: string;
  imagen: string;
  alt: string;
  variante: CardVariant;
};

export const pasos: Paso[] = [
  {
    n: 1,
    nombre: 'SIEMBRA',
    subtitulo: 'Todo empieza con una pequeña semilla.',
    instrucciones: [
      'Llena tu maceta con tierra hasta casi arriba.',
      'Haz un hoyito del tamaño de tu dedo.',
      'Pon la semilla y tápala con poquita tierra.',
    ],
    dato: 'Dentro de cada semilla hay una plantita bebé esperando crecer.',
    imagen: 'step-siembra.png',
    alt: 'Mano poniendo una semilla en la tierra',
    variante: 'verde',
  },
  {
    // TODO: revisar — texto redactado para el prototipo, falta validación del equipo.
    n: 2,
    nombre: 'RIEGA',
    subtitulo: 'El agua le da fuerza a tu planta.',
    instrucciones: [
      'Toca la tierra: si está seca, es hora de regar.',
      'Usa poquita agua, como un vasito.',
      'Riega despacio, cerca del tallo, sin mojar de más.',
    ],
    dato: 'Las raíces beben el agua de la tierra, ¡como si fueran popotes!',
    imagen: 'step-riega.png',
    alt: 'Regadera echando agua a un brote',
    variante: 'amarillo',
  },
  {
    // TODO: revisar — texto redactado para el prototipo, falta validación del equipo.
    n: 3,
    nombre: 'DALE LUZ',
    subtitulo: 'Tu planta necesita sol para crecer.',
    instrucciones: [
      'Pon tu maceta cerca de una ventana con luz.',
      'Gírala un poquito cada semana para que crezca derechita.',
      'Si hace mucho calor, cámbiala a la sombrita al mediodía.',
    ],
    dato: 'Con la luz del sol, las hojas preparan su propia comida.',
    imagen: 'step-luz.png',
    alt: 'Brote feliz bajo un sol sonriente',
    variante: 'verde2',
  },
  {
    // TODO: revisar — texto redactado para el prototipo, falta validación del equipo.
    n: 4,
    nombre: 'CUÍDALA',
    subtitulo: 'Una planta feliz necesita tu cariño.',
    instrucciones: [
      'Quita con cuidado las hojitas secas.',
      'Revisa que no tenga bichitos en las hojas.',
      'Obsérvala cada día y anota cómo va creciendo.',
    ],
    dato: 'Una planta bien cuidada puede vivir muchos años contigo.',
    imagen: 'step-cuidala.png',
    alt: 'Plantita sonriente con un corazón',
    variante: 'coral',
  },
];

export const getPaso = (n: number) => pasos.find((p) => p.n === n);
