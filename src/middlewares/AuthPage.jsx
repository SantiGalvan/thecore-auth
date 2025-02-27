import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useAlert } from '../contexts/AlertContext';
import { useEffect } from 'react';
import { useConfig } from '../contexts/ConfigContext';

const AuthPage = () => {
  
  const { isAuthenticated, logout } = useAuth();
  const {setShowAlert, setTypeAlert, setMessageAlert} = useAlert();
  const { autoLogin } = useConfig();
  
  useEffect(() => {

    const token = localStorage.getItem('accessToken');

    if(!isAuthenticated && !token && !autoLogin) {

      setShowAlert(true);
      setTypeAlert('danger');
      setMessageAlert('Non sei autorizzato');

      logout();

    }

  }, [isAuthenticated]);

  // Check per l'effettivo controllo del token
  if (isAuthenticated === null) {
    return null;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />
 
};

export default AuthPage;