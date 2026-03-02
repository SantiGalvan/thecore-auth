import { useEffect } from "react";

const useViewportHeight = () => {
    useEffect(() => {
        const setHeight = () => {
            const vh = window.visualViewport
                ? window.visualViewport.height * 0.01
                : window.innerHeight * 0.01;

            console.log('Viewport height (vh):', vh);
            console.log('Viewport height (vh):', vh * 100, 'px');

            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        // Imposta subito
        setHeight();

        // Aggiorna ad ogni resize o cambio orientamento
        window.addEventListener('resize', setHeight);
        window.addEventListener('orientationchange', setHeight);

        // Cleanup quando il componente viene smontato
        return () => {
            window.removeEventListener('resize', setHeight);
            window.removeEventListener('orientationchange', setHeight);
        };
    }, []);
}

export { useViewportHeight };