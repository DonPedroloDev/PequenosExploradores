export type ContactPayload = { nombre: string; correo: string; mensaje: string };

/** Cualquier función que envíe el mensaje y lance un error si algo sale mal. */
export type ContactSender = (payload: ContactPayload) => Promise<void>;

/** Simulación sin backend: espera 800 ms y responde con éxito. */
export const simulatedSender: ContactSender = (payload) =>
  new Promise((resolve) => {
    if (import.meta.env.DEV) console.info('[contacto] envío simulado', payload);
    window.setTimeout(resolve, 800);
  });

/**
 * Envío real a un endpoint que acepte JSON (p. ej. `POST /api/contacto` o Formspree
 * `https://formspree.io/f/<id>`).
 */
export function createEndpointSender(url: string): ContactSender {
  return async (payload) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Error ${res.status} al enviar el mensaje`);
  };
}

/**
 * Función que usa el formulario. Para conectar un servicio real, cámbiala por ejemplo a:
 *   export const sendContact = createEndpointSender('/api/contacto');
 */
export const sendContact: ContactSender = simulatedSender;
