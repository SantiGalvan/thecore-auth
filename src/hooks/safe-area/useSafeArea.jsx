import { useEffect } from "react";
import { useLocation, matchPath } from "react-router-dom";

/**
 * Hook per aggiungere/removere la classe "with-safe-area" sul body
 * in base alle rotte escluse.
 * @param {string[]} excludedPaths - Array di pattern di rotte da escludere
 */
const useSafeArea = (excludedPaths = ["/"]) => {
    const location = useLocation();

    useEffect(() => {
        // Controlla se la rotta corrente corrisponde a qualche pattern escluso
        const isExcluded = excludedPaths.some((pattern) =>
            matchPath({ path: pattern, end: false }, location.pathname)
        );

        if (isExcluded) {
            document.body.classList.remove("with-safe-area");
            console.log("Safe area disabilitata per la rotta:", location.pathname);
        } else {
            document.body.classList.add("with-safe-area");
            console.log("Safe area abilitata per la rotta:", location.pathname);
        }

        return () => {
            document.body.classList.remove("with-safe-area");
        };
    }, [location.pathname, excludedPaths]);
};

export { useSafeArea };