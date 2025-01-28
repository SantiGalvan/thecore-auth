import { createContext, useContext, useState } from "react";

const AlertContext = createContext();

const AlertProvider = ({children}) => {

    const [showAlert, setShowAlert] = useState(false);
    const [typeAlert, setTypeAlert] = useState();
    const [messageAlert, setMessageAlert] = useState();

    const value = {
        showAlert,
        setShowAlert,
        typeAlert,
        setTypeAlert,
        messageAlert,
        setMessageAlert
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