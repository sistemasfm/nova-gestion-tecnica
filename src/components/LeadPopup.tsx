import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { submitLeadToEmail } from "@/lib/lead-submission";

export const LEAD_DONE_KEY = "nova_lead_submitted";
const SHOWN_KEY = "nova_popup_shown";

export function markLeadSubmitted() {
  try {
    localStorage.setItem(LEAD_DONE_KEY, "1");
  } catch {
    /* ignore */
  }
}

export function LeadPopup() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const blocked = () =>
      localStorage.getItem(LEAD_DONE_KEY) === "1" || sessionStorage.getItem(SHOWN_KEY) === "1";
    if (blocked()) return;

    const show = () => {
      if (blocked()) return cleanup();
      sessionStorage.setItem(SHOWN_KEY, "1");
      setOpen(true);
      cleanup();
    };
    const onMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget && e.clientY <= 0) show();
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max >= 0.6) show();
    };
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    function cleanup() {
      document.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("scroll", onScroll);
    }
    if (isTouch) window.addEventListener("scroll", onScroll, { passive: true });
    else document.addEventListener("mouseout", onMouseOut);
    return cleanup;
  }, []);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!accepted) {
      setError("Necesitás aceptar la política de privacidad para continuar.");
      return;
    }
    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") ?? "").trim();

    setSubmitting(true);
    setError(null);
    try {
      await submitLeadToEmail({ email, origen: "popup" });
      markLeadSubmitted();
      setOpen(false);
      void navigate({ to: "/gracias" });
    } catch {
      setError("No pudimos enviar tus datos en este momento. Intentá nuevamente.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-technical/70 p-4 animate-popup-overlay"
      onClick={() => !submitting && setOpen(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-popup-title"
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-xl border-t-[6px] border-cta bg-canvas px-6 pb-7 pt-10 shadow-[0_30px_80px_-20px_color-mix(in_oklab,var(--technical)_70%,transparent)] animate-popup-card sm:px-10 sm:pb-9"
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          disabled={submitting}
          aria-label="Cerrar"
          className="absolute right-2 top-2 flex size-11 items-center justify-center rounded-md text-technical/70 transition-colors hover:bg-technical/10 hover:text-technical"
        >
          <X className="size-6" />
        </button>
        <h2 id="lead-popup-title" className="pr-6 font-display text-2xl font-bold leading-tight text-technical sm:text-3xl">
          ¿Ya sabés qué requisitos técnicos tenés pendientes?
        </h2>
        <p className="mt-4 text-base leading-relaxed text-technical/75">
          Pedí tu diagnóstico técnico inicial, sin cargo, y salí de la duda antes de que te la encuentre un inspector.
        </p>
        <form onSubmit={submit} className="mt-6 space-y-3">
          <Input
            ref={inputRef}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            disabled={submitting}
            aria-label="Tu email"
            placeholder="Tu email"
            className="h-14 border-technical/25 bg-background px-4 text-base text-technical placeholder:text-technical/50 focus-visible:ring-cta"
          />
          <label className="flex min-h-11 cursor-pointer items-center gap-3 text-left text-sm text-technical/80">
            <Checkbox
              checked={accepted}
              disabled={submitting}
              onCheckedChange={(value) => {
                setAccepted(value === true);
                setError(null);
              }}
              aria-required="true"
              className="size-5 shrink-0 border-technical data-[state=checked]:bg-cta data-[state=checked]:text-cta-foreground"
            />
            <span>
              Acepto la{" "}
              <Link
                to="/politica-privacidad"
                onClick={() => setOpen(false)}
                className="font-semibold text-technical underline underline-offset-4"
              >
                política de privacidad
              </Link>
              .
            </span>
          </label>
          {error && (
            <p role="alert" className="text-sm font-semibold text-cta">
              {error}
            </p>
          )}
          <Button type="submit" variant="cta" size="cta" disabled={submitting} className="w-full font-bold">
            {submitting ? "Enviando..." : "Quiero mi diagnóstico gratis"}
          </Button>
        </form>
        <button
          type="button"
          onClick={() => setOpen(false)}
          disabled={submitting}
          className="mx-auto mt-4 block min-h-12 px-3 text-base text-technical/60 underline-offset-4 hover:text-technical hover:underline"
        >
          No gracias, sigo mirando
        </button>
      </div>
    </div>
  );
}
