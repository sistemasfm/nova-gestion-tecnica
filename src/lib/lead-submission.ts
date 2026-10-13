import { SITE_CONFIG } from "@/config/site";

export interface LeadPayload {
  nombre?: string;
  email: string;
  origen: "formulario-diagnostico" | "formulario-final" | "popup";
}

/**
 * Envía los datos del formulario al correo electrónico configurado en `SITE_CONFIG.contactEmail`
 * utilizando el servicio AJAX de FormSubmit (sin necesidad de backend ni claves SMTP).
 *
 * Nota: La primera vez que se envíe un formulario a un correo nuevo, FormSubmit enviará
 * un correo de confirmación por única vez a esa casilla para activarla.
 */
export async function submitLeadToEmail(payload: LeadPayload): Promise<void> {
  const targetEmail = SITE_CONFIG.contactEmail.trim();

  const bodyData = {
    _subject: `Nuevo pedido de diagnóstico técnico — ${payload.nombre || payload.email}`,
    _template: "table",
    _captcha: "false",
    _replyto: payload.email,
    Nombre: payload.nombre || "(Enviado desde popup rápido)",
    Email: payload.email,
    Formulario: payload.origen,
    Fecha: new Date().toLocaleString("es-AR", { timeZone: "America/Argentina/Cordoba" }),
  };

  const requests: Promise<Response>[] = [];

  if (targetEmail && targetEmail.includes("@")) {
    requests.push(
      fetch(`https://formsubmit.co/ajax/${encodeURIComponent(targetEmail)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(bodyData),
      }),
    );
  }

  if (SITE_CONFIG.leadWebhookUrl) {
    requests.push(
      fetch(SITE_CONFIG.leadWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      }),
    );
  }

  if (requests.length === 0) return;

  const [primaryResponse] = await Promise.all(requests);
  if (primaryResponse && !primaryResponse.ok) {
    throw new Error(`Error al enviar el formulario (${primaryResponse.status})`);
  }
}
