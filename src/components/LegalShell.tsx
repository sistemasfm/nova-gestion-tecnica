import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

export interface LegalSection {
  id: string;
  heading: string;
  content: ReactNode;
}

interface LegalShellProps {
  title: string;
  intro: string;
  sections: LegalSection[];
  /** Página legal hermana, para el enlace cruzado del pie */
  crossLink: { to: "/politica-privacidad" | "/aviso-legal"; label: string };
  updatedAt?: string;
}

export function LegalShell({ title, intro, sections, crossLink, updatedAt }: LegalShellProps) {
  return (
    <main className="min-h-[100svh] bg-canvas text-technical">
      {/* Header mínimo */}
      <header className="border-b border-technical/10 bg-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-5 py-5 sm:px-8">
          <Link to="/" className="flex items-center gap-3 font-display text-xl font-bold tracking-tight text-technical">
            <img src="/favicon.svg" alt="NOVA" width={36} height={36} className="size-9 shrink-0 rounded-lg shadow-sm" />
            <span>NOVA <span className="font-sans text-xs font-semibold uppercase text-technical/70">Gestión Técnica</span></span>
          </Link>
          <Link
            to="/"
            className="text-sm font-bold text-technical/70 underline-offset-4 transition-colors hover:text-cta hover:underline"
          >
            ← Volver al inicio
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-5 pb-20 pt-12 sm:px-8 sm:pt-16">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-cta">
          Información legal
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold leading-tight sm:text-5xl">{title}</h1>
        <p className="mt-5 text-lg leading-[1.8] text-technical/80">{intro}</p>
        {updatedAt ? (
          <p className="mt-2 text-sm text-technical/60">Última actualización: {updatedAt}</p>
        ) : null}

        {/* Índice navegable */}
        <nav aria-label="Índice de esta página" className="mt-10 border-t-2 border-cta bg-white p-6">
          <p className="font-display text-sm font-bold uppercase tracking-[0.15em] text-technical/70">
            Contenido
          </p>
          <ol className="mt-4 space-y-2.5">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="flex gap-3 text-base leading-snug text-technical underline-offset-4 transition-colors hover:text-cta hover:underline"
                >
                  <span className="font-display font-bold text-cta">{String(i + 1).padStart(2, "0")}</span>
                  {s.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Secciones */}
        <div className="mt-12 space-y-12">
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} className="scroll-mt-8">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-sm font-bold text-cta">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="font-display text-2xl font-bold sm:text-3xl">{s.heading}</h2>
              </div>
              <div className="mt-4 space-y-4 text-base leading-[1.8] text-technical/85">{s.content}</div>
            </section>
          ))}
        </div>

        {/* Enlace cruzado */}
        <p className="mt-10 text-base">
          <Link
            to={crossLink.to}
            className="font-bold text-cta underline-offset-4 transition-colors hover:text-cta-hover hover:underline"
          >
            {crossLink.label} →
          </Link>
        </p>
      </article>
    </main>
  );
}
