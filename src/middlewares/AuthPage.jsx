import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useAlert } from '../contexts/AlertContext';
import { useEffect } from 'react';
import { useConfig } from '../contexts/ConfigContext';

const AuthPage = () => {
  
  const { isAuthenticated } = useAuth();
  const { activeAlert } = useAlert();
  const { autoLogin } = useConfig();
  
  useEffect(() => {

    const token = localStorage.getItem('accessToken');

    if(!isAuthenticated && !token && !autoLogin) {

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