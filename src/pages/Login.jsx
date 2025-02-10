import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useAlert } from "../contexts/AlertContext";
import LoginForm from "../components/LoginForm";
import { useLoginForm } from "../contexts/LoginFormContext";


const Login = ({Logo}) => {

  const { setShowAlert, setTypeAlert, setMessageAlert } = useAlert();
  const { styleCardForm, styleContainerLogo, styleLogo } = useLoginForm();

  const navigate = useNavigate();

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
        
        <div className={`bg-form card-style card-size flex flex-col sm:flex-row sm:items-center justify-center ${styleCardForm}`}>

          <div className={`basis-1/2 flex items-center justify-center ${styleContainerLogo}`}>

            {Logo && <Logo className={`login-logo h-full sm:h-auto ${styleLogo}`} />}

          </div>

          <LoginForm />

        </div>

      </div>

    </section>
  )
}

export default Login;