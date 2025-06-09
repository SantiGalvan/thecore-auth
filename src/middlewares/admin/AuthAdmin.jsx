import { Navigate, useLocation } from "react-router-dom";
import { useAlert } from "../../contexts/alert/AlertContext";
import { useEffect } from "react";

const AuthAdmin = ({ children }) => {

    const location = useLocation();
    const { activeAlert } = useAlert();
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (!user || !user.admin) activeAlert('warning', 'Non puoi accedere a questa pagina');
    }, [user])

    if (!user || !user.admin) return <Navigate to={location.state?.from || '/'} replace />;

    return children;
}

export default AuthAdmin;