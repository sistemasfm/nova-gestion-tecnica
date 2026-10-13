import { createFileRoute } from "@tanstack/react-router";
import { LegalShell, type LegalSection } from "@/components/LegalShell";
import { CONTACT_EMAIL } from "@/config/site";

export const Route = createFileRoute("/politica-privacidad")({
  head: () => ({
    meta: [
      { title: "Política de privacidad | NOVA Gestión Técnica" },
      { name: "description", content: "Cómo NOVA Gestión Técnica trata los datos personales enviados mediante sus formularios: finalidad, base legal, derechos y contacto." },
      { property: "og:title", content: "Política de privacidad | NOVA Gestión Técnica" },
      { property: "og:description", content: "Cómo NOVA Gestión Técnica trata los datos personales enviados mediante sus formularios." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PrivacyPage,
});

const SECTIONS: LegalSection[] = [
  {
    id: "responsable",
    heading: "Responsable del tratamiento",
    content: (
      <p>
        El responsable del tratamiento de tus datos es <strong>NOVA Gestión Técnica</strong>,
        servicio de gestión técnica integral liderado por Alejandro y Paula, con sede en
        Villa María, Córdoba, Argentina, y con atención presencial y online en todo el país.
      </p>
    ),
  },
  {
    id: "finalidad",
    heading: "Finalidad del tratamiento",
    content: (
      <p>
        Los datos que nos enviás a través de los formularios del sitio — tu nombre, tu email y,
        eventualmente, tu número de WhatsApp — se usan exclusivamente para responder a tu
        solicitud de diagnóstico técnico y para el seguimiento comercial correspondiente: es
        decir, para contactarte, coordinar el diagnóstico y acompañarte en la decisión. No los
        usamos para enviar publicidad de terceros ni para ningún otro fin.
      </p>
    ),
  },
  {
    id: "base-legal",
    heading: "Base legal",
    content: (
      <p>
        El tratamiento de tus datos se basa en tu consentimiento explícito, que otorgás al
        completar el formulario y marcar la casilla de aceptación de esta política. Si no
        completás el formulario, no recibimos ningún dato.
      </p>
    ),
  },
  {
    id: "destinatarios",
    heading: "Destinatarios (terceros)",
    content: (
      <p>
        Tus datos no se venden ni se ceden a terceros con ningún fin. Solo se utilizan
        herramientas de gestión interna — por ejemplo, nuestro email o un CRM — para guardar la
        información y poder darte respuesta. Esas herramientas actúan como prestadoras de un
        servicio para nosotros, nunca como destinatarias de tus datos con fines propios.
      </p>
    ),
  },
  {
    id: "derechos",
    heading: "Derechos del usuario",
    content: (
      <>
        <p>
          En cualquier momento podés ejercer estos derechos sobre tus datos:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li><strong>Acceso:</strong> pedirnos qué datos tuyos tenemos guardados.</li>
          <li><strong>Rectificación:</strong> pedirnos que corrijamos un dato que está mal.</li>
          <li><strong>Supresión:</strong> pedirnos que borremos tus datos por completo.</li>
          <li><strong>Portabilidad:</strong> pedirnos que te entreguemos tus datos en un formato que puedas llevar a otro proveedor.</li>
        </ul>
        <p>
          Para ejercerlos, escribinos al email de contacto que aparece más abajo y lo resolvemos
          a la brevedad, sin trámites ni formularios complicados.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    heading: "Cookies utilizadas",
    content: (
      <p>
        Este sitio puede usar cookies técnicas — necesarias para que las páginas funcionen y
        recordemos, por ejemplo, si ya viste un aviso durante esta visita — y cookies de
        analítica, que nos ayudan a entender de forma anónima cómo se usa el sitio. Podés
        desactivar las cookies desde la configuración de tu navegador (en las opciones de
        privacidad de Chrome, Firefox, Safari o Edge); el sitio seguirá funcionando, aunque
        algunas funciones puedan verse limitadas.
      </p>
    ),
  },
  {
    id: "contacto",
    heading: "Contacto para ejercer derechos",
    content: (
      <p>
        Para ejercer tus derechos o hacer cualquier consulta sobre el tratamiento de tus datos,
        escribinos a <a href={`mailto:${CONTACT_EMAIL}`} className="font-bold text-cta underline-offset-4 hover:underline">{CONTACT_EMAIL}</a>.
      </p>
    ),
  },
];

function PrivacyPage() {
  return (
    <LegalShell
      title="Política de privacidad"
      intro="Qué datos nos enviás, para qué los usamos y cómo ejercer tus derechos — explicado en lenguaje claro."
      sections={SECTIONS}
      crossLink={{ to: "/aviso-legal", label: "Leé también nuestro Aviso legal" }}
    />
  );
}
