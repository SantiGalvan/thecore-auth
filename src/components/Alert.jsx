import { RxCross2 } from "react-icons/rx";
import { AiFillWarning, AiFillInfoCircle } from "react-icons/ai";
import { GiCheckMark } from "react-icons/gi";
import { useAlert } from "../contexts/AlertContext";
import { useEffect, useState } from "react";
import { useConfig } from "../contexts/ConfigContext";

const Alert = () => {

    const { showAlert, setShowAlert, messageAlert, typeAlert } = useAlert();
    const { alertTimeout } = useConfig();

    const [progress, setProgress] = useState(0);
    
    const alertConfig = {
        danger: {
            bgColor: "bg-red-50",
            textColor: "text-red-700",
            buttonBg: "bg-red-50",
            hoverBg: "hover:bg-red-200",
            focusRing: "focus:ring-red-400",
            progressColor: "bg-red-400"
        },
        info : {
            bgColor: "bg-blue-50",
            textColor: "text-blue-700",
            buttonBg: "bg-blue-50",
            hoverBg: "hover:bg-blue-200",
            focusRing: "focus:ring-blue-400",
            progressColor: "bg-blue-400"
        },
        success : {
            bgColor: "bg-green-50",
            textColor: "text-green-700",
            buttonBg: "bg-green-50",
            hoverBg: "hover:bg-green-200",
            focusRing: "focus:ring-green-400",
            progressColor: "bg-green-400"
        }
    }

    // Variabili per lo stile dell'Alert
    const { bgColor, textColor, buttonBg, hoverBg, focusRing, progressColor } = alertConfig[typeAlert];

    // Restituisce l'icona giusta
    const getIcon = (type) => {
        switch (type) {
            case 'danger':
                return <AiFillWarning className="text-xl"/>
            case 'info':
                return <AiFillInfoCircle className="text-xl"/>
            case 'success':
                return <GiCheckMark className="text-xl"/>
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
        
        <div className={`flex items-center p-4 pt-6 ${textColor} rounded-lg ${bgColor} mx-auto fixed top-[calc(100vh-100px)] right-10`} role="alert">

            <div className="w-full bg-gray-200 rounded-t-lg overflow-hidden h-2.5 dark:bg-gray-700 absolute top-0 left-0 right-0">
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