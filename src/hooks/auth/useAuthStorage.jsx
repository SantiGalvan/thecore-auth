import { useStorage } from "../storage/useStorage";

const useAuthStorage = () => {
    const [token, setToken, removeToken] = useStorage(null, 'accessToken');
    const [user, setUser, removeUser] = useStorage(null, 'user');

    const storageLogout = () => {
        removeToken();
        removeUser();
    }

    return { token, user, setToken, setUser, storageLogout };
}

export { useAuthStorage };