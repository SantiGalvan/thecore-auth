import { useEffect, useRef, useCallback, useState } from "react";

export const useIndexedDB = (dbName, storeName, version = 1) => {

    const dbRef = useRef(null);
    const [isReady, setIsReady] = useState(false);

    //* Recupera un record dallo store tramite chiave primaria
    const get = useCallback((key) => {
        return new Promise((resolve, reject) => {
            if (!dbRef.current) {
                reject("DB non pronto");
                return;
            }

            const tx = dbRef.current.transaction(storeName, "readonly");
            const store = tx.objectStore(storeName);
            const req = store.get(key);

            req.onsuccess = () => resolve(req.result);
            req.onerror = e => reject(e.target.error);
        });
    }, [storeName]);

    //* Recupera tutti i record dallo store corrente
    const getAll = useCallback(() => {
        return new Promise((resolve, reject) => {
            if (!dbRef.current) return reject("DB non pronto");
            const tx = dbRef.current.transaction(storeName, "readonly");
            const store = tx.objectStore(storeName);
            const req = store.getAll();
            req.onsuccess = () => resolve(req.result);
            req.onerror = e => reject(e.target.error);
        });
    }, [storeName]);

    //* Inserisce o aggiorna un record nello store (nel parametro va passato anche l'id)
    const set = useCallback((data) => {
        return new Promise((resolve, reject) => {
            if (!dbRef.current) {
                reject("DB non pronto");
                return;
            }

            const tx = dbRef.current.transaction(storeName, "readwrite");
            const store = tx.objectStore(storeName);
            const req = store.put(data);

            req.onsuccess = () => resolve(req.result);
            req.onerror = e => reject(e.target.error);
        });
    }, [storeName]);

    //* Genera un ID univoco verificando l'assenza nello store
    const generateUniqueId = useCallback(async () => {
        let id = Date.now();

        while (await get(id)) {
            id++;
        }

        return id;
    }, [get]);

    //* Inserisce un record assegnando automaticamente un ID se assente
    const setWithAutoId = useCallback(async (data) => {
        if (!data.id) {
            data.id = await generateUniqueId();
        }
        return set(data);
    }, [generateUniqueId, set]);

    //* Elimina un record dallo store tramite id
    const remove = useCallback((id) => {
        return new Promise((resolve, reject) => {
            if (!dbRef.current) {
                reject("DB non pronto");
                return;
            }

            const tx = dbRef.current.transaction(storeName, "readwrite");
            const store = tx.objectStore(storeName);
            const req = store.delete(id);

            req.onsuccess = () => resolve(true);
            req.onerror = e => reject(e.target.error);
        });
    }, [storeName]);

    //* Elimina tutti i record dallo store corrente
    const clear = useCallback(() => {
        return new Promise((resolve, reject) => {
            if (!dbRef.current) {
                reject("DB non pronto");
                return;
            }

            const tx = dbRef.current.transaction(storeName, "readwrite");
            const store = tx.objectStore(storeName);
            const req = store.clear();

            req.onsuccess = () => resolve(true);
            req.onerror = e => reject(e.target.error);
        });
    }, [storeName]);

    //* Apre la connessione a IndexedDB e inizializza lo store se necessario
    useEffect(() => {
        const request = indexedDB.open(dbName, version);

        request.onupgradeneeded = e => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(storeName)) {
                db.createObjectStore(storeName, { keyPath: "id" });
            }
        };

        request.onsuccess = e => {
            dbRef.current = e.target.result;
            setIsReady(true); // ✅ React sa che il DB è pronto
        };

        request.onerror = e => {
            console.error("IndexedDB error", e.target.error);
        };

        return () => {
            dbRef.current?.close();
        };
    }, [dbName, storeName, version]);

    return {
        get,
        getAll,
        set,
        setWithAutoId,
        remove,
        clear,
        isReady
    };
};