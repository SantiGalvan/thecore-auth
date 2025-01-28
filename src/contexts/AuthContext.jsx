import { createContext, useContext, useEffect, useState } from "react";
import { ConfigContext } from "./ConfigContext";
import jwt_decode from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import {fetchAxiosConfig} from "../utils/axiosInstance.js";
import { useLoading } from "./LoadingContext.jsx";
import { useAlert } from "./AlertContext.jsx";

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const { heartbeatEndpoint, infiniteSession, timeDeducted, authenticatedEndpoint } = useContext(ConfigContext);
    const {setIsLoading} = useLoading();
    const { setShowAlert, setMessageAlert, setTypeAlert } = useAlert();

    const navigate = useNavigate();

    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [currentToken, setCurrentToken] = useState();
    const [timeoutToken, setTimeoutToken] = useState();
    const [sessionTimeout, setSessionTimeout] = useState();

    const login = async (e, formData) => {
        e.preventDefault();
    
        try {
          
          setIsLoading(true);
          setShowAlert(false);

          const axiosInstance = await fetchAxiosConfig(setShowAlert, setTypeAlert, setMessageAlert);
    
          const res = await axiosInstance.post(authenticatedEndpoint, {
            auth:formData
          });
    
    
          const id = res.data.id;
          const token = res.headers.token;
          
          
          if (token) {
            
            localStorage.setItem('accessToken', token);
            localStorage.setItem('id', id);
            setIsAuthenticated(true);
            setCurrentToken(token);
            navigate(`/dashboard/${id}`);

          }

        } catch (err) {
          console.error(err);

          // Chiudo il Loading
          setIsLoading(false);
        }
    
    }

    const logout = () => {

        localStorage.removeItem('accessToken');
        localStorage.removeItem('id');
        setIsAuthenticated(false);
        setCurrentToken(null);

    }

    const fetchHeartbeat = async () => {

        try {
            
            const token = localStorage.getItem('accessToken');

            const axiosInstance = await fetchAxiosConfig(setShowAlert, setTypeAlert, setMessageAlert);

            const res = await axiosInstance.get(`${heartbeatEndpoint}`, 
                {headers: {
                    "Authorization": token
                }}
            );

            const newToken = res.headers.token;
            localStorage.setItem('accessToken', newToken);

        } catch (err) {
            console.error(err);

            // Se c'è un errore faccio il logout
            logout();

        }
    }

    const getTokenExpiry = () => {

        if (!currentToken) {
            return
        }

        const decoded = jwt_decode(currentToken);
        const exp = decoded.exp;
        
        const currentTime = Math.floor(Date.now() / 1000); 
        
        const totalTime = (exp - currentTime) * 1000;
        setSessionTimeout(totalTime);
        
        setTimeoutToken(totalTime - timeDeducted);
    }

    // useEffect per il controllo del Token
    useEffect(() => {
        const token = localStorage.getItem('accessToken');

        if(token) {
            setIsAuthenticated(true);
        } else { 
            
            setIsAuthenticated(false);

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

                // Alert
                setShowAlert(true);
                setTypeAlert('danger');
                setMessageAlert('Sessione scaduta');
                
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