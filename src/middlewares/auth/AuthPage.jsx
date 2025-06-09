import { Navigate, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../../contexts/auth/AuthContext';
import { useAlert } from '../../contexts/alert/AlertContext';
import { useConfig } from '../../contexts/config/ConfigContext';

const AuthPage = () => {

  const { isAuthenticated } = useAuth();
  const { activeAlert } = useAlert();
  const { autoLogin } = useConfig();

  useEffect(() => {

    const token = localStorage.getItem('accessToken');

    if (!isAuthenticated && !token && !autoLogin) {

      activeAlert('danger', 'Non sei autorizzato');

    }

  }, []);

  // Check per l'effettivo controllo del token
  if (isAuthenticated === null) {
    return null;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />

};

export default AuthPage;