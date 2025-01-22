import { createContext, useEffect, useState } from "react";

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

    return (
        <ConfigContext.Provider value={config}>
            {children}
        </ConfigContext.Provider>
    )
}

export {ConfigProvider, ConfigContext}