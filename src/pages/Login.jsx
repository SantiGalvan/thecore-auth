import { useEffect, useState } from "react"
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../contexts/AlertContext";
import { useConfig } from "../contexts/ConfigContext";
import LoginForm from "../components/LoginForm";
import Logo from '../assets/MyWarehouse.svg?react';


const Login = (props) => {

  const {
    formTitle = 'Accedi',
    inputLabel = 'Email',
    inputType = 'email',
    inputPlaceholder = 'example@example.it',
    buttonText = 'Accedi',
    LogoImg = Logo,
    userData,

    styleCardForm,
    styleContainerLogo,
    styleLogo,

  } = props;

  const { login } = useAuth();
  const { setShowAlert, setTypeAlert, setMessageAlert } = useAlert();
  const { clearLoginFormOnError } = useConfig();

  const navigate = useNavigate();

  const initialData = {
    email: '',
    password: ''
  }

  const [formData, setFormData] = useState(initialData);

  const changeData = (key, value) => {
    setFormData(curr => ({...curr, [key]:value}))
  }

  const handleLogin = e => {
    login(e,formData);
    if (clearLoginFormOnError) setFormData(initialData);
  }

  // UseEffect per controllare che l'utente loggato non entri nella pagina di login
  useEffect(() => {
    
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('accessToken');

    if(token && id) {
      navigate(`/dashboard/${id}`);

      // Alert
      setShowAlert(true);
      setTypeAlert('info');
      setMessageAlert('Sei già loggato');
    }

  }, []);

  return (
    <section id="login-page">
      <div className="container mx-auto flex items-center justify-center h-screen">
        
        <div className={`form-style bg-form flex items-center justify-center ${styleCardForm}`}>

          <div className={`basis-1/2 flex items-center justify-center ${styleContainerLogo}`}>

            {LogoImg && <LogoImg className={`login-logo ${styleLogo}`} />}

          </div>

          <LoginForm 
            submitForm={handleLogin}
            formData={formData}
            changeValue={changeData}
            
            title={formTitle}
            label={inputLabel}
            type={inputType}
            placeholder={inputPlaceholder}
            buttonText={buttonText}

            userData={userData}
          />

        </div>


      </div>
    </section>
  )
}

export default Login;