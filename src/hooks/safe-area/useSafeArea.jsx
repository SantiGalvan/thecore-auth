import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useSafeArea = (excludedPaths = ["/"]) => {
    const location = useLocation();

    useEffect(() => {
        const shouldExclude = excludedPaths.includes(location.pathname);

        if (shouldExclude) {
            document.body.classList.remove("with-safe-area");
        } else {
            document.body.classList.add("with-safe-area");
        }

        return () => {
            document.body.classList.remove("with-safe-area");
        };
    }, [location.pathname, excludedPaths]);
};

export { useSafeArea };