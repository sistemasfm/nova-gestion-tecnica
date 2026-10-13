import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { HardHat, FileCheck2, Recycle } from "lucide-react";
import { WHATSAPP_MESSAGE_CONFIRM, WhatsAppIcon, waHrefFor } from "@/lib/whatsapp";

export const Route = createFileRoute("/gracias")({
  head: () => ({
    meta: [
      { title: "¡Listo! Tu diagnóstico está en marcha | NOVA Gestión Técnica" },
      {
        name: "description",
        content:
          "Recibimos tu pedido de diagnóstico técnico sin cargo. Te contactamos dentro de las 48 horas hábiles.",
      },
      { property: "og:title", content: "¡Listo! Tu diagnóstico está en marcha | NOVA Gestión Técnica" },
      {
        property: "og:description",
        content:
          "Recibimos tu pedido de diagnóstico técnico sin cargo. Te contactamos dentro de las 48 horas hábiles.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: GraciasPage,
});

const STEPS = [
  {
    title: "Te contactamos",
    text: "Alejandro o Paula se comunican por email o WhatsApp dentro de las 48 horas hábiles para coordinar un breve intercambio sobre tu actividad.",
  },
  {
    title: "Relevamos tu situación",
    text: "Con esa información, identificamos qué normas y requisitos técnicos aplican a tu empresa u organismo, y qué de eso ya cumplís.",
  },
  {
    title: "Recibís tu devolución",
    text: "Te entregamos el detalle claro de las brechas pendientes y una primera orientación de cómo resolverlas, sin ningún compromiso de contratar algo más.",
  },
];

const BONUS = [
  {
    icon: HardHat,
    title: "La capacitación es obligatoria",
    text: "La ley de higiene y seguridad exige capacitar al personal en prevención de riesgos y dejar registro de cada instancia.",
  },
  {
    icon: FileCheck2,
    title: "Documentar es parte de cumplir",
    text: "En una inspección, lo que no está registrado y firmado se considera no realizado, aunque en la práctica se haga.",
  },
  {
    icon: Recycle,
    title: "Ambiente también aplica a PyMEs",
    text: "Efluentes, residuos y emisiones tienen requisitos provinciales y municipales que alcanzan a comercios y talleres, no solo a grandes plantas.",
  },
];

function GraciasPage() {
  useEffect(() => {
    const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
    if (typeof fbq === "function") fbq("track", "Lead");
  }, []);

  return (
    <main className="bg-background text-technical">
      {/* 1 — Confirmación */}
      <section className="px-5 pb-16 pt-20 sm:pt-28">
        <div className="mx-auto max-w-2xl text-center">
          <svg viewBox="0 0 80 80" className="mx-auto size-20 sm:size-24" aria-hidden="true">
            <circle
              cx="40"
              cy="40"
              r="36"
              fill="none"
              stroke="var(--cta)"
              strokeOpacity="0.28"
              strokeWidth="3"
              className="check-circle-draw"
            />
            <path
              d="M24 41.5 L35.5 53 L57 29"
              fill="none"
              stroke="var(--cta)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="check-mark-draw"
            />
          </svg>
          <h1 className="mt-8 font-display text-3xl font-bold leading-tight sm:text-5xl">
            ¡Listo! Tu diagnóstico técnico está en marcha.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-technical/75">
            En las próximas 24 a 48 horas hábiles, nuestro equipo va a revisar tu actividad y se va a
            poner en contacto para coordinar el diagnóstico inicial, sin costo y sin compromiso.
          </p>
        </div>
      </section>

      {/* 2 — Siguientes pasos */}
      <section className="px-5 pb-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-10 md:grid-cols-3 md:gap-8">
            {STEPS.map((step, i) => (
              <div key={step.title} className="relative md:pt-6">
                <div
                  aria-hidden="true"
                  className="absolute left-[1.15rem] top-12 h-[calc(100%-1rem)] w-px bg-technical/15 md:left-0 md:top-0 md:h-px md:w-full"
                />
                <div className="relative flex gap-5 md:block">
                  <span className="font-display text-4xl font-bold leading-none text-cta md:text-5xl">
                    {i + 1}
                  </span>
                  <div className="md:mt-4">
                    <h2 className="font-display text-xl font-bold">{step.title}</h2>
                    <p className="mt-2 text-base leading-relaxed text-technical/75">{step.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — WhatsApp */}
      <section className="bg-technical px-5 py-16 text-technical-foreground sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl font-bold sm:text-4xl">
            ¿Querés confirmar más rápido? Escribinos ahora.
          </h2>
          <a
            href={waHrefFor(WHATSAPP_MESSAGE_CONFIRM)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-14 items-center justify-center gap-3 rounded-md bg-[#25D366] px-8 text-base font-bold text-white transition-transform duration-200 hover:scale-[1.03]"
          >
            <WhatsAppIcon className="size-6" />
            Escribinos por WhatsApp
          </a>
          <p className="mt-4 text-sm text-technical-foreground/70">
            Normalmente respondemos dentro del mismo día hábil.
          </p>
        </div>
      </section>

      {/* 4 — Bonus */}
      <section className="px-5 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            Mientras esperás, esto te puede interesar:
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {BONUS.map(({ icon: Icon, title, text }) => (
              <article key={title} className="border-t-2 border-cta bg-white p-6">
                <Icon className="size-6 text-cta" aria-hidden="true" />
                <h3 className="mt-4 font-display text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-technical/75">{text}</p>
              </article>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              to="/"
              className="inline-block text-sm font-bold text-technical/70 underline-offset-4 transition-colors hover:text-cta hover:underline"
            >
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
