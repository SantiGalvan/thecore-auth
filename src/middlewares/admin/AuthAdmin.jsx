import { Navigate, useLocation } from "react-router-dom";
import { useAlert } from "../../contexts/alert/AlertContext";
import { useEffect } from "react";
import { useAuthStorage } from "../../hooks/auth/useAuthStorage";

const AuthAdmin = ({ children }) => {

    const { user } = useAuthStorage();

    const location = useLocation();
    const { activeAlert } = useAlert();

    useEffect(() => {
        if (!user || !user.admin) activeAlert('warning', 'Non puoi accedere a questa pagina');
    }, [user])

    if (!user || !user.admin) return <Navigate to={location.state?.from || '/'} replace />;

    return children;
}

export default AuthAdmin;