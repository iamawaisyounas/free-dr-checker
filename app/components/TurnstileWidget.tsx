"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "error-callback": () => void;
          "expired-callback": () => void;
          theme?: "auto" | "light" | "dark";
        }
      ) => string;
      remove: (widgetId: string) => void;
      reset: (widgetId: string) => void;
    };
  }
}

type Props = {
  disabled?: boolean;
  resetKey: number;
  siteKey: string;
  onError: () => void;
  onTokenChange: (token: string) => void;
};

const TURNSTILE_SCRIPT_ID = "cloudflare-turnstile-script";

function loadTurnstileScript() {
  if (document.getElementById(TURNSTILE_SCRIPT_ID)) {
    return;
  }

  const script = document.createElement("script");
  script.id = TURNSTILE_SCRIPT_ID;
  script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
}

export default function TurnstileWidget({ disabled, resetKey, siteKey, onError, onTokenChange }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    loadTurnstileScript();

    const timer = window.setInterval(() => {
      if (window.turnstile) {
        setReady(true);
        window.clearInterval(timer);
      }
    }, 100);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !ready || !siteKey || disabled) {
      return;
    }

    setFailed(false);

    if (widgetIdRef.current) {
      window.turnstile?.remove(widgetIdRef.current);
      widgetIdRef.current = null;
    }

    widgetIdRef.current = window.turnstile?.render(container, {
      sitekey: siteKey,
      theme: "auto",
      callback: (token) => {
        setFailed(false);
        onTokenChange(token);
      },
      "error-callback": () => {
        setFailed(true);
        onTokenChange("");
        onError();
      },
      "expired-callback": () => {
        setFailed(false);
        onTokenChange("");
      }
    }) ?? null;

    return () => {
      if (widgetIdRef.current) {
        window.turnstile?.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [disabled, onError, onTokenChange, ready, resetKey, siteKey]);

  if (!siteKey) {
    return null;
  }

  return (
    <div className="turnstile-wrap" aria-label="Bot protection">
      <div ref={containerRef} />
      {!ready ? <span className="turnstile-status">Loading bot protection...</span> : null}
      {failed ? <span className="turnstile-status">Bot protection failed to load. Refresh the page and try again.</span> : null}
    </div>
  );
}
