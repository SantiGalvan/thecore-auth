import { useEffect, useState } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";

const Prompt = ({ isDebug }) => {

    const [showPrompt, setShowPrompt] = useState(false);
    const [dismissed, setDismissed] = useState(false);

    const { needRefresh, updateServiceWorker } = useRegisterSW({
        onRegisteredSW(swUrl, r) {
            if (isDebug) console.log("Service Worker registrato:", swUrl);
            if (r && r.waiting) {
                if (isDebug) console.log("Un nuovo Service Worker è disponibile:", r.waiting);
                if (!dismissed) {
                    setShowPrompt(true);
                }
            }
        },
        onRegisterError(error) {
            console.error("Errore nella registrazione del Service Worker:", error);
        },
    });

    useEffect(() => {
        if (needRefresh[0] && !dismissed) {
            setShowPrompt(true);
        }
    }, [needRefresh, dismissed]);

    if (!showPrompt) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 px-4">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
                <h2 className="text-xl font-bold mb-2">Aggiornamento disponibile</h2>
                <p className="text-gray-600 mb-4">
                    È disponibile una nuova versione dell'app. Vuoi aggiornare?
                </p>
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={() => {
                            updateServiceWorker(true);
                            window.location.reload();
                        }}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md transition duration-200 ease-in-out transform active:translate-y-[2px] cursor-pointer"
                    >
                        Aggiorna
                    </button>
                    <button
                        onClick={() => {
                            setShowPrompt(false);
                            setDismissed(true);
                        }}
                        className="bg-gray-300 px-4 py-2 rounded-lg shadow-md transition duration-200 ease-in-out transform active:translate-y-[2px] cursor-pointer"
                    >
                        Annulla
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Prompt;
