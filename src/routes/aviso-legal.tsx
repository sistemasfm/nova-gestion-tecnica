import { createFileRoute } from "@tanstack/react-router";
import { LegalShell, type LegalSection } from "@/components/LegalShell";

export const Route = createFileRoute("/aviso-legal")({
  head: () => ({
    meta: [
      { title: "Aviso legal | NOVA Gestión Técnica" },
      { name: "description", content: "Condiciones de uso del sitio de NOVA Gestión Técnica: titularidad, propiedad intelectual, limitación de responsabilidad y legislación aplicable." },
      { property: "og:title", content: "Aviso legal | NOVA Gestión Técnica" },
      { property: "og:description", content: "Condiciones de uso del sitio de NOVA Gestión Técnica: titularidad, propiedad intelectual y legislación aplicable." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AvisoLegalPage,
});

const SECTIONS: LegalSection[] = [
  {
    id: "datos-identificativos",
    heading: "Datos identificativos del titular",
    content: (
      <>
        <p>
          Este sitio web pertenece a <strong>NOVA Gestión Técnica</strong>, servicio de gestión
          técnica integral liderado por <strong>Alejandro y Paula</strong>, con base en
          Villa María, Córdoba, Argentina, y con atención presencial y online en todo el país.
        </p>
        <p>
          Para cualquier consulta relacionada con este sitio, podés escribirnos al correo de
          contacto indicado en la <a href="/politica-privacidad#contacto" className="font-bold text-cta underline-offset-4 hover:underline">Política de privacidad</a>.
        </p>
      </>
    ),
  },
  {
    id: "condiciones-uso",
    heading: "Condiciones de uso del sitio",
    content: (
      <>
        <p>
          El acceso a este sitio es gratuito y su contenido tiene carácter informativo. Podés
          consultar, leer y compartir la información publicada para conocer el servicio y tomar
          decisiones informadas.
        </p>
        <p>
          Queda prohibido usar el sitio con fines ilícitos, intentar alterar o interferir en su
          funcionamiento, acceder a zonas no públicas sin autorización, o utilizar sus
          formularios para enviar información falsa, ajena o sin el consentimiento de su titular.
        </p>
        <p>
          NOVA Gestión Técnica puede actualizar, modificar o retirar contenidos del sitio en
          cualquier momento, sin necesidad de aviso previo.
        </p>
      </>
    ),
  },
  {
    id: "propiedad-intelectual",
    heading: "Propiedad intelectual",
    content: (
      <>
        <p>
          Los contenidos de este sitio — textos, imágenes, logotipo, estructura y diseño —
          pertenecen a NOVA Gestión Técnica y no pueden reproducirse, distribuirse ni utilizarse
          con fines comerciales sin autorización previa y por escrito.
        </p>
        <p>
          Se permite citar fragmentos breves con fines informativos, siempre que se indique la
          fuente y se incluya un enlace al contenido original.
        </p>
      </>
    ),
  },
  {
    id: "limitacion-responsabilidad",
    heading: "Limitación de responsabilidad",
    content: (
      <>
        <p>
          La información publicada en este sitio tiene carácter informativo y general. No
          reemplaza un diagnóstico técnico formal, que se realiza únicamente en el marco del
          servicio contratado y a partir del análisis de la situación concreta de cada empresa,
          comercio u organismo.
        </p>
        <p>
          NOVA Gestión Técnica no se responsabiliza de decisiones tomadas a partir de la
          información general del sitio sin un diagnóstico previo, ni de los contenidos de
          sitios de terceros enlazados desde estas páginas.
        </p>
      </>
    ),
  },
  {
    id: "legislacion-aplicable",
    heading: "Legislación aplicable",
    content: (
      <>
        <p>
          Este sitio y su relación con los usuarios se rigen por la legislación de la República
          Argentina. Para cualquier controversia derivada de su uso, las partes se someten a la
          jurisdicción de los tribunales ordinarios de Córdoba, Argentina.
        </p>
      </>
    ),
  },
];

function AvisoLegalPage() {
  return (
    <LegalShell
      title="Aviso legal"
      intro="Las condiciones bajo las que ofrecemos este sitio y la información que publicamos en él, explicadas de forma directa."
      sections={SECTIONS}
      crossLink={{ to: "/politica-privacidad", label: "Leé también nuestra Política de privacidad" }}
    />
  );
}
