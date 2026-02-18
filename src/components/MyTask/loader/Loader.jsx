import { useEffect, useState } from "react";
import { useConfig } from "../../../contexts/config/ConfigContext";
import { useLoading } from "../../../contexts/loading/LoadingContext";
import LogoLoader from "./LogoLoader";

const Loader = ({ gradients, moreGradients, containerSize, overlayStyle, NewLogoLoader, Logo }) => {

    const {  customLoginTimeout } = useConfig();
    const { isLoading } = useLoading();

    const [show, setShow] = useState(isLoading);
    const [fade, setFade] = useState(false);

    const baseGradients = [
        "bg-gradient-to-br from-blue-500 via-blue-400 to-blue-200",
        "bg-gradient-to-br from-blue-200 via-blue-400 to-purple-300",
        "bg-gradient-to-br from-blue-400 via-cyan-300 to-blue-200",
        "bg-gradient-to-br from-blue-100 via-purple-200 to-pink-100",
        "bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600",
        "bg-gradient-to-br from-blue-300 via-cyan-400 to-indigo-400",
        "bg-gradient-to-br from-cyan-200 via-blue-300 to-blue-500",
        "bg-gradient-to-br from-indigo-300 via-blue-400 to-purple-400",
        ...(moreGradients || [])
    ]
    const defaulGradients = gradients ?? [...baseGradients, ...(moreGradients ?? [])]

    // Seleziona un gradient casuale
    const selectedGradient = defaulGradients[Math.floor(Math.random() * defaulGradients.length)];
    const sizeContainer = containerSize || 'h-[280px] w-[280px]';

    useEffect(() => {
        if (isLoading) {
            setShow(true);

            // fade-in dopo pochi ms
            const fadeInTimer = setTimeout(() => setFade(true), 10);

            return () => clearTimeout(fadeInTimer);
        } else {
            // fade-out quando isLoading diventa false
            setFade(false);
            const fadeOutTimer = setTimeout(() => setShow(false), 300); // fade-out
            return () => clearTimeout(fadeOutTimer);
        }
    }, [isLoading, customLoginTimeout]);

    return (
        <div className={`${overlayStyle || 'fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center z-999 transition-opacity duration-300'} ${selectedGradient} ${fade ? "opacity-100" : "opacity-0"}`}>
            {NewLogoLoader ? <NewLogoLoader /> : <LogoLoader sizeContainer={sizeContainer} Logo={Logo} />}
        </div>
    );
}

export default Loader;
