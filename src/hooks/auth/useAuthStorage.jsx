import { useStorage } from "../storage/useStorage";

const useAuthStorage = () => {
    const [token, setToken, removeToken] = useStorage(null, 'accessToken');
    const [user, setUser, removeUser] = useStorage(null, 'user');
    const [id, setId, removeId] = useStorage(null, 'id');

    const storageLogout = () => {
        removeToken();
        removeUser();
        removeId();
    }

    return { token, user, id, setToken, setUser, setId, storageLogout };
}

export { useAuthStorage };