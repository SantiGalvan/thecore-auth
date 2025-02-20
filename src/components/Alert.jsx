import { RxCross2 } from "react-icons/rx";
import { GiCheckMark } from "react-icons/gi";
import { useAlert } from "../contexts/AlertContext";
import { useEffect, useState } from "react";
import { useConfig } from "../contexts/ConfigContext";
import DangerLogo from '../assets/danger.svg?react';
import InfoLogo from '../assets/info.svg?react';
import WarningLogo from '../assets/warning.svg?react';

const Alert = () => {

    const { showAlert, setShowAlert, messageAlert, typeAlert } = useAlert();
    const { alertTimeout } = useConfig();

    const [progress, setProgress] = useState(0);
    
    const alertConfig = {
        danger: {
            bgColor: "bg-danger",
            textColor: "text-danger-text",
            buttonBg: "bg-danger",
            hoverBg: "hover:bg-danger-hover",
            focusRing: "focus:ring-danger-progress",
            progressColor: "bg-danger-progress"
        },
        info : {
            bgColor: "bg-info",
            textColor: "text-info-text",
            buttonBg: "bg-info",
            hoverBg: "hover:bg-info-hover",
            focusRing: "focus:ring-info-progress",
            progressColor: "bg-info-progress"
        },
        success : {
            bgColor: "bg-success",
            textColor: "text-success-text",
            buttonBg: "bg-success",
            hoverBg: "hover:bg-success-hover",
            focusRing: "focus:ring-success-progress",
            progressColor: "bg-success-progress"
        },
        warning: {
            bgColor: "bg-warning",
            textColor: "text-warning-text",
            buttonBg: "bg-warning",
            hoverBg: "hover:bg-warning-hover",
            focusRing: "focus:ring-warning-progress",
            progressColor: "bg-warning-progress"
        }
    }

    // Variabili per lo stile dell'Alert
    const { bgColor, textColor, buttonBg, hoverBg, focusRing, progressColor } = alertConfig[typeAlert];

    // Restituisce l'icona giusta
    const getIcon = (type) => {
        switch (type) {
            case 'danger':
                return <DangerLogo className="w-[20px] h-[20px]" />
            case 'info':
                return <InfoLogo className="w-[20px] h-[20px]"/>
            case 'success':
                return <GiCheckMark className="text-xl"/>
            case 'warning':
                return <WarningLogo className="w-[20px] h-[20px]"/>
        }
    }

    const closeAlert = () => {
        setShowAlert(!showAlert);
    }

    // UseEffect per rimuovere il messaggio dopo tot secondi, adesso 10sec
    useEffect(() => {

        let interval;
        const duration = alertTimeout / 100;
        const step = 100 / duration;

        interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + step;
            });
        }, 100);

        // Chiusura dell'Alert
        const timeOut = setTimeout(() => {
            closeAlert();
        }, alertTimeout);

        return () => {
            clearTimeout(timeOut);
            clearInterval(interval);
        }

    }, []);

    return(
        
        <div className={`flex items-center p-4 pt-6 ${textColor} rounded-lg ${bgColor} mx-auto max-sm:max-w-[280px] max-sm:min-w-[200px] sm:max-w-1/3 fixed top-[calc(100vh-100px)] sm:right-10 right-1/2 translate-x-1/2 sm:translate-0 z-100`} role="alert">

            <div className="w-full bg-gray-200 rounded-t-lg overflow-hidden h-2.5 absolute top-0 left-0 right-0">
                <div className={`${progressColor} h-2.5 rounded-t-lg`} style={{width: `${progress}%`}}></div>
            </div>

            {getIcon(typeAlert)}

            <div className="px-4 text-sm font-medium">
                {messageAlert}
            </div>

            <button type="button" className={`ms-auto ${buttonBg} rounded-lg focus:ring-2 ${focusRing} p-1.5 ${hoverBg} inline-flex items-center justify-center h-8 w-8 cursor-pointer`}
             title="Close"
             onClick={closeAlert}
             >
                <RxCross2 className="text-xl"/>
            </button>

        </div>
    )
}

export default Alert;