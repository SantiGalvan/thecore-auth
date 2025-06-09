import { createContext, useContext, useState } from "react";
import DangerLogo from '../../assets/danger.svg?react';
import InfoLogo from '../../assets/info.svg?react';
import WarningLogo from '../../assets/warning.svg?react';
import { GiCheckMark } from "react-icons/gi";

const AlertContext = createContext();

const AlertProvider = ({ children }) => {

    const [showAlert, setShowAlert] = useState(false);
    const [typeAlert, setTypeAlert] = useState();
    const [messageAlert, setMessageAlert] = useState();

    // Variabile con i colori dell'alert
    const alertConfig = {
        danger: {
            bgColor: "bg-danger",
            textColor: "text-danger-text",
            buttonBg: "bg-danger",
            hoverBg: "hover:bg-danger-hover",
            focusRing: "focus:ring-danger-progress",
            progressColor: "bg-danger-progress"
        },
        info: {
            bgColor: "bg-info",
            textColor: "text-info-text",
            buttonBg: "bg-info",
            hoverBg: "hover:bg-info-hover",
            focusRing: "focus:ring-info-progress",
            progressColor: "bg-info-progress"
        },
        success: {
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

    // Restituisce l'icona giusta
    const getIcon = (type) => {
        switch (type) {
            case 'danger':
                return <DangerLogo className="w-[20px] h-[20px]" />
            case 'info':
                return <InfoLogo className="w-[20px] h-[20px]" />
            case 'success':
                return <GiCheckMark className="text-xl" />
            case 'warning':
                return <WarningLogo className="w-[20px] h-[20px]" />
        }
    }

    // Chiude l'alert
    const closeAlert = () => {
        setShowAlert(!showAlert);
    }

    // Funzione per settare l'alert
    const activeAlert = (type, message) => {
        setShowAlert(false);

        setTimeout(() => {
            setTypeAlert(type);
            setMessageAlert(message);
            setShowAlert(true);
        }, 50);

    }

    const value = {
        showAlert,
        setShowAlert,
        typeAlert,
        setTypeAlert,
        messageAlert,
        setMessageAlert,
        alertConfig,
        getIcon,
        closeAlert,
        activeAlert
    }

    return (
        <AlertContext.Provider value={value}>
            {children}
        </AlertContext.Provider>
    )
}

const useAlert = () => {
    const value = useContext(AlertContext);

    if (value === undefined) throw new Error('Non puoi modificare l\'alert');

    return value;
}

export { AlertProvider, useAlert }