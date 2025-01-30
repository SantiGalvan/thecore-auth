import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useConfig } from "../../contexts/ConfigContext";
import {fetchAxiosConfig} from "../../utils/axiosInstance.js";
import { useLoading } from "../../contexts/LoadingContext.jsx";
import { useAlert } from "../../contexts/AlertContext.jsx";

const Dashboard = () => {
    const { id } = useParams();

    const { logout, setCurrentToken } = useAuth();
    const { usersEndpoint } = useConfig();
    const { setIsLoading } = useLoading();
    const { setShowAlert, setTypeAlert, setMessageAlert } = useAlert();

    const [user, setUser] = useState({});
    const [users, setUsers] = useState(null);
    const [disabled, setDisabled] = useState(false);

    const fetchUser = async () => {
        
        try {

            setIsLoading(true);
            const token = localStorage.getItem('accessToken');

            if (!token) {
                logout();

                // Alert
                setShowAlert(true);
                setTypeAlert('danger');
                setMessageAlert('Sessione scaduta');
                
                return;
            }

            setCurrentToken(token);

            const axiosInstance = await fetchAxiosConfig(setShowAlert, setTypeAlert, setMessageAlert);

            const res = await axiosInstance.get(`${usersEndpoint}${id}`,
                {headers: {
                    "Authorization": token
                }}
            );

            const userData = res.data;

            setUser(userData);

            setIsLoading(false);

        } catch (err) {
            console.error(err);

            setIsLoading(false);

            logout();

        }
    }

    const fetchUsers = async () => {
        try {
            
            setDisabled(true);

            const token = localStorage.getItem('accessToken');

            if (!token) {
                logout();

                // Alert
                setShowAlert(true);
                setTypeAlert('danger');
                setMessageAlert('Sessione scaduta');

                return;
            }

            const axiosInstance = await fetchAxiosConfig(setShowAlert, setTypeAlert, setMessageAlert);

            const res = await axiosInstance.get(`${usersEndpoint}`,
                {headers: {
                    "Authorization": token
                }} 
            );

            const users = res.data
            setUsers(users);

            if(users) setDisabled(false);

        } catch (err) {
            console.error(err);

            setIsLoading(false);

            const statusError = err.status;

          if(statusError === 401) {

            logout();

          }

            setDisabled(false);
        }
    }

    const signOut = () => {
        logout();

        // Alert con messaggio e tipo
        setShowAlert(true);
        setTypeAlert('info');
        setMessageAlert('Hai effettuato il logout');
    }

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <section>
            <div className="container mx-auto py-8">

                <div className="flex items-center justify-center gap-8 h-20">

                    <h1 className="text-4xl text-center text-slate-800">Email: {user.email}</h1>

                    <button
                        onClick={signOut}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                    >
                        Logout
                    </button>

                </div>

                <div className="flex justify-center items-center my-12">
                    
                    <button 
                        onClick={fetchUsers}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full disabled:bg-blue-300 disabled:text-gray-500 disabled:cursor-not-allowed"
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