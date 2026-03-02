import { useEffect, useState, useMemo } from "react";

export function useUserActivity() {
    const [visibilityState, setVisibilityState] = useState(document.visibilityState);
    const [hasFocus, setHasFocus] = useState(document.hasFocus());
    const [isFromBFCache, setIsFromBFCache] = useState(false);
    const [isPageHidden, setIsPageHidden] = useState(false);

    // 1️⃣ Visibility
    const handleVisibility = () => {
        setVisibilityState(document.visibilityState);
    };

    // 2️⃣ Focus / Blur
    const handleFocus = () => setHasFocus(true);
    const handleBlur = () => setHasFocus(false);

    // 3️⃣ Pageshow / Pagehide
    const handlePageshow = (e) => {
        setIsFromBFCache(e.persisted);
        setIsPageHidden(false);
    };
    const handlePagehide = () => {
        setIsPageHidden(true);
    };

    useEffect(() => {

        document.addEventListener("visibilitychange", handleVisibility);
        window.addEventListener("focus", handleFocus);
        window.addEventListener("blur", handleBlur);
        window.addEventListener("pageshow", handlePageshow);
        window.addEventListener("pagehide", handlePagehide);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibility);
            window.removeEventListener("focus", handleFocus);
            window.removeEventListener("blur", handleBlur);
            window.removeEventListener("pageshow", handlePageshow);
            window.removeEventListener("pagehide", handlePagehide);
        };
    }, []);

    // Stato derivato: utente realmente attivo
    const isActive = useMemo(() => {
        return visibilityState === "visible" && hasFocus;
    }, [visibilityState, hasFocus]);

    return {
        visibilityState,
        isVisible: visibilityState === "visible",
        isHidden: visibilityState === "hidden",
        hasFocus,
        isActive,
        isFromBFCache,
        isPageHidden
    };
}