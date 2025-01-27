import { useContext, useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { ConfigContext } from "../../contexts/ConfigContext";
import {fetchConfig} from "../../utils/axiosInstance.js";
import { useLoading } from "../../contexts/LoadingContext.jsx";

const Dashboard = () => {
    const { id } = useParams();

    const { logout } = useAuth();
    const { usersEndpoint } = useContext(ConfigContext);
    const { setIsLoading } = useLoading();

    const [user, setUser] = useState({});
    const [users, setUsers] = useState(null);
    const [disabled, setDisabled] = useState(false);

    const fetchUser = async () => {
        
        try {

            setIsLoading(true);
            const token = localStorage.getItem('accessToken');

            if (!token) {
                logout();
                return;
            }

            const axiosInstance = await fetchConfig();

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
        }
    }

    const fetchUsers = async () => {
        try {
            
            setDisabled(true);

            const token = localStorage.getItem('accessToken');

            if (!token) {
                logout();
                return;
            }

            const axiosInstance = await fetchConfig();

            const res = await axiosInstance.get(`${usersEndpoint}`,
                {headers: {
                    "Authorization": token
                }} 
            );

            const users = res.data
            setUsers(users);

            console.log(users);

        } catch (err) {
            console.error(err);
        }
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
                        onClick={logout}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                    >
                        Logout
                    </button>

                </div>

                <div className="flex justify-center items-center my-12">
                    
                    <button 
                        onClick={fetchUsers}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
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