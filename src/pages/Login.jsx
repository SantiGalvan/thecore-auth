import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { useLoginForm } from "../contexts/LoginFormContext";
import { useConfig } from "../contexts/ConfigContext";


const Login = ({ Logo }) => {

  const { styleCardForm, styleContainerLogo, styleLogo, overrideStyle } = useLoginForm();
  const { firstPrivatePath } = useConfig();

  const navigate = useNavigate();

  // UseEffect per controllare che l'utente loggato non entri nella pagina di login
  useEffect(() => {

    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('accessToken');

    if (token && user.id) navigate(`${firstPrivatePath}${user.id}`);

  }, []);

  return (
    <section id="login-page">

      <div className={overrideStyle.container || `container mx-auto flex items-center justify-center h-screen`}>

        <div className={overrideStyle.cardForm || `bg-form card-style card-size flex flex-col sm:flex-row sm:items-center justify-center ${styleCardForm}`}>

          <div className={overrideStyle.containerLogo || `basis-1/2 flex items-center justify-center ${styleContainerLogo}`}>

            {Logo && <Logo className={overrideStyle.logo || `login-logo h-full sm:h-auto ${styleLogo}`} />}

          </div>

          <LoginForm />

        </div>

      </div>

    </section>
  )
}

export default Login;