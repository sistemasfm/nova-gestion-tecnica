import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { AlertTriangle, Check, ChevronRight, ClipboardCheck, Layers3, ShieldCheck } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import heroImage from "@/assets/nova-hero.webp";
import heroMobile from "@/assets/nova-hero-mobile.webp";
import implementationImage from "@/assets/nova-implementation.webp";
import finalImage from "@/assets/nova-final.webp";
import novaLogoOfficial from "@/assets/nova-logo-official.png";
import { LeadPopup, markLeadSubmitted } from "@/components/LeadPopup";
import { WhatsAppContact } from "@/components/WhatsAppContact";
import { submitLeadToEmail } from "@/lib/lead-submission";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NOVA Gestión Técnica | Diagnóstico técnico sin cargo" },
      { name: "description", content: "Cumplí con seguridad, calidad y ambiente sin sumar personal. Pedí tu diagnóstico técnico gratuito hoy." },
      { property: "og:title", content: "NOVA Gestión Técnica | Diagnóstico técnico sin cargo" },
      { property: "og:description", content: "Cumplí con seguridad, calidad y ambiente sin sumar personal. Pedí tu diagnóstico técnico gratuito hoy." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: heroImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: heroImage },
    ],
  }),
  component: Index,
});

const problems = [
  { icon: Layers3, text: "No tenés tiempo, conocimiento especializado ni personal suficiente para seguirle el ritmo a cada requisito técnico y normativo que le exigen a tu empresa u organismo." },
  { icon: AlertTriangle, text: "Mientras tanto, el riesgo no espera: una inspección puede encontrar lo que falta, un accidente puede pasar por lo que no se controló a tiempo, un contrato puede caerse por no tener la documentación al día." },
  { icon: ClipboardCheck, text: "Contratar un consultor por cada área — seguridad, calidad, ambiente, gestión industrial — significa coordinar cuatro proveedores distintos para un mismo problema, y seguir sin nadie que se haga cargo de que la solución realmente funcione." },
];

const teamMembers = [
  {
    name: "Alejandro",
    role: "Lic. en Administración de Empresas",
    quote: "“Ordenamos la gestión para que el cumplimiento técnico y normativo se integre de forma eficiente en los procesos de la empresa, sin frenar la operación diaria.”",
  },
  {
    name: "Paula",
    role: "Ingeniera Química",
    quote: "“Aportamos rigor técnico en planta: evaluamos riesgos reales de seguridad y ambiente para implementar soluciones concretas que funcionen en el terreno, no solo papeles.”",
  },
];

const faqs = [
  ["¿Cómo confío en un servicio nuevo, sin referencias?", "El diagnóstico técnico inicial es gratuito y sin compromiso: podés evaluar cómo trabajamos antes de decidir cualquier cosa. Además, no entregamos solo documentos: nos quedamos hasta que la solución está implementada y tu equipo capacitado para sostenerla."],
  ["Esto es un gasto que ahora mismo no puedo justificar.", "Lo que no se invierte en prevenir termina pagándose después, multiplicado: una sanción, un accidente o un contrato perdido cuestan más que resolver el requisito a tiempo. El diagnóstico inicial te muestra exactamente dónde estás parado, sin costo, antes de tomar cualquier decisión."],
  ["¿Esto aplica realmente a mi actividad?", "Trabajamos con empresas industriales, PyMEs, comercios, organismos públicos y profesionales independientes. El servicio se adapta al tamaño y al tipo de organización, no al revés."],
];

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) { element.classList.add("is-visible"); observer.disconnect(); }
    }, { threshold: 0.12 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`section-reveal ${className}`}>{children}</div>;
}

