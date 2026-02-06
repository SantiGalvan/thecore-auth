import { createContext, useContext, useEffect, useState } from "react";
import jwt_decode from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import { useConfig } from "../config/ConfigContext.jsx";
import { useLoading } from "../loading/LoadingContext.jsx";
import { useAlert } from "../alert/AlertContext.jsx";
import { fetchAxiosConfig } from "../../utils/axios/axiosInstance.js";
import { useAuthStorage } from "../../hooks/auth/useAuthStorage.jsx";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const { heartbeatEndpoint, firstPrivatePath, infiniteSession, timeDeducted, authenticatedEndpoint, autoLogin, setCurrentDate, isDebug, backendToken, useCustomLoginTimeout, stopLoaderOnFinish, customLoginTimeout, tokenLog, timerInfiniteSession } = useConfig();
    const { setIsLoading, showLoadingFor } = useLoading();
    const { setShowAlert, setMessageAlert, setTypeAlert, activeAlert } = useAlert();
    const { token, setToken, setUser, storageLogout } = useAuthStorage();

    const navigate = useNavigate();

    const [isAuthenticated, setIsAuthenticated] = useState(null);
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

            if (!useCustomLoginTimeout) {

                setIsLoading(true);

            } else {

                showLoadingFor(customLoginTimeout);
            }


            setShowAlert(false);

            const axiosInstance = await createAxiosInstances();

            const res = await axiosInstance.post(authenticatedEndpoint, {
                auth: formData
            });


            const dataToken = res.headers.token;
            const user = res.data;

            if (dataToken) {

                setUser(user);
                setToken(dataToken);
                setIsAuthenticated(true);
                navigate(`${firstPrivatePath}${user.id}`);

            }

        } catch (err) {

            console.error(err);
            setIsLoading(false);

        } finally {

            setIsLoggingIn(false);
            // Chiudo il Loading
            if (!useCustomLoginTimeout && stopLoaderOnFinish) setIsLoading(false);

        }

    }

    const logout = () => {

        storageLogout();
        setIsAuthenticated(false);

    }

    const fetchHeartbeat = async () => {

        try {

            const axiosInstance = await createAxiosInstances();

            const res = await axiosInstance.get(`${heartbeatEndpoint}`);

            const newToken = res.headers.token;
            setToken(newToken);

            if (isDebug) console.log('[Auth]: Nuovo token: ', newToken, 'Data:', setCurrentDate());

        } catch (err) {
            console.error(err);

            // Se c'è un errore faccio il logout
            logout();

        }
    }

    const getTokenExpiry = (tokenToCheck) => {
        const checkToken = tokenToCheck || token;

        if (!checkToken) return;
        const message = 'Token non valido';

        try {
            const decoded = jwt_decode(checkToken);
            // Se il token non ha exp, consideralo non valido
            if (!decoded.exp) {
                if (tokenLog) console.warn('[Auth]: Token senza data di scadenza, eseguo logout.');
                logout();
                activeAlert('danger', message);
                return;
            }

            const currentTime = Math.floor(Date.now() / 1000);
            const totalTime = (decoded.exp - currentTime) * 1000;

            // Se il token è già scaduto
            if (totalTime <= 0) {
                if (tokenLog) console.warn('[Auth]: Token scaduto, eseguo logout.');
                logout();
                activeAlert('danger', message);
                return;
            }

            // Imposta i timer per la sessione
            setSessionTimeout(totalTime);
            setTimeoutToken(totalTime - timeDeducted);
            const timer = totalTime - timeDeducted;

            // Log leggibile con minuti e secondi
            if (tokenLog) {
                const totalSeconds = Math.floor(totalTime / 1000);
                const minutes = Math.floor(totalSeconds / 60);
                const seconds = totalSeconds % 60;

                console.log(`[Auth]: Token valido per ancora: ${minutes} minuti e ${seconds} secondi`);
                console.log('[Auth]: Token:', token);
            }

            return timer;

        } catch (error) {
            if (tokenLog) console.error('[Auth]: Errore nella decodifica del token:', error);
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

            const res = await axiosInstance.get(heartbeatEndpoint);

            const user = res.data;

            if (user) {
                setUser(user);
                setToken(token);
                setIsAuthenticated(true);
                navigate(`${firstPrivatePath}${user.id}`);
            }

        } catch (err) {
            console.error(err);
        }
    }

    const handleLoad = () => {

        // Controllo che il token sia valido
        if (checkTokenValidity(token)) {
            if (tokenLog) console.log('[Auth]: Ricarico pagina → controllo scadenza token');

            // Aggiorna gli state dei timer e heartbeat
            getTokenExpiry(token);
        } else {
            // Token scaduto o non valido → logout
            if (tokenLog) console.warn('[Auth]: Token non valido al reload, eseguo logout');
            logout();
        }
    };

    // useEffect per il controllo del Token
    useEffect(() => {

        if (!checkTokenValidity(token)) {
            logout();
            return;
        }

        setIsAuthenticated(true);
    }, []);

    // Effettua automaticamente il login con il backendToken se l'utente non è autenticato. Evita richieste duplicate controllando che non sia già in corso un login manuale.
    useEffect(() => {
        if (autoLogin && !isAuthenticated && !isLoggingIn) {
            if (tokenLog) console.log('[Auth]: Tentativo di autologin con backendToken');
            fetchUser(backendToken);
        }
    }, [autoLogin, isAuthenticated, isLoggingIn]);

    // Esegue il controllo del token e aggiorna i timer al reload della pagina.
    useEffect(() => {

        // Se la pagina è già caricata, esegui subito
        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
            return () => window.removeEventListener('load', handleLoad);
        }

    }, []);

    // UseEffect per la sessione infinita e la sessione con scadenza del Token
    useEffect(() => {

        if (autoLogin) return;

        const timer = getTokenExpiry(token);

        const intervalTime = timerInfiniteSession || timer;
        if (tokenLog) console.log('[Auth]: intervallo per il prossimo token:', intervalTime);

        // Sessione infinita
        let timerToken;
        if (infiniteSession && token && timer) {

            if (tokenLog) console.log('[Auth]: Entrato dentro il timer della sessione infinita');

            timerToken = setInterval(() => {

                fetchHeartbeat();

            }, intervalTime);
        }

        // Sessione con scadenza del singolo Token
        let expirySession;
        if (!infiniteSession && token) {

            if (tokenLog) console.log('[Auth]: Entrato dentro il timer della sessione con scadenza del token');

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

    }, [token, timeoutToken]);

    const value = {
        isAuthenticated,
        setIsAuthenticated,
        login,
        logout,
        createAxiosInstances,
        fetchHeartbeat,
        getTokenExpiry,
        checkTokenValidity,
        fetchUser,
        handleLoad
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