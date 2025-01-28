import { RxCross2 } from "react-icons/rx";
import { AiFillWarning, AiFillInfoCircle } from "react-icons/ai";
import { GiCheckMark } from "react-icons/gi";
import { useAlert } from "../contexts/AlertContext";
import { useContext, useEffect } from "react";
import { ConfigContext } from "../contexts/ConfigContext";

const Alert = () => {

    const { showAlert, setShowAlert, messageAlert, typeAlert } = useAlert();
    const { alertTimeout } = useContext(ConfigContext);
    
    const alertConfig = {
        danger: {
            bgColor: "bg-red-50",
            textColor: "text-red-700",
            buttonBg: "bg-red-50",
            hoverBg: "hover:bg-red-200",
            focusRing: "focus:ring-red-400",
            message: ''
        },
        info : {
            bgColor: "bg-blue-50",
            textColor: "text-blue-700",
            buttonBg: "bg-blue-50",
            hoverBg: "hover:bg-blue-200",
            focusRing: "focus:ring-blue-400",
            message: ''
        },
        success : {
            bgColor: "bg-green-50",
            textColor: "text-green-700",
            buttonBg: "bg-green-50",
            hoverBg: "hover:bg-green-200",
            focusRing: "focus:ring-green-400",
            message: ''
        }
    }

    // Variabili per lo stile dell'Alert
    const { bgColor, textColor, buttonBg, hoverBg, focusRing } = alertConfig[typeAlert];

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

        const timeOut = setTimeout(() => {
            closeAlert();
        }, alertTimeout);

        return () => {
            clearTimeout(timeOut);
        }

    }, []);

    return(
        
        <div className={`flex items-center p-4 ${textColor} rounded-lg ${bgColor} mx-auto fixed top-[calc(100vh-100px)] right-10`} role="alert">

            {getIcon(typeAlert)}

            <div className="px-4 text-sm font-medium">
                {messageAlert}
            </div>

            <button type="button" className={`ms-auto ${buttonBg} rounded-lg focus:ring-2 ${focusRing} p-1.5 ${hoverBg} inline-flex items-center justify-center h-8 w-8`}
             title="Close"
             onClick={closeAlert}
             >
                <RxCross2 className="text-xl"/>
            </button>

        </div>
    )
}

export default Alert;