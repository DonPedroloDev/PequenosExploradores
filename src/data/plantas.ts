import type { CardVariant } from '../components/Card';

export type Categoria = 'interior' | 'comer' | 'desierto' | 'flores';

export const filtros: { id: Categoria | 'todas'; label: string }[] = [
  { id: 'todas', label: 'TODAS' },
  { id: 'interior', label: 'DE INTERIOR' },
  { id: 'comer', label: 'PARA COMER' },
  { id: 'desierto', label: 'DEL DESIERTO' },
  { id: 'flores', label: 'CON FLORES' },
];

export type Planta = {
  slug: string;
  nombre: string;
  /** Las dos etiquetas que se muestran en la tarjeta (la primera también en móvil). */
  etiquetas: [string, string];
  categorias: Categoria[];
  variante: Extract<CardVariant, 'verde' | 'amarillo' | 'coral'>;
  frase: string;
  agua: string;
  luz: string;
  creceEn: string;
  datos: string[];
};

export const plantas: Planta[] = [
  {
    slug: 'girasol',
    nombre: 'GIRASOL',
    etiquetas: ['Mucho sol', 'Con flores'],
    categorias: ['flores'],
    variante: 'amarillo',
    frase: 'La flor que gira para seguir al sol.',
    agua: '2 veces por semana',
    luz: 'Sol directo todo el día',
    creceEn: 'Unos 3 meses',
    datos: ['Puede crecer más alto que una persona adulta.', 'Sus semillas son comida para muchas aves.'],
  },
  // TODO: revisar — fichas de las siguientes plantas redactadas para el prototipo.
  {
    slug: 'frijol',
    nombre: 'FRIJOL',
    etiquetas: ['Crece rápido', 'Para comer'],
    categorias: ['comer'],
    variante: 'verde',
    frase: 'Una semillita que brota en pocos días.',
    agua: '3 veces por semana',
    luz: 'Mucha luz, sin quemarse',
    creceEn: 'Unas 10 semanas',
    datos: ['Puedes verlo brotar en un vaso con algodón húmedo.', 'Sus ramitas se enredan para trepar.'],
  },
  {
    slug: 'cactus',
    nombre: 'CACTUS',
    etiquetas: ['Poca agua', 'Del desierto'],
    categorias: ['desierto', 'interior'],
    variante: 'coral',
    frase: 'Guarda agua en su tallo para los días secos.',
    agua: '1 vez cada 2 semanas',
    luz: 'Sol directo',
    creceEn: 'Muy despacito, años',
    datos: ['Sus espinas son hojas que cambiaron de forma.', 'México tiene muchísimas especies de cactus.'],
  },
  {
    slug: 'albahaca',
    nombre: 'ALBAHACA',
    etiquetas: ['Para comer', 'Interior'],
    categorias: ['comer', 'interior'],
    variante: 'verde',
    frase: 'Hojitas que huelen rico y saben mejor.',
    agua: 'Tierra siempre húmeda',
    luz: 'Ventana con sol',
    creceEn: 'Unas 6 semanas',
    datos: ['Si cortas las puntas, crece más tupida.', 'Se usa para preparar salsas y ensaladas.'],
  },
  {
    slug: 'sabila',
    nombre: 'SÁBILA',
    etiquetas: ['Poca agua', 'Interior'],
    categorias: ['interior', 'desierto'],
    variante: 'verde',
    frase: 'Sus hojas gorditas guardan un gel fresquito.',
    agua: '1 vez cada 2 semanas',
    luz: 'Luz brillante',
    creceEn: 'Unos 3 años',
    datos: ['Su gel ayuda a calmar la piel quemada por el sol.', 'Le salen hijitos alrededor que puedes trasplantar.'],
  },
  {
    slug: 'jitomate',
    nombre: 'JITOMATE',
    etiquetas: ['Mucho sol', 'Para comer'],
    categorias: ['comer'],
    variante: 'coral',
    frase: 'De una flor amarilla nace un fruto rojo.',
    agua: 'Un poco cada día',
    luz: 'Sol directo 6 horas',
    creceEn: 'Unos 3 meses',
    datos: ['El jitomate es originario de América.', 'Necesita un palito para no caerse cuando crece.'],
  },
  {
    slug: 'cempasuchil',
    nombre: 'CEMPASÚCHIL',
    etiquetas: ['Con flores', 'Mucho sol'],
    categorias: ['flores'],
    variante: 'amarillo',
    frase: 'La flor naranja del Día de Muertos.',
    agua: '2 veces por semana',
    luz: 'Sol directo',
    creceEn: 'Unos 4 meses',
    datos: ['Su nombre viene del náhuatl y significa "veinte flores".', 'Su olor ayuda a alejar algunos bichitos.'],
  },
  {
    slug: 'menta',
    nombre: 'MENTA',
    etiquetas: ['Mucha agua', 'Interior'],
    categorias: ['interior', 'comer'],
    variante: 'verde',
    frase: 'Hojas fresquitas que crecen y crecen.',
    agua: 'Tierra siempre húmeda',
    luz: 'Sol suave o sombrita',
    creceEn: 'Unas 8 semanas',
    datos: ['Crece tan rápido que es mejor tenerla en su propia maceta.', 'Con sus hojas se prepara un té delicioso.'],
  },
];

export const getPlanta = (slug: string) => plantas.find((p) => p.slug === slug);
