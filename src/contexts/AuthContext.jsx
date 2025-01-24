import { createContext, useContext, useEffect, useState } from "react";
import { ConfigContext } from "./ConfigContext";
import axios from "axios";
import jwt_decode from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import {fetchConfig} from "../utils/axiosInstance.js";

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const { baseUri, heartbeatEndpoint, infiniteSession, timeDeducted, authenticatedEndpoint } = useContext(ConfigContext);

    const navigate = useNavigate();

    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [currentToken, setCurrentToken] = useState();
    const [timeoutToken, setTimeoutToken] = useState();
    const [sessionTimeout, setSessionTimeout] = useState();

    const login = async (e, formData) => {
        e.preventDefault();
    
        try {
          
          const axiosInstance = await fetchConfig();
    
          const res = await axiosInstance.post(authenticatedEndpoint, {
            auth:formData
          });
    
    
          const id = res.data.id;
          const token = res.headers.token;
          
          
          if (token) {
            
            localStorage.setItem('accessToken', token);
            setIsAuthenticated(true);
            setCurrentToken(token);
            navigate(`/dashboard/${id}`);
    
          }
         
        } catch (err) {
          console.error(err)
        }
    
    }

    const logout = () => {

        localStorage.removeItem('accessToken');
        setIsAuthenticated(false);
        setCurrentToken(null);

    }

    const fetchHeartbeat = async () => {

        try {
            
            const res = await axios.get(`${baseUri}${heartbeatEndpoint}`, 
                {headers: {
                    "Authorization": currentToken
                }}
            );

            const newToken = res.headers.token;
            localStorage.setItem('accessToken', newToken);


        } catch (err) {
            console.error(err);
        }
    }

    const getTokenExpiry = () => {

        if (!currentToken) {
            return
        }

        try {

            const decoded = jwt_decode(currentToken);
            const exp = decoded.exp;
            
            const currentTime = Math.floor(Date.now() / 1000); 
            
            const totalTime = (exp - currentTime) * 1000;
            setSessionTimeout(totalTime);
            
            setTimeoutToken(totalTime - timeDeducted);

        } catch (err) {
            console.error(err);
        }
    }

    // useEffect per il controllo del Token
    useEffect(() => {
        const token = localStorage.getItem('accessToken');

        if(token) {
            setIsAuthenticated(true);
        } else { 
            navigate('/');
            return;
        }
        
    }, []);

    // UseEffect per la sessione infinita e la sessione con scadenza del Token
    useEffect(() => {
        getTokenExpiry();

        
        // Sessione infinita
        let timerToken;
        if(infiniteSession && currentToken && timeoutToken) {
            timerToken = setInterval(() => {

                fetchHeartbeat();
                
            }, timeoutToken);
        }

        // Sessione con scadenza del singolo Token
        let expirySession;
        if (!infiniteSession && currentToken && sessionTimeout) {

            expirySession = setTimeout(() => {
                
                logout();
                
            }, sessionTimeout);
        }

        return () => {
            if (timerToken) {
                clearInterval(timerToken);
            }

            if(expirySession) {
                clearTimeout(expirySession);
            }
        }

    }, [currentToken, timeoutToken]);

    const value = {
        isAuthenticated,
        setIsAuthenticated,
        currentToken,
        setCurrentToken,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
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