import { useRouterState } from "@tanstack/react-router";

const WHATSAPP_URL = "https://wa.me/34676220896";

export function WhatsAppButton() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const lang = pathname === "/en" || pathname.endsWith("-en") ? "en" : "es";
  const label = lang === "en" ? "Contact us on WhatsApp" : "Contactar por WhatsApp";

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full px-4 py-3 shadow-soft transition hover:opacity-90"
      style={{ backgroundColor: "#25D366", color: "#ffffff" }}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-6 w-6 shrink-0">
        <path d="M12.04 2a9.9 9.9 0 0 0-8.5 15L2 22l5.15-1.5A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.3 8.3 0 0 1-4.2-1.15l-.3-.18-3.05.9.9-3-.2-.3a8.4 8.4 0 1 1 6.85 3.73Zm4.6-6.2c-.25-.13-1.48-.73-1.7-.8-.23-.09-.4-.13-.56.12-.17.25-.64.8-.79.97-.14.16-.29.19-.54.06-.25-.13-1.06-.4-2-1.24-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.1-.11.25-.29.38-.44.12-.14.17-.25.25-.42.09-.16.04-.31-.02-.44-.06-.13-.56-1.36-.77-1.86-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.42.06-.65.31-.22.25-.86.84-.86 2.05s.88 2.38 1 2.54c.13.17 1.72 2.66 4.22 3.72.59.26 1.05.41 1.41.53.6.19 1.14.16 1.57.1.48-.07 1.48-.6 1.69-1.19.2-.58.2-1.08.15-1.19-.06-.1-.23-.16-.48-.29Z" />
      </svg>
      <span className="hidden text-sm font-semibold sm:inline">{label}</span>
    </a>
  );
}
