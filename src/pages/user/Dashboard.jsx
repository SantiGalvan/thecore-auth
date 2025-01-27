import { useContext, useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { ConfigContext } from "../../contexts/ConfigContext";
import {fetchConfig} from "../../utils/axiosInstance.js";
import Loading from "../../components/Loading.jsx";
import { LoadingContext } from "../../contexts/LoadingContext.jsx";

const Dashboard = () => {
    const { id } = useParams();

    const { logout } = useAuth();
    const { usersEndpoint } = useContext(ConfigContext);
    const { isLoading, setIsLoading} = useContext(LoadingContext);

    const [user, setUser] = useState({});
    const [users, setUsers] = useState(null);

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

            if (user) setIsLoading(false);
            
        } catch (err) {
            console.error(err);
        }
    }

    const fetchUsers = async () => {
        try {
            
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

        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <section>
           { isLoading ? <Loading /> :
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
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
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

            </div>}
        </section>
    )
}

export default Dashboard;