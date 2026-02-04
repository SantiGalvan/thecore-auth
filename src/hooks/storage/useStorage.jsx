import { useState } from "react";

const useStorage = (initialValue, itemKey) => {

    // ✅ Stato iniziale preso dal localStorage
    const [state, setState] = useState(() => {
        try {
            const storedValue = localStorage.getItem(itemKey);

            if (storedValue === null) {
                localStorage.setItem(itemKey, JSON.stringify(initialValue));
                return initialValue;
            }

            return JSON.parse(storedValue);

        } catch (error) {
            console.error("Errore nel recupero dal localStorage:", error);
            return initialValue;
        }
    });

    // ✅ Aggiorna stato + localStorage
    const changeState = (value) => {
        setState((prev) => {

            const newValue =
                typeof value === "function" ? value(prev) : value;

            localStorage.setItem(itemKey, JSON.stringify(newValue));

            return newValue;
        });
    };

    // ✅ Remove avanzato
    // remove()        → cancella solo itemKey
    // remove(true)    → cancella TUTTO localStorage
    const remove = (clearAll = false) => {

        if (clearAll) {
            localStorage.clear(); // ⚠️ cancella tutto
            // console.warn("localStorage completamente svuotato");
        } else {
            localStorage.removeItem(itemKey); // ✅ cancella solo questa chiave
        }

        // Reset dello stato
        setState(initialValue);
    };

    return [state, changeState, remove];
};

export { useStorage };
