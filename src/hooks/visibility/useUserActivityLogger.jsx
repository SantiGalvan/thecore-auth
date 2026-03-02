import { useEffect } from "react";

/**
 * Hook che ascolta quando l'utente torna attivo o lascia la pagina
 * Combina visibilitychange, focus/blur e pageshow/pagehide
 */
export function useUserActivityLogger() {

    // 1️⃣ Visibility
    const handleVisibility = () => {
        console.log("[visibilitychange]", document.visibilityState);
    };

    // 2️⃣ Focus / Blur
    const handleFocus = () => {
        console.log("[focus] La finestra ha il focus");
    };
    const handleBlur = () => {
        console.log("[blur] La finestra ha perso il focus");
    };

    // 3️⃣ Pageshow / Pagehide
    const handlePageshow = (event) => {
        console.log(
            "[pageshow] Pagina mostrata, persisted:",
            event.persisted
        );
    };
    const handlePagehide = (event) => {
        console.log(
            "[pagehide] Pagina nascosta o abbandonata, persisted:",
            event.persisted
        );
    };

    useEffect(() => {
        // Registrazione eventi
        document.addEventListener("visibilitychange", handleVisibility);
        window.addEventListener("focus", handleFocus);
        window.addEventListener("blur", handleBlur);
        window.addEventListener("pageshow", handlePageshow);
        window.addEventListener("pagehide", handlePagehide);

        // Cleanup
        return () => {
            document.removeEventListener("visibilitychange", handleVisibility);
            window.removeEventListener("focus", handleFocus);
            window.removeEventListener("blur", handleBlur);
            window.removeEventListener("pageshow", handlePageshow);
            window.removeEventListener("pagehide", handlePagehide);
        };
    }, []);
}