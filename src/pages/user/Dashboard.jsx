import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const baseUri = import.meta.env.VITE_BASE_URI;
const usersEndpoint = import.meta.env.VITE_USERS_ENDPOINT;

const Dashboard = () => {
    const { id } = useParams();

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

    useEffect(() => {
        fetchUser();
    }, [])

    return (
        <section>
            <div className="container mx-auto py-8">
                <h1 className="text-4xl text-center text-slate-800">Hello World {user?.email}</h1>

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