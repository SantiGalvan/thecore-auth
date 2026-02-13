import { createContext, useContext, useEffect, useRef, useState } from "react";
import { version as packageVersion } from '../../../package.json';
import ErrorPage from "../../pages/error/ErrorPage";

const ConfigContext = createContext();

const ConfigProvider = ({ children }) => {

    const [config, setConfig] = useState({}); // State delle variabili del config e delle funzioni del db
    const [errorShow, setErrorShow] = useState(false);

    const fetchedRef = useRef(false);

    // Messaggio di errore se il file config.json non è stato creato
    const errorMessage = `Creare un file config.json in public per il corretto funzionamento
Esempio di config.json:

{
    "baseUri": "",
    "authenticatedEndpoint": "",
    "usersEndpoint": "",
    "heartbeatEndpoint": "",
    "firstPrivatePath": "",
    "firstPrivateTitle": "",
    "configRoutes": [
        {"path": "", "title": "", "element": ""}
    ],
    "infiniteSession": "" ,
    "timeDeducted": "" ,
    "alertTimeout": "",
    "axiosTimeout": "" ,
    "axiosErrors": {
        "unauthorized":"",
        "notFound": "",
        "defaultMessage": ""
    },
    "clearLoginFormOnError": "" ,
    "autoLogin": "" ,
    "backendToken": "",
    "isDebug": "",
    "showHeaderButton": ""
}`

    // Restituisce una session key unica e opzionalmente prefissata dall'app, creandola solo se hasSessionKey è true
    const getSessionKey = (hasSessionKey, appKey) => {
        if (!hasSessionKey) return null;

        let id = sessionStorage.getItem("sessionKey");

        if (!id) {
            id = `${appKey ? appKey + "-" : ""}${crypto.randomUUID()}`;
            sessionStorage.setItem("sessionKey", id);
        }

        return id;
    }

    // Restituisce la data e ora corrente formattata come "dd/mm/yyyy hh:mm:ss"
    const setCurrentDate = () => {
        const currentDate = new Date();

        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const year = currentDate.getFullYear();
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        const seconds = String(currentDate.getSeconds()).padStart(2, '0');

        const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

        return formattedDate;
    }

    // Connessione al DB
    const openIndexedDB = (dbName, storeName) => {
        return new Promise((resolve, reject) => {

            const request = indexedDB.open(dbName, 1);

            request.onupgradeneeded = e => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains(storeName)) {
                    db.createObjectStore(storeName, { keyPath: "id" });
                }
            }

            request.onsuccess = e => resolve(e.target.result);

            request.onerror = e => reject(e.target.error);
        })
    }

    // Richiedi dati
    const getDataIndexedDB = async (dbName, storeName, key) => {


        const db = await openIndexedDB(dbName, storeName);

        return new Promise((resolve, reject) => {
            if (!db) {
                reject("Errore: DB non disponibile");
                return;
            }

            const transaction = db?.transaction(storeName, "readonly");
            const store = transaction?.objectStore(storeName);
            const request = store?.get(key);

            request.onsuccess = () => resolve(request.result);

            request.onerror = e => reject(e.target.error);

        });
    }

    // Modifica dati
    const setDataIndexedDB = async (dbName, storeName, data) => {

        const db = await openIndexedDB(dbName, storeName);

        return new Promise((resolve, reject) => {
            if (!db) {
                reject("Errore: DB non disponibile");
                return;
            }

            const transaction = db?.transaction(storeName, "readwrite");
            const store = transaction?.objectStore(storeName);
            const request = store?.put(data);

            request.onsuccess = () => resolve(request.result);

            request.onerror = e => reject(e.target.error);
        })
    }

    // Generatore di unique id
    const generateUniqueId = async (dbName, storeName) => {
        let uniqueId = Date.now();

        let existingData;
        do {
            existingData = await getDataIndexedDB(dbName, storeName, uniqueId);

            if (existingData) uniqueId++;

        } while (existingData);

        return uniqueId;
    }

    // Modifica dati con id automatico
    const setDataWithAutoId = async (dbName, storeName, data) => {

        if (!data.id) data.id = await generateUniqueId(dbName, storeName);

        await setDataIndexedDB(dbName, storeName, data);
    }

    // Raccolta delle variabili del config.json e aggiunta delle funzioni
    const fetchConfig = async () => {

        try {
            const res = await fetch('/config.json');
            const data = await res.json();

            let version;
            if (!data.isDevelopment) {
                const res = await fetch('/package.json')
                const data = await res.json();

                version = data.version;
            } else {
                version = packageVersion;
            }

            const sessionKey = getSessionKey(data.hasSessionKey, data.appKey);

            const newData = {
                ...data,
                version,
                openIndexedDB,
                getDataIndexedDB,
                setDataIndexedDB,
                generateUniqueId,
                setDataWithAutoId,
                setCurrentDate
            }

            if (data.hasSessionKey) {
                newData.sessionKey = sessionKey;
            }

            setConfig(newData);
        } catch (err) {
            console.error(err);

            setErrorShow(true);
        }
    }

    useEffect(() => {
        if (fetchedRef.current) return;
        fetchedRef.current = true;

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

    if (value === undefined) throw new Error('Non puoi leggere i config');

    return value;
}

export { ConfigProvider, useConfig }