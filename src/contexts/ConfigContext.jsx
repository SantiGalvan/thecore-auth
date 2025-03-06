import { createContext, useContext, useEffect, useState } from "react";
import ErrorPage from "../pages/ErrorPage";

const ConfigContext = createContext();

const ConfigProvider = ({children}) => {

    const [config, setConfig] = useState({}); // State delle variabili del config e delle funzioni del db
    const [indexedDb, setIndexedDb] = useState(null); // State del database del browser (IndexedDB)
    const [errorShow, setErrorShow] = useState(false);

    // Messaggio di errore se il file config.json non è stato creato
    const errorMessage = `Creare un file config.json in public per il corretto funzionamento
Esempio di config.json:

{
    "baseUri": "",
    "authenticatedEndpoint": "",
    "usersEndpoint": "",
    "heartbeatEndpoint": "",
    "firstPrivatePath": "",
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

    

    // Connessione al DB
    const openIndexedDB = () => {
        return new Promise((resolve, reject) => {

            const request = indexedDB.open("configDatabase", 1);
    
            request.onupgradeneeded = e => {
                const db = e.target.result;
                if(!db.objectStoreNames.contains("settings")) {
                    db.createObjectStore("settings", { keyPath: "id"});
                }
            }
            
            request.onsuccess = e => {
                console.log("IndexedDB aperto con successo");
                const db = e.target.result;
                setIndexedDb(db);
                resolve(db);
            }
    
            request.onerror = e => {
                console.error("Errore nell'aprire IndexedDB:", e.target.error);
                reject(e.target.error);
            }
        })
    }

    // Richiedi dati
    const getDataIndexedDB = async (storeName, key) => {

        if (!indexedDb) await openIndexedDB();

        return new Promise((resolve, reject) => {
            if(!indexedDb){
                reject("Errore: DB non disponibile");
                return;
            }

            const transaction = indexedDb?.transaction(storeName, "readonly");
            const store = transaction?.objectStore(storeName);
            const request = store?.get(key);

            request.onsuccess = () => {
                console.log("Dati recuperati:", request.result);
                resolve(request.result);
            };

            request.onerror = e => {
                console.error("Errore nel recupero dati:", e.target.error);
                reject(e.target.error);
            };

        });
    }

    // Modifica dati
    const setDataIndexedDB = async (storeName, data) => {

        if (!indexedDb) await openIndexedDB();

        return new Promise((resolve, reject) => {
            if(!indexedDb){
                reject("Errore: DB non disponibile");
                return;
            }

            const transaction = indexedDb?.transaction(storeName, "readwrite");
            const store = transaction?.objectStore(storeName);
            const request = store?.put(data);

            request.onsuccess = () => {
                console.log("Scrittura effettuata:", data);
                resolve(request.result);
            };

            request.onerror = e => {
                console.error("Errore nella scrittura dati:", e.target.error);
                reject(e.target.error);
            };
        })
    }

    // Generatore di unique id
    const generateUniqueId = async (storeName) => {
        let uniqueId = Date.now();

        let existingData;
        do {
            existingData = await getDataIndexedDB(storeName, uniqueId);
            if(existingData) uniqueId++;
        } while(existingData);

        return uniqueId;
    }

    // Modifica dati con id automatico
    const setDataWithAutoId = async (storeName, data) => {
        if (!data.id) {
            data.id = await generateUniqueId(storeName);
        }

        await setDataIndexedDB(storeName, data);
    }

    // Raccolta delle variabili del config.json e aggiunta delle funzioni
    const fetchConfig = async () => {

        try {
            const res = await fetch('/config.json');
            const data = await res.json();

            const newData = {
                ...data,
                openIndexedDB,
                getDataIndexedDB,
                setDataIndexedDB,
                generateUniqueId,
                setDataWithAutoId
            }

            setConfig(newData);
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