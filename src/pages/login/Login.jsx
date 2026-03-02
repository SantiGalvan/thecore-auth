import { useEffect } from "react"
import LoginForm from "../../components/form/LoginForm";
import { useLoginForm } from "../../contexts/login/LoginFormContext";
import { useConfig } from "../../contexts/config/ConfigContext";
import { useNavigate } from "react-router-dom";
import { useAuthStorage } from "../../hooks/auth/useAuthStorage";

const Login = ({ Logo }) => {

  const { styleCardForm, styleContainerLogo, styleLogo, overrideStyle, customVersion } = useLoginForm();
  const { firstPrivatePath, version } = useConfig();
  const { token, user } = useAuthStorage();

  const navigate = useNavigate();

  // UseEffect per controllare che l'utente loggato non entri nella pagina di login
  useEffect(() => {

    if (token && user?.id) navigate(`${firstPrivatePath}${user.id}`);

  }, []);

  useEffect(() => {
    const setLoginHeight = () => {
      const login = document.getElementById("login-page");
      if (login) login.style.height = `${window.innerHeight}px`;
    };

    setLoginHeight(); // al mount
    window.addEventListener("resize", setLoginHeight); // orientamento
    return () => window.removeEventListener("resize", setLoginHeight);
  }, []);

  return (
    <section id="login-page">

      {(version || customVersion) &&
        <div
          style={{
            top: `calc(1rem + env(safe-area-inset-top))`,
            left: `calc(1rem + env(safe-area-inset-left))`
          }}
          className="text-md text-primary absolute"
        >
          {customVersion ? customVersion : version}
        </div>
      }

      <div className={overrideStyle.container || `container mx-auto flex items-center justify-center min-h-dvh`}>

        {/* Login Card */}
        <div className={overrideStyle.cardForm || `bg-form card-style card-size flex flex-col sm:flex-row sm:items-center justify-center ${styleCardForm}`}>

          {/* Logo */}
          <div className={overrideStyle.containerLogo || `basis-1/2 flex items-center justify-center ${styleContainerLogo}`}>

            {Logo && <Logo className={overrideStyle.logo || `login-logo h-full sm:h-auto ${styleLogo}`} />}

          </div>

          {/* Login Form */}
          <LoginForm />

        </div>

      </div>

    </section>
  )
}

export default Login;