"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export function WelcomeToast() {
  useEffect(() => {
    // ignore if screen height is too small
    if (window.innerHeight < 650) return;
    if (!document.cookie.includes("welcome-toast=2")) {
      toast("🛍️ ¡Bienvenido a Fireshop!", {
        id: "welcome-toast",
        duration: Infinity,
        onDismiss: () => {
          document.cookie = "welcome-toast=2; max-age=31536000; path=/";
        },
        description: (
          <>
            Esta es una tienda de alto rendimiento con SSR, impulsada por
            Firestore, Next.js y Vercel.
          </>
        ),
      });
    }
  }, []);

  return null;
}
