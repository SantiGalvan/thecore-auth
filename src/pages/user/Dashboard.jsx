import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ConfigContext } from "../../contexts/ConfigContext";

const Dashboard = () => {
    const { id } = useParams();

    const {setIsAuthenticated} = useContext(AuthContext);
    const {baseUri, usersEndpoint} = useContext(ConfigContext);

    const [user, setUser] = useState();
    const [users, setUsers] = useState();

    const fetchUser = async () => {
        
        try {

            const token = localStorage.getItem('accessToken');

            const res = await axios.get(`${baseUri}${usersEndpoint}${id}`,
                {headers: {
                    "Authorization": token
                }}
            );

            setUser(res.data);
            
        } catch (err) {
            console.error(err);
        }
    }

    const fetchUsers = async () => {
        try {
            
            const token = localStorage.getItem('accessToken');

            const res = await axios.get(`${baseUri}${usersEndpoint}`,
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

    const logout = () => {

        localStorage.removeItem('accessToken');
        setIsAuthenticated(false);

    }

    useEffect(() => {
        fetchUser();
    }, [])

    return (
        <section>
            <div className="container mx-auto py-8">

                <div className="flex items-center justify-center gap-8 h-20">

                    <h1 className="text-4xl text-center text-slate-800">Hello World {user?.email}</h1>

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

                    <ul>
                        {users?.map(user => (
                            <li key={`user-${user.id}`} className="text-xl my-4">{user.id} - {user.email}</li>
                        ))}
                    </ul>

                </div>

            </div>
        </section>
    )
}

export default Dashboard;