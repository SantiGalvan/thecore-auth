import { useEffect, useState } from "react";

const useViewportHeight = (options = { getValues: false }) => {

    const { getValues } = options;

    const [viewportHeight, setViewportHeight] = useState(0);

    const setHeight = () => {
        const height = window.visualViewport
            ? window.visualViewport.height
            : window.innerHeight;

        const vh = height * 0.01;

        // Aggiorna sempre la variabile CSS
        document.documentElement.style.setProperty('--vh', `${vh}px`);

        // Aggiorna lo stato solo se serve leggere valori JS
        if (getValues) {
            setViewportHeight(height);
        }
    };

    useEffect(() => {

        setHeight(); // Imposta subito

        window.addEventListener('resize', setHeight);
        window.addEventListener('orientationchange', setHeight);

        return () => {
            window.removeEventListener('resize', setHeight);
            window.removeEventListener('orientationchange', setHeight);
        };
    }, [getValues]);

    if (getValues) {
        return {
            height: viewportHeight,
            vh: viewportHeight * 0.01
        };
    }

    // Se non servono valori JS, non ritorno nulla
    return null;
};

export { useViewportHeight };