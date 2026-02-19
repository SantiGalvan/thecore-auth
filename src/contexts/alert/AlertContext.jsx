import { createContext, useContext, useState } from "react";
import DangerLogo from '../../assets/danger.svg?react';
import InfoLogo from '../../assets/info.svg?react';
import WarningLogo from '../../assets/warning.svg?react';
import { GiCheckMark } from "react-icons/gi";
import { useDevice } from "../../hooks/device/useDevice";
import { useConfig } from "../config/ConfigContext";
import { useToast } from "../../hooks/toast/useToast";

const AlertContext = createContext();

const AlertProvider = ({ children }) => {

    const { sileoToastEnabled, customDeviceType } = useConfig();
    const { success, error, info, warning } = useToast();
    const device = useDevice();

    const [showAlert, setShowAlert] = useState(false);
    const [typeAlert, setTypeAlert] = useState();
    const [messageAlert, setMessageAlert] = useState();

    // Usa il device type dal config se presente, altrimenti quello rilevato automaticamente
    const deviceType = customDeviceType || device.type;

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
    const activeAlert = (type, message, customType = null) => {

        setShowAlert(false);

        if (sileoToastEnabled && !customType) {
            if (["mobile", "tablet"].includes(deviceType)) {
                switch (type) {
                    case "danger":
                        error("Errore", message);
                        break;
                    case "info":
                        info("Info", message);
                        break;
                    case "success":
                        success("Successo", message);
                        break;
                    case "warning":
                        warning("Attenzione", message);
                        break;
                    default:
                        info("Info", message);
                }
                return; // esce perché non serve più il modal desktop
            }
        }

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