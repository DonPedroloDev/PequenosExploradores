export type Pregunta = {
  id: string;
  pregunta: string;
  /** La primera opción es la correcta; se barajan al jugar. */
  opciones: [string, string, string, string];
  explicacion: string;
};

export const bancoQuiz: Pregunta[] = [
  {
    id: 'alimento',
    pregunta: '¿Qué necesita una planta para hacer su propio alimento?',
    opciones: ['Luz del sol', 'Dulces', 'Música fuerte', 'Oscuridad'],
    explicacion: 'Con la luz del sol, las plantas fabrican su comida.',
  },
  // TODO: revisar — preguntas redactadas para el prototipo, falta validación del equipo.
  {
    id: 'raices',
    pregunta: '¿Por dónde toma agua una planta?',
    opciones: ['Por sus raíces', 'Por sus flores', 'Por la maceta', 'Por el aire'],
    explicacion: 'Las raíces beben el agua que hay en la tierra.',
  },
  {
    id: 'oxigeno',
    pregunta: '¿Qué nos regalan las plantas para respirar?',
    opciones: ['Oxígeno', 'Humo', 'Polvo', 'Burbujas de jabón'],
    explicacion: 'Las plantas limpian el aire y nos dan oxígeno.',
  },
  {
    id: 'platano',
    pregunta: '¿En qué bote va una cáscara de plátano?',
    opciones: ['Orgánico', 'Plástico y latas', 'Papel y cartón', 'En el piso'],
    explicacion: 'Los restos de comida son orgánicos y pueden volverse composta.',
  },
  {
    id: 'agua',
    pregunta: '¿Cómo puedes ahorrar agua?',
    opciones: ['Cerrando la llave al lavarte los dientes', 'Dejando la llave abierta', 'Bañándote una hora', 'Jugando con la manguera'],
    explicacion: 'Cerrar la llave ahorra muchos litros de agua cada día.',
  },
  {
    id: 'composta',
    pregunta: '¿Qué es la composta?',
    opciones: ['Tierra hecha con restos orgánicos', 'Un dulce de frutas', 'Un tipo de plástico', 'Una planta del desierto'],
    explicacion: 'Con cáscaras y hojas secas se hace tierra muy nutritiva.',
  },
  {
    id: 'fruto',
    pregunta: '¿Qué parte de la planta se convierte en fruto?',
    opciones: ['La flor', 'La raíz', 'La hoja seca', 'La maceta'],
    explicacion: 'Después de la flor, muchas plantas forman frutos con semillas.',
  },
  {
    id: 'abeja',
    pregunta: '¿Qué animalito ayuda a las flores a hacer semillas?',
    opciones: ['La abeja', 'El tiburón', 'El pingüino', 'El pez'],
    explicacion: 'Las abejas llevan polen de flor en flor.',
  },
  {
    id: 'cactus',
    pregunta: '¿Qué planta casi no necesita agua?',
    opciones: ['El cactus', 'La menta', 'El arroz', 'El helecho'],
    explicacion: 'El cactus guarda agua en su tallo para los días secos.',
  },
  {
    id: 'bolsa',
    pregunta: '¿Qué es mejor llevar cuando vas a la tienda?',
    opciones: ['Una bolsa de tela', 'Muchas bolsas de plástico', 'Una caja de unicel', 'Nada, y pedir más bolsas'],
    explicacion: 'Una bolsa de tela se puede usar muchísimas veces.',
  },
  {
    id: 'reciclar',
    pregunta: '¿Qué significa reciclar?',
    opciones: ['Convertir algo usado en algo nuevo', 'Tirar todo junto', 'Quemar la basura', 'Esconder la basura'],
    explicacion: 'Al reciclar, los materiales se vuelven a usar para crear cosas nuevas.',
  },
  {
    id: 'arboles',
    pregunta: '¿Por qué son importantes los árboles?',
    opciones: ['Dan sombra, aire limpio y casa a los animales', 'Solo sirven para hacer ruido', 'Ensucian el aire', 'No sirven para nada'],
    explicacion: 'Los árboles cuidan el aire, el agua y a muchos animales.',
  },
  {
    id: 'sin-luz',
    pregunta: '¿Qué le pasa a una planta que no recibe luz?',
    opciones: ['Se pone amarilla y débil', 'Crece más fuerte', 'Se vuelve azul', 'Empieza a cantar'],
    explicacion: 'Sin luz no puede hacer su comida y se debilita.',
  },
  {
    id: 'pilas',
    pregunta: '¿Qué hacemos con las pilas usadas?',
    opciones: ['Llevarlas a un centro de acopio', 'Tirarlas al río', 'Enterrarlas en la maceta', 'Echarlas al bote orgánico'],
    explicacion: 'Las pilas contaminan mucho; necesitan un lugar especial.',
  },
  {
    id: 'carton',
    pregunta: '¿Cuál de estas cosas va en el bote de papel y cartón?',
    opciones: ['Una caja de cartón', 'Una cáscara de huevo', 'Una lata', 'Una botella de plástico'],
    explicacion: 'Las cajas de cartón limpias se pueden reciclar.',
  },
];

export const PREGUNTAS_POR_PARTIDA = 5;
