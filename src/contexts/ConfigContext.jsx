import { createContext, useContext, useEffect, useState } from "react";

const ConfigContext = createContext();

const ConfigProvider = ({children}) => {

    const [config, setConfig] = useState({});

    const fetchConfig = async () => {

        try {
            const res = await fetch('/config.json');
            const data = await res.json();
            setConfig(data);
        } catch (err) {
            console.error(err);
        }
        
    }

    useEffect(() => {
        fetchConfig();
    }, []);

    // Check per il controllo dell'effettivo arrivo dei dati dal config.json
    if (Object.keys(config).length === 0) {
        return null; 
    }

    return (
        <ConfigContext.Provider value={config}>
            {children}
        </ConfigContext.Provider>
    )
}

const useConfig = () => {
    const value = useContext(ConfigContext);

    if(value === undefined) throw new Error('Non puoi leggere i config');

    return value;
}

export {ConfigProvider, useConfig}