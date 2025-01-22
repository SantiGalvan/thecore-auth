import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() =>{
        const token = localStorage.getItem('accessToken');

        if(token) setIsAuthenticated(true);
    }, [])


    return (
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
} 

export {AuthProvider, AuthContext} 