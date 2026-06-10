import { useEffect } from "react"
import LoginForm from "../../components/form/LoginForm";
import { useLoginForm } from "../../contexts/login/LoginFormContext";
import { useConfig } from "../../contexts/config/ConfigContext";
import { useNavigate } from "react-router-dom";
import { useAuthStorage } from "../../hooks/auth/useAuthStorage";
import { useViewportHeight } from "../../hooks/viewport/useViewportHeight";
import { useAuth } from "../../contexts/auth/AuthContext";
import DefaultAutoLoginFallback from "./DefaultAutoLoginFallback";
import Loading from "../../components/loading/Loading";

const Login = ({ Logo, AutoLoginFallback }) => {

  const { styleCardForm, styleContainerLogo, styleLogo, overrideStyle, customVersion } = useLoginForm();
  const { firstPrivatePath, version, autoLogin } = useConfig();
  const { token, user } = useAuthStorage();
  const { autoLoginError } = useAuth();
  useViewportHeight();

  const navigate = useNavigate();

  // UseEffect per controllare che l'utente loggato non entri nella pagina di login
  useEffect(() => {

    if (token && user?.id) navigate(`${firstPrivatePath}${user.id}`);

  }, []);

  if (autoLogin && autoLoginError) {
    const Fallback = AutoLoginFallback || DefaultAutoLoginFallback;
    return <Fallback error={autoLoginError} />;
  }

  if (autoLogin) return <Loading />;

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

      <div className={overrideStyle.container || `container mx-auto flex items-center justify-center min-h-screen`}>

        {/* Login Card */}
        <div className={overrideStyle.cardForm || `bg-form card-style card-size flex flex-col sm:flex-row sm:items-center justify-center ${styleCardForm}`}>

          {/* Logo */}
          <div className={overrideStyle.containerLogo || `login-logo-container basis-1/2 flex items-center justify-center ${styleContainerLogo}`}>

            {Logo && <Logo className={overrideStyle.logo || `login-logo ${styleLogo}`} />}

          </div>

          {/* Login Form */}
          <LoginForm />

        </div>

      </div>

    </section>
  )
}

export default Login;