function LeadForm({
  id,
  compact = false,
  ctaLabel = "Pedí tu diagnóstico sin cargo",
}: {
  id: "formulario-diagnostico" | "formulario-final";
  compact?: boolean;
  ctaLabel?: string;
}) {
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!accepted) {
      setError("Necesitás aceptar la política de privacidad para continuar.");
      return;
    }
    const formData = new FormData(event.currentTarget);
    const nombre = String(formData.get("nombre") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();

    setSubmitting(true);
    setError(null);
    try {
      await submitLeadToEmail({ nombre, email, origen: id });
      markLeadSubmitted();
      void navigate({ to: "/gracias" });
    } catch {
      setError("No pudimos enviar tus datos en este momento. Por favor intentá nuevamente o escribinos por WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <form id={id} onSubmit={submit} className={`mx-auto w-full ${compact ? "max-w-2xl" : "max-w-3xl"}`}>
      <div className="grid gap-3 md:grid-cols-2">
        <Input name="nombre" aria-label="Nombre" placeholder="Nombre" autoComplete="name" required disabled={submitting} className="h-14 border-technical-foreground/35 bg-technical-foreground/10 px-4 text-base text-technical-foreground placeholder:text-technical-foreground/65 focus-visible:ring-cta" />
        <Input name="email" aria-label="Email" placeholder="Email" type="email" inputMode="email" autoComplete="email" required disabled={submitting} className="h-14 border-technical-foreground/35 bg-technical-foreground/10 px-4 text-base text-technical-foreground placeholder:text-technical-foreground/65 focus-visible:ring-cta" />
      </div>
      <label className="mt-4 flex min-h-12 cursor-pointer items-center gap-3 text-left text-base text-technical-foreground/80">
        <Checkbox checked={accepted} onCheckedChange={(value) => { setAccepted(value === true); setError(null); }} aria-required="true" disabled={submitting} className="size-6 shrink-0 border-technical-foreground data-[state=checked]:bg-cta data-[state=checked]:text-cta-foreground" />
        <span>Acepto la <Link to="/politica-privacidad" className="font-semibold text-technical-foreground underline underline-offset-4">política de privacidad</Link>.</span>
      </label>
      {error && <p role="alert" className="mt-2 text-sm font-semibold text-cta">{error}</p>}
      <Button type="submit" variant="cta" size="cta" disabled={submitting} className="mt-5 w-full md:w-auto">
        {submitting ? "Enviando..." : ctaLabel} {!submitting && <ChevronRight />}
      </Button>
    </form>
  );
}

function StickyCta({ onClick }: { onClick: () => void }) {
  const [heroVisible, setHeroVisible] = useState(true);
  const [finalVisible, setFinalVisible] = useState(false);
  useEffect(() => {
    const hero = document.getElementById("hero-cta");
    const final = document.getElementById("formulario-final");
    const observers: IntersectionObserver[] = [];
    if (hero) { const o = new IntersectionObserver(([e]) => setHeroVisible(!!e?.isIntersecting)); o.observe(hero); observers.push(o); }
    if (final) { const o = new IntersectionObserver(([e]) => setFinalVisible(!!e?.isIntersecting)); o.observe(final); observers.push(o); }
    return () => observers.forEach(o => o.disconnect());
  }, []);
  const show = !heroVisible && !finalVisible;
  useEffect(() => {
    if (show) document.body.dataset["stickyCta"] = "1"; else delete document.body.dataset["stickyCta"];
    return () => { delete document.body.dataset["stickyCta"]; };
  }, [show]);
  return (
    <div aria-hidden={!show} className={`fixed inset-x-0 bottom-0 z-30 border-t border-technical-foreground/15 bg-technical/95 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur transition-transform duration-300 md:hidden ${show ? "translate-y-0" : "pointer-events-none translate-y-full"}`}>
      <Button onClick={onClick} tabIndex={show ? 0 : -1} variant="cta" size="cta" className="mx-auto flex w-full max-w-md">Pedí tu diagnóstico sin cargo <ChevronRight /></Button>
    </div>
  );
}

function Index() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" });
  return (
    <main className="overflow-hidden bg-background">
      <section className="relative flex min-h-[100svh] items-start pt-6 sm:items-center sm:pt-0 bg-technical text-technical-foreground">
        <picture><source media="(max-width: 767px)" srcSet={heroMobile} /><img src={heroImage} alt="Especialista técnica revisando una instalación eléctrica industrial" width={1920} height={1080} fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover object-center md:object-[62%_center]" /></picture>
        <div className="absolute inset-0 bg-technical/72 md:bg-gradient-to-r md:from-technical md:via-technical/88 md:to-technical/20" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pt-3 pb-12 sm:px-8 sm:py-12 lg:px-12">
          {/* Logo oficial centrado y protagonista */}
          <div className="mb-5 flex justify-center text-center sm:mb-14">
            <img
              src={novaLogoOfficial}
              alt="NOVA Gestión Técnica"
              width={580}
              height={150}
              className="h-22 sm:h-32 lg:h-38 w-auto max-w-full object-contain drop-shadow-2xl"
            />
          </div>

          <div className="max-w-4xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-cta sm:text-sm">
              Normativa · Técnica · Gestión — En una sola solución
            </p>
            <h1 className="font-display text-[2.25rem] font-bold uppercase leading-[1.04] sm:text-5xl lg:text-7xl">
              <span className="md:block">Un solo equipo técnico </span>
              <span className="md:block">para cumplir con todo</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-[1.7] text-technical-foreground/85 sm:text-xl">
              Diagnosticamos, resolvemos e implementamos seguridad, calidad, ambiente y gestión industrial — en Villa María y en toda la Argentina.
            </p>
            <Button onClick={() => scrollTo("diagnostico")} variant="cta" size="cta" id="hero-cta" className="hero-pulse mt-8 w-full sm:w-auto">
              Pedí tu diagnóstico sin cargo <ChevronRight />
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-canvas px-5 py-20 sm:px-8 lg:py-28">
        <Reveal className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-2xl"><p className="text-xs font-bold uppercase text-cta">El problema</p><h2 className="mt-3 font-display text-3xl font-bold text-technical sm:text-5xl">El riesgo no espera.</h2></div>
          <div className="grid gap-px overflow-hidden rounded-md border border-technical/15 bg-technical/15 lg:grid-cols-3">
            {problems.map(({ icon: Icon, text }, index) => <article key={text} className="bg-canvas p-7 sm:p-9"><div className="mb-8 flex items-center justify-between"><Icon className="size-7 text-cta" strokeWidth={1.5} /><span className="font-display text-sm font-bold text-technical/35">0{index + 1}</span></div><p className="leading-[1.7] text-technical">{text}</p></article>)}
          </div>
        </Reveal>
      </section>

      <section className="bg-technical text-technical-foreground">
        <div className="mx-auto grid max-w-[1600px] lg:grid-cols-2">
          <div className="relative min-h-[420px] lg:min-h-[720px]"><img src={implementationImage} alt="Especialista capacitando personal junto a maquinaria industrial" loading="lazy" width={1600} height={1200} className="absolute inset-0 h-full w-full object-cover" /></div>
          <Reveal className="flex items-center px-5 py-16 sm:px-10 lg:px-16 lg:py-24"><div className="max-w-xl"><p className="text-xs font-bold uppercase text-cta">La solución</p><h2 className="mt-3 font-display text-3xl font-bold sm:text-5xl">Un equipo que se hace cargo.</h2><p className="mt-8 text-lg leading-[1.7] text-technical-foreground/85">NOVA Gestión Técnica es el equipo único que ordena, resuelve e implementa. Analizamos tu situación real, identificamos qué te falta cumplir, desarrollamos la documentación y las soluciones necesarias, y capacitamos a tu personal para que la implementación funcione en el día a día.</p><p className="mt-6 text-lg leading-[1.7] text-technical-foreground/85">No te dejamos con un informe para que lo interpretes solo. Acompañamos el proceso completo, de forma presencial en Villa María y Córdoba, u online en cualquier punto del país, hasta que el requisito esté cumplido de verdad.</p></div></Reveal>
        </div>
      </section>

      <section className="bg-canvas px-5 py-20 sm:px-8 lg:py-28">
        <Reveal className="mx-auto max-w-6xl"><div className="mb-12"><p className="text-xs font-bold uppercase text-cta">Credenciales del equipo</p><h2 className="mt-3 font-display text-3xl font-bold text-technical sm:text-5xl">Dos miradas. Una gestión integral.</h2></div>
          <div className="grid gap-5 md:grid-cols-2">
            {teamMembers.map((member, index) => (
              <article key={member.name} className="flex min-h-64 w-full flex-col justify-between rounded-md border border-technical/15 bg-background p-7 sm:p-9">
                <div className="flex items-center gap-5">
                  <div className="grid size-20 shrink-0 place-items-center rounded-full bg-technical font-display text-2xl font-bold text-technical-foreground">
                    {member.name[0]}
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-technical">{member.name}</h3>
                    <p className="mt-1 text-sm font-semibold uppercase text-cta">{member.role}</p>
                  </div>
                </div>
                <blockquote className="mt-8 border-l-2 border-cta pl-5 text-lg leading-[1.7] text-technical">
                  {member.quote}
                </blockquote>
                <span className="mt-8 font-display text-xs font-bold text-technical/40">0{index + 1}</span>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="bg-technical px-5 py-20 text-technical-foreground sm:px-8 lg:py-28"><Reveal className="mx-auto max-w-5xl"><div className="border border-technical-foreground/20 p-7 sm:p-12 lg:p-16"><h2 className="max-w-3xl font-display text-3xl font-bold sm:text-5xl">Al pedir tu diagnóstico técnico inicial, sin cargo, recibís:</h2><ul className="mt-10 grid gap-6">{["Una devolución concreta de qué normas y requisitos técnicos aplican a tu actividad", "El detalle claro de cuáles ya cumplís y cuáles tenés pendientes", "Una primera orientación sobre cómo resolver cada brecha, sin compromiso de contratar nada más"].map(item => <li key={item} className="flex gap-4 text-lg leading-[1.7]"><span className="mt-0.5 grid size-7 shrink-0 place-items-center border border-cta text-cta"><Check className="size-4" /></span>{item}</li>)}</ul><Button onClick={() => scrollTo("diagnostico")} variant="cta" size="cta" className="mt-10 w-full sm:w-auto">Pedí tu diagnóstico sin cargo <ChevronRight /></Button></div></Reveal></section>

      <section className="bg-canvas px-5 py-20 sm:px-8 lg:py-28"><Reveal className="mx-auto max-w-4xl"><p className="text-xs font-bold uppercase text-cta">Preguntas frecuentes</p><h2 className="mt-3 font-display text-3xl font-bold text-technical sm:text-5xl">Antes de decidir.</h2><Accordion type="single" collapsible className="mt-10 border-t border-technical/20">{faqs.map(([question, answer], index) => <AccordionItem value={`item-${index}`} key={question} className="border-technical/20"><AccordionTrigger className="min-h-12 py-6 text-left font-display text-lg font-bold text-technical hover:no-underline sm:text-xl">{question}</AccordionTrigger><AccordionContent className="pb-7 pr-8 text-base leading-[1.7] text-technical/75">{answer}</AccordionContent></AccordionItem>)}</Accordion></Reveal></section>

      <section id="diagnostico" className="bg-technical px-5 py-20 text-center text-technical-foreground sm:px-8 lg:py-28"><Reveal><ShieldCheck className="mx-auto size-10 text-cta" strokeWidth={1.5} /><h2 className="mx-auto mt-5 max-w-3xl font-display text-3xl font-bold sm:text-5xl">Empezá por saber dónde estás parado.</h2><p className="mx-auto mb-10 mt-5 max-w-2xl text-technical-foreground/75">Dejanos tus datos para pedir tu diagnóstico técnico inicial sin cargo.</p><LeadForm id="formulario-diagnostico" /></Reveal></section>

      <section className="relative flex min-h-[100svh] flex-col justify-between px-5 py-20 text-center text-technical-foreground sm:px-8">
        <img src={finalImage} alt="Equipo técnico recorriendo una planta industrial" loading="lazy" width={1920} height={1080} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-technical/84" />
        <div />
        <Reveal className="relative mx-auto my-auto w-full max-w-4xl py-10">
          <p className="text-xs font-bold uppercase text-cta">El próximo paso</p>
          <h2 className="mt-4 font-display text-4xl font-bold sm:text-6xl">Resolvé lo técnico con un solo equipo.</h2>
          <p className="mx-auto mb-10 mt-5 max-w-2xl text-technical-foreground/80">Sin compromiso. Sin costo. Sabés en qué estás parado antes de decidir cualquier cosa.</p>
          <LeadForm id="formulario-final" compact ctaLabel="Quiero mi diagnóstico técnico sin cargo" />
        </Reveal>
        <div className="relative mx-auto mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-technical-foreground/55">
          <span>© {new Date().getFullYear()} NOVA Gestión Técnica</span>
          <Link to="/politica-privacidad" className="underline-offset-4 transition-colors hover:text-technical-foreground hover:underline">
            Política de privacidad
          </Link>
          <Link to="/aviso-legal" className="underline-offset-4 transition-colors hover:text-technical-foreground hover:underline">
            Aviso legal
          </Link>
        </div>
      </section>
      <StickyCta onClick={() => scrollTo("diagnostico")} />
      <LeadPopup />
      <WhatsAppContact />
    </main>
  );
}