import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useAlert } from '../contexts/AlertContext';
import { useEffect } from 'react';

const AuthPage = () => {
  const { isAuthenticated } = useAuth();

  const {setShowAlert, setTypeAlert, setMessageAlert} = useAlert();

  const token = localStorage.getItem('accessToken');

  useEffect(() => {

    if(!isAuthenticated && !token) {

      setShowAlert(true);
      setTypeAlert('danger');
      setMessageAlert('Non sei autorizzato');
    }

  }, []);

  // Check per l'effettivo controllo del token
  if (isAuthenticated === null) {
    return null;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />
 
};

export default AuthPage;