import { useState } from "react";
import { useAuth } from "../../contexts/auth/AuthContext";
import { useConfig } from "../../contexts/config/ConfigContext";
import { useLoading } from "../../contexts/loading/LoadingContext";
import { useAlert } from "../../contexts/alert/AlertContext";
import { useAuthStorage } from "../../hooks/auth/useAuthStorage";
import { useToast } from "../../hooks/toast/useToast";
import SwitchRadio from "../../components/inputs/SwitchRadio";

const Dashboard = () => {

    const { logout, createAxiosInstances } = useAuth();
    const { usersEndpoint } = useConfig();
    const { setIsLoading } = useLoading();
    const { activeAlert } = useAlert();
    const { token, user } = useAuthStorage();
    const { success, error, info, warning, promise } = useToast();

    const [users, setUsers] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const showPromiseToast = (customPromise, messages) => {
        return promise(customPromise, {
            loading: { title: messages.loading || "Caricamento..." },
            success: { title: messages.success || "Fatto!" },
            error: { title: messages.error || "Errore!" },
        });
    };

    const fetchUsers = async () => {

        try {

            setDisabled(true);

            if (!token) {
                logout();

                // Alert
                activeAlert('danger', 'Sessione Scaduta');

                return;
            }

            const axiosInstance = await createAxiosInstances();
            // Qui avvolgo la promise con Sileo
            const res = await showPromiseToast( axiosInstance.get(`${usersEndpoint}`),
                {
                    loading: "Caricamento utenti...",
                    success: "Utenti caricati!",
                    // error: "Errore nel caricamento utenti"
                }
            );

            const users = res.data
            setUsers(users);

        } catch (err) {
            console.error(err);

            setIsLoading(false);

        } finally {

            setDisabled(false);

        }
    }

    const handleToggle = (next) => {
        setIsMobile(next);

        // test: mostra un toast ogni volta che cambia
        activeAlert("info", `Alert impostato su ${next ? "Mobile" : "Desktop"} `);
    };

    const successAlert = (message = "Operazione riuscita!") => {
        if (isMobile) {
            success("Successo", message);
        } else {
            activeAlert("success", message, true);
        }
    };

    const errorAlert = (message = "Si è verificato un errore!") => {
        if (isMobile) {
            error("Errore", message);
        } else {
            activeAlert("danger", message, true);
        }
    };

    const infoAlert = (message = "Informazione generica") => {
        if (isMobile) {
            info("Info", message);
        } else {
            activeAlert("info", message, true);
        }
    };

    const warningAlert = (message = "Attenzione!") => {
        if (isMobile) {
            warning("Attenzione", message);
        } else {
            activeAlert("warning", message, true);
        }
    };

    const signOut = () => {
        logout();

        // Alert con messaggio e tipo
        activeAlert('info', 'Hai effettuato il logout');
        // sileo.info({ title: 'Hai effettuato il logout' })
    }

    return (
        <section>
            <div className="container mx-auto py-8">

                <div className="flex items-center justify-center gap-8 h-20">

                    <h1 className="text-4xl text-center text-slate-800">Email: {user.email}</h1>

                    <button
                        onClick={signOut}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full cursor-pointer shadow-[0_4px_10px_rgba(239,68,68,0.3),0_2px_4px_rgba(239,68,68,0.2)] hover:shadow-[0_6px_14px_rgba(185,28,28,0.4),0_3px_6px_rgba(185,28,28,0.3)] active:shadow-[0_2px_5px_rgba(239,68,68,0.3)] transition-all duration-200 active:translate-y-[2px]"
                    >
                        Logout
                    </button>

                </div>

                <div className="flex justify-center items-center gap-4 my-8 flex-wrap">
                    <button
                        onClick={() => successAlert("Questo è un toast di successo!")}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full shadow-md transition-all"
                    >
                        Success
                    </button>

                    <button
                        onClick={() => errorAlert("Questo è un toast di errore!")}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full shadow-md transition-all"
                    >
                        Error
                    </button>

                    <button
                        onClick={() => infoAlert("Questo è un toast informativo!")}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-md transition-all"
                    >
                        Info
                    </button>

                    <button
                        onClick={() => warningAlert("Questo è un toast di avviso!")}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full shadow-md transition-all"
                    >
                        Warning
                    </button>

                    <div className="flex items-center gap-4 my-4">
                        <span>Desktop</span>
                        <SwitchRadio value={isMobile} onChange={handleToggle} />
                        <span>Mobile</span>
                    </div>
                </div>


                <div className="flex justify-center items-center my-12 gap-8">

                    <button
                        onClick={fetchUsers}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full disabled:bg-blue-300 disabled:text-gray-500 disabled:cursor-not-allowed cursor-pointer transition-all duration-200 active:translate-y-[2px] shadow-[0_4px_10px_rgba(59,130,246,0.3),0_2px_4px_rgba(59,130,246,0.2)] hover:shadow-[0_6px_14px_rgba(29,78,216,0.4),0_3px_6px_rgba(29,78,216,0.3)] active:shadow-[0_2px_5px_rgba(59,130,246,0.3)]"
                        disabled={disabled}
                    >
                        Lista degli utenti
                    </button>

                </div>

                <div className="flex justify-center items-center">

                    {users && <ul>
                        {users.map(user => (
                            <li key={`user-${user.id}`} className="text-xl my-4">{user.id} - {user.email}</li>
                        ))}
                    </ul>}

                </div>

            </div>
        </section>
    )
}

export default Dashboard;