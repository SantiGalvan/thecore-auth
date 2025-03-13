import { createContext, useContext, useEffect, useState } from "react";
import { useConfig } from "./ConfigContext";
import jwt_decode from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import {fetchAxiosConfig} from "../utils/axiosInstance.js";
import { useLoading } from "./LoadingContext.jsx";
import { useAlert } from "./AlertContext.jsx";

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const { heartbeatEndpoint, firstPrivatePath, infiniteSession, timeDeducted, authenticatedEndpoint, autoLogin, autoLoginEmail, autoLoginPassword, setCurrentDate } = useConfig();
    const {setIsLoading} = useLoading();
    const { setShowAlert, setMessageAlert, setTypeAlert, activeAlert } = useAlert();

    const navigate = useNavigate();

    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [currentToken, setCurrentToken] = useState();
    const [timeoutToken, setTimeoutToken] = useState();
    const [sessionTimeout, setSessionTimeout] = useState();
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const login = async (e = null, formData) => {

        if (e) {
            e.preventDefault();
        }
    
        setIsLoggingIn(true);

        try {
          
          setIsLoading(true);
          setShowAlert(false);

          const axiosInstance = await fetchAxiosConfig(setShowAlert, setTypeAlert, setMessageAlert);
    
          const res = await axiosInstance.post(authenticatedEndpoint, {
            auth:formData
          });
    
    
          const id = res.data.id;
          const token = res.headers.token;
          const user = res.data;
          
          if (token) {
            
            localStorage.setItem('accessToken', token);
            localStorage.setItem('id', id);
            localStorage.setItem('user', JSON.stringify(user));
            setIsAuthenticated(true);
            setCurrentToken(token);
            navigate(`${firstPrivatePath}${id}`);

          }

        } catch (err) {

          console.error(err);

        } finally {

          setIsLoggingIn(false);
          // Chiudo il Loading
          setIsLoading(false);

        }
    
    }

    const logout = () => {

        localStorage.removeItem('accessToken');
        localStorage.removeItem('id');
        localStorage.removeItem('user');
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
            setCurrentToken(newToken);

            console.log('nuovo token: ', newToken, 'Data:', setCurrentDate());

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

    // useEffect per l'auto login
    useEffect(() => {

        const token = localStorage.getItem('accessToken')

        // Se la falg autoLogin è su true e se il token non c'è allora fai l'autologin
        if(autoLogin && !token && !isLoggingIn) {

            const formData = {
                email: autoLoginEmail,
                password: autoLoginPassword
            }

            login(null, formData);
        }
        
    }, [autoLogin, isLoggingIn]);

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
                activeAlert('danger', 'Sessione scaduta');
                
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

    // useEffect per il controllo dell'autologin quando 
    useEffect(() => {
        if(isAuthenticated) return;

        if(autoLogin && !isLoggingIn) {

            const formData = {
                email: autoLoginEmail,
                password: autoLoginPassword
            }

            login(null, formData);
        }

    }, [isAuthenticated]);

    const value = {
        isAuthenticated,
        setIsAuthenticated,
        login,
        logout,
        setCurrentToken
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