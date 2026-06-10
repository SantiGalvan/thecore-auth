const DefaultAutoLoginFallback = ({ error }) => {

    let message = "Accesso automatico non riuscito.";
    let detail = "Si è verificato un errore imprevisto.";

    if (error?.request && !error?.response) {
        message = "Impossibile raggiungere il server.";
        detail = "Controlla la connessione di rete e riprova.";
    } else if (error?.response?.status === 401 || error?.response?.status === 403) {
        message = "Token non valido o scaduto.";
        detail = "Le credenziali di accesso automatico non sono più valide.";
    } else if (error?.response?.status >= 500) {
        message = "Errore del server.";
        detail = "Il servizio non è al momento disponibile. Riprova più tardi.";
    } else if (error?.response?.status) {
        message = `Errore ${error.response.status}.`;
    }

    return (
        <section id="autologin-fallback-page">
            <div className="container mx-auto flex flex-col items-center justify-center min-h-screen gap-4 text-center px-4">
                <p className="text-xl font-semibold">{message}</p>
                <p className="text-sm opacity-70">{detail}</p>
                <button
                    className="mt-4 px-6 py-2 rounded bg-primary text-white hover:opacity-80 transition-opacity"
                    onClick={() => window.location.reload()}
                >
                    Riprova
                </button>
            </div>
        </section>
    );
};

export default DefaultAutoLoginFallback;
