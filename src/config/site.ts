/**
 * Archivo central de configuración de NOVA Gestión Técnica.
 *
 * Podés editar los valores directamente acá o definirlos en un archivo `.env`
 * en la raíz del proyecto usando las variables VITE_WHATSAPP_NUMBER y VITE_CONTACT_EMAIL.
 */
export const SITE_CONFIG = {
  /**
   * Número de WhatsApp con código de país (sin espacios ni guiones).
   * Ejemplo para Argentina (Villa María, Córdoba): "+5493534000000"
   */
  whatsappNumber:
    (import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined) || "+5493530000000",

  /**
   * Correo electrónico de contacto y recepción de formularios (leads).
   * Todos los formularios de la landing enviarán los datos a esta casilla,
   * y también se mostrará en las páginas legales (Política de privacidad y Aviso legal).
   */
  contactEmail:
    (import.meta.env.VITE_CONTACT_EMAIL as string | undefined) || "contacto@novagestion.com.ar",

  /**
   * (Opcional) URL de Webhook propio (Make, Zapier, n8n, etc.).
   * Si se deja vacío, los formularios se envían por email a `contactEmail` vía FormSubmit.
   */
  leadWebhookUrl:
    (import.meta.env.VITE_LEAD_WEBHOOK_URL as string | undefined) || "",
} as const;

export const WHATSAPP_NUMBER = SITE_CONFIG.whatsappNumber;
export const CONTACT_EMAIL = SITE_CONFIG.contactEmail;
