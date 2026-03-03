import { useEffect, useState } from "react";

const useViewportHeight = () => {
    const [viewportHeight, setViewportHeight] = useState(0);

    const setHeight = () => {
        const height = window.visualViewport
            ? window.visualViewport.height
            : window.innerHeight;

        const vh = height * 0.01;

        // Set CSS variable
        document.documentElement.style.setProperty('--vh', `${vh}px`);

        // Salvo il valore in pixel
        setViewportHeight(height);
    };

    useEffect(() => {

        setHeight();

        window.addEventListener('resize', setHeight);
        window.addEventListener('orientationchange', setHeight);

        return () => {
            window.removeEventListener('resize', setHeight);
            window.removeEventListener('orientationchange', setHeight);
        };
    }, []);

    return {
        height: viewportHeight,
        vh: viewportHeight * 0.01
    };

};

export { useViewportHeight };