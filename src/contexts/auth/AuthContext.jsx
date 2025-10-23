import { createContext, useContext, useEffect, useState } from "react";
import jwt_decode from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import { useConfig } from "../config/ConfigContext.jsx";
import { useLoading } from "../loading/LoadingContext.jsx";
import { useAlert } from "../alert/AlertContext.jsx";
import { fetchAxiosConfig } from "../../utils/axiosInstance.js";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const { heartbeatEndpoint, firstPrivatePath, infiniteSession, timeDeducted, authenticatedEndpoint, autoLogin, setCurrentDate, isDebug, backendToken, useCustomLoginTimeout, customLoginTimeout } = useConfig();
    const { setIsLoading, showLoadingFor } = useLoading();
    const { setShowAlert, setMessageAlert, setTypeAlert, activeAlert } = useAlert();

    const navigate = useNavigate();

    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [currentToken, setCurrentToken] = useState();
    const [timeoutToken, setTimeoutToken] = useState();
    const [sessionTimeout, setSessionTimeout] = useState();
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const createAxiosInstances = async (onUnauthorized = logout, onNotFound, onGenericError) => {

        const axios = await fetchAxiosConfig(setShowAlert, setTypeAlert, setMessageAlert, onUnauthorized, onNotFound, onGenericError);

        return axios;
    }

    const login = async (e = null, formData) => {

        if (e) {
            e.preventDefault();
        }

        setIsLoggingIn(true);

        try {

            if (!useCustomLoginTimeout) setIsLoading(true);

            showLoadingFor(customLoginTimeout);
            setShowAlert(false);

            const axiosInstance = await createAxiosInstances();

            const res = await axiosInstance.post(authenticatedEndpoint, {
                auth: formData
            });


            const token = res.headers.token;
            const user = res.data;

            if (token) {

                localStorage.setItem('accessToken', token);
                localStorage.setItem('user', JSON.stringify(user));
                setIsAuthenticated(true);
                setCurrentToken(token);
                navigate(`${firstPrivatePath}${user.id}`);

            }

        } catch (err) {

            console.error(err);

        } finally {

            setIsLoggingIn(false);
            // Chiudo il Loading
            if (!useCustomLoginTimeout) setIsLoading(false);


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

            const axiosInstance = await createAxiosInstances();

            const res = await axiosInstance.get(`${heartbeatEndpoint}`,
                {
                    headers: {
                        "Authorization": token
                    }
                }
            );

            const newToken = res.headers.token;
            localStorage.setItem('accessToken', newToken);
            setCurrentToken(newToken);

            if (isDebug) console.log('nuovo token: ', newToken, 'Data:', setCurrentDate());

        } catch (err) {
            console.error(err);

            // Se c'è un errore faccio il logout
            logout();

        }
    }

    const getTokenExpiry = () => {
        if (!currentToken) return;
        const message = 'Token non valido';

        try {
            const decoded = jwt_decode(currentToken);

            // Se il token non ha exp, consideralo non valido
            if (!decoded.exp) {
                if (isDebug) console.warn('[Auth]: Token senza data di scadenza, eseguo logout.');
                logout();
                activeAlert('danger', message);
                return;
            }

            const currentTime = Math.floor(Date.now() / 1000);
            const totalTime = (decoded.exp - currentTime) * 1000;

            // Se il token è già scaduto
            if (totalTime <= 0) {
                console.warn('[Auth]: Token scaduto, eseguo logout.');
                logout();
                activeAlert('danger', message);
                return;
            }

            // Imposta i timer per la sessione
            setSessionTimeout(totalTime);
            setTimeoutToken(totalTime - timeDeducted);

            // Log leggibile con minuti e secondi
            if (isDebug) {
                const totalSeconds = Math.floor(totalTime / 1000);
                const minutes = Math.floor(totalSeconds / 60);
                const seconds = totalSeconds % 60;
                console.log(`[Auth]: Token valido per ancora: ${minutes} minuti e ${seconds} secondi`);
                console.log('Token:', currentToken);
            }

        } catch (error) {
            if (isDebug) console.error('[Auth]: Errore nella decodifica del token:', error);
            logout();
            activeAlert('danger', message);
        }
    };

    const checkTokenValidity = (token) => {
        if (!token) return false;

        try {
            const decoded = jwt_decode(token);
            const currentTime = Math.floor(Date.now() / 1000);

            if (!decoded.exp || decoded.exp < currentTime) {
                console.warn('[Auth]: Token scaduto o non valido');
                return false;
            }

            return true; // Token valido
        } catch (error) {
            console.error('[Auth]: Token non valido o corrotto', error);
            return false;
        }
    };

    const fetchUser = async (token) => {
        try {

            const axiosInstance = await createAxiosInstances();

            const res = await axiosInstance.get(heartbeatEndpoint,
                {
                    headers: {
                        "Authorization": token
                    }
                }
            );

            const user = res.data;

            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('accessToken', token);
                setIsAuthenticated(true);
                navigate(`${firstPrivatePath}${user.id}`);
            }

        } catch (err) {
            console.error(err);
        }
    }

    // useEffect per il controllo del Token
    useEffect(() => {
        const token = localStorage.getItem('accessToken');

        if (!checkTokenValidity(token)) {
            logout();
            return;
        }

        setIsAuthenticated(true);
    }, []);

    // Effettua automaticamente il login con il backendToken se l'utente non è autenticato.
    // Evita richieste duplicate controllando che non sia già in corso un login manuale.
    useEffect(() => {
        if (autoLogin && !isAuthenticated && !isLoggingIn) {
            if (isDebug) console.log('[Auth]: Tentativo di autologin con backendToken');
            fetchUser(backendToken);
        }
    }, [autoLogin, isAuthenticated, isLoggingIn]);


    // UseEffect per la sessione infinita e la sessione con scadenza del Token
    useEffect(() => {

        if (autoLogin) return;

        getTokenExpiry();

        // Sessione infinita
        let timerToken;
        if (infiniteSession && currentToken && timeoutToken) {
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

            if (expirySession) {
                clearTimeout(expirySession);
            }
        }

    }, [currentToken, timeoutToken]);



    const value = {
        isAuthenticated,
        setIsAuthenticated,
        login,
        logout,
        setCurrentToken,
        createAxiosInstances
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

export { AuthProvider, useAuth }