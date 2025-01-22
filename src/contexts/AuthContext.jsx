import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() =>{
        const token = localStorage.getItem('accessToken');

        if(token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, [])


    return (
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
} 

const useAuth = () => {
    const value = useContext(AuthContext);
    if (value === undefined) throw new Error('Non sei dentro al Auth Provider');

    return value;
}

export {AuthProvider, useAuth} 