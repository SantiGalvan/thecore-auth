import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useConfig } from "../../contexts/ConfigContext";
import { fetchAxiosConfig } from "../../utils/axiosInstance.js";
import { useLoading } from "../../contexts/LoadingContext.jsx";
import { useAlert } from "../../contexts/AlertContext.jsx";

const Dashboard = () => {
    const { id } = useParams();

    const { logout, setCurrentToken } = useAuth();
    const { usersEndpoint } = useConfig();
    const { setIsLoading } = useLoading();
    const { setShowAlert, setTypeAlert, setMessageAlert, activeAlert } = useAlert();

    const [users, setUsers] = useState(null);
    const [disabled, setDisabled] = useState(false);

    const user = JSON.parse(localStorage.getItem('user'));

    const fetchUsers = async () => {

        try {

            setDisabled(true);

            const token = localStorage.getItem('accessToken');

            if (!token) {
                logout();

                // Alert
                activeAlert('danger', 'Sessione Scaduta');

                return;
            }

            const axiosInstance = await fetchAxiosConfig(setShowAlert, setTypeAlert, setMessageAlert);

            const res = await axiosInstance.get(`${usersEndpoint}`,
                {
                    headers: {
                        "Authorization": token
                    }
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

    const signOut = () => {
        logout();

        // Alert con messaggio e tipo
        activeAlert('info', 'Hai effettuato il logout');
    }

    useEffect(() => {
        const token = localStorage.getItem('accessToken');

        if (token) setCurrentToken(token);

    }, []);

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