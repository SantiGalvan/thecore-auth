import { createContext, useContext, useEffect, useState } from "react";
import ErrorPage from "../pages/ErrorPage";

const ConfigContext = createContext();

const ConfigProvider = ({children}) => {

    const [config, setConfig] = useState({});
    const [errorShow, setErrorShow] = useState(false);

    const errorMessage = `Creare un file config.json in public per il corretto funzionamento
Esempio di config.json:

{
    "baseUri": "",
    "authenticatedEndpoint": "",
    "usersEndpoint": "",
    "heartbeatEndpoint": "",
    "infiniteSession": ,
    "timeDeducted": ,
    "alertTimeout": ,
    "axiosTimeout": ,
    "axiosErrors": {
        "unauthorized":"",
        "notFound": "",
        "defaultMessage": ""
    },
    "clearLoginFormOnError": ,
    "autoLogin": ,
    "autoLoginEmail": ,
    "autoLoginPassword": 
}`

    const fetchConfig = async () => {

        try {
            const res = await fetch('/config.json');
            const data = await res.json();
            setConfig(data);
        } catch (err) {
            console.error(err);

            setErrorShow(true);
        }
        
    }

    useEffect(() => {
        fetchConfig();
    }, []);

    // Check per il controllo dell'effettivo arrivo dei dati dal config.json
    if (Object.keys(config).length === 0) {
        return (<ErrorPage errorShow={errorShow} errorMessage={errorMessage} />) 
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