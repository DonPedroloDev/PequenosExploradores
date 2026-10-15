export type BoteId = 'organico' | 'papel' | 'plastico';

export type Bote = {
  id: BoteId;
  nombre: string;
  imagen: string;
  /** Clases del bote en reposo y cuando está activo (algo encima). */
  reposo: string;
  activo: string;
};

export const botes: Bote[] = [
  {
    id: 'organico',
    nombre: 'ORGÁNICO',
    imagen: 'bin-green.png',
    reposo: 'border-dashed border-hoja bg-hoja-suave',
    activo: 'border-solid border-hoja bg-[#D4EDC6]',
  },
  {
    id: 'papel',
    nombre: 'PAPEL Y CARTÓN',
    imagen: 'bin-blue.png',
    reposo: 'border-dashed border-[#4A86B5] bg-agua-suave',
    activo: 'border-solid border-[#4A86B5] bg-agua-boton',
  },
  {
    id: 'plastico',
    nombre: 'PLÁSTICO Y LATAS',
    imagen: 'bin-yellow.png',
    reposo: 'border-dashed border-arena bg-arena-suave',
    activo: 'border-solid border-arena bg-[#FFEFB8]',
  },
];

export type Residuo = { id: string; nombre: string; bote: BoteId };

export const residuos: Residuo[] = [
  { id: 'platano', nombre: 'CÁSCARA DE PLÁTANO', bote: 'organico' },
  { id: 'hojas', nombre: 'HOJAS SECAS', bote: 'organico' },
  { id: 'manzana', nombre: 'RESTOS DE MANZANA', bote: 'organico' },
  { id: 'huevo', nombre: 'CÁSCARA DE HUEVO', bote: 'organico' },
  { id: 'periodico', nombre: 'PERIÓDICO', bote: 'papel' },
  { id: 'caja', nombre: 'CAJA DE CARTÓN', bote: 'papel' },
  { id: 'cuaderno', nombre: 'CUADERNO VIEJO', bote: 'papel' },
  { id: 'botella', nombre: 'BOTELLA DE PLÁSTICO', bote: 'plastico' },
  { id: 'lata', nombre: 'LATA DE REFRESCO', bote: 'plastico' },
  { id: 'yogur', nombre: 'ENVASE DE YOGUR', bote: 'plastico' },
  // TODO: revisar — residuos extra para que cada partida sea distinta.
  { id: 'naranja', nombre: 'CÁSCARA DE NARANJA', bote: 'organico' },
  { id: 'pasto', nombre: 'PASTO CORTADO', bote: 'organico' },
  { id: 'hoja-papel', nombre: 'HOJA DE PAPEL', bote: 'papel' },
  { id: 'tubo', nombre: 'TUBO DE CARTÓN', bote: 'papel' },
  { id: 'lata-atun', nombre: 'LATA DE ATÚN', bote: 'plastico' },
  { id: 'tapa', nombre: 'TAPA DE PLÁSTICO', bote: 'plastico' },
];

export const getResiduo = (id: string) => residuos.find((r) => r.id === id);
export const getBote = (id: BoteId) => botes.find((b) => b.id === id)!;
