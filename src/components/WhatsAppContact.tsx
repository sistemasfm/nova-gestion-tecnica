import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { WHATSAPP_MESSAGE, WhatsAppIcon, waHrefFor } from "@/lib/whatsapp";
import novaSymbol from "@/assets/nova-symbol-official.png";

const waHref = waHrefFor(WHATSAPP_MESSAGE);

const BUBBLE_KEY = "nova-wa-bubble-dismissed";

export function WhatsAppContact() {
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(BUBBLE_KEY) === "1") return;
    const timer = window.setTimeout(() => setShowBubble(true), 8000);
    return () => window.clearTimeout(timer);
  }, []);

  const dismissBubble = () => {
    sessionStorage.setItem(BUBBLE_KEY, "1");
    setShowBubble(false);
  };

  return (
    <div className="wa-root pointer-events-none fixed bottom-5 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-7 sm:right-6">
      {showBubble && (
        <div className="pointer-events-auto w-[min(19rem,calc(100vw-2rem))] rounded-md border border-technical/15 bg-background p-4 shadow-xl">
          <div className="flex items-start gap-3">
            <div className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-full bg-technical p-1.5 shadow-sm">
              <img src={novaSymbol} alt="NOVA" className="h-full w-full object-contain" />
            </div>
            <p className="pt-0.5 text-base leading-relaxed text-technical">
              Hola 👋 ¿Tenés dudas sobre el diagnóstico técnico sin cargo?
            </p>
            <button
              type="button"
              onClick={dismissBubble}
              aria-label="Cerrar mensaje"
              className="-mr-3 -mt-3 grid size-12 shrink-0 place-items-center rounded-sm text-technical/50 transition-colors hover:text-technical"
            >
              <X className="size-4" />
            </button>
          </div>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={dismissBubble}
            className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-sm bg-[#25D366] text-base font-bold text-white transition-opacity hover:opacity-90"
          >
            <WhatsAppIcon className="size-4" /> Responder
          </a>
        </div>
      )}

      <div className="group pointer-events-auto relative">
        <span className="pointer-events-none absolute right-full top-1/2 mr-3 hidden -translate-y-1/2 whitespace-nowrap rounded-sm bg-technical px-3 py-2 text-sm font-semibold text-technical-foreground opacity-0 transition-opacity group-hover:opacity-100 lg:block">
          ¿Tenés dudas? Escribinos ahora
        </span>
        <span className="wa-pulse pointer-events-none absolute inset-0 rounded-full bg-[#25D366]/40" />
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Escribinos por WhatsApp"
          className="relative grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 sm:size-[60px]"
        >
          <WhatsAppIcon className="size-7 sm:size-8" />
        </a>
      </div>
    </div>
  );
}
