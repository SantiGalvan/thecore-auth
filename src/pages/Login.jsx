import { useEffect, useState } from "react"
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../contexts/AlertContext";
import LoginForm from "../components/LoginForm";
import { useConfig } from "../contexts/ConfigContext";

const Login = ({ formStyle, userData, userInput, title, buttonStyle }) => {

  // Applica i valori di default solo a quelle proprietà non passate
  const finalFormStyle = { 
    size: 'w-[800px]',
    bgColor: 'bg-slate-50',
    rounded: 'rounded-lg',
    shadow: 'shadow-lg',
    ...formStyle
  };

  const finalUserInput = {
    label: 'Email',
    type: 'email',
    placeholder: 'email@email.it',
    ...userInput 
  };

  const finalTitle = {
    text: 'Login',
    size: 'text-4xl',
    position: 'text-center',
    spacing: 'my-12',
    ...title 
  };

  const finalButtonStyle = {
    position: 'justify-center',
    spacing: 'my-12',
    color: 'bg-blue-500',
    hoverColor: 'hover:bg-blue-700',
    textColor: 'text-white',
    size: 'py-2 px-4',
    rounded: 'rounded-full',
    text: 'Login',
    ...buttonStyle
  };

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
    <section>
      <div className="container mx-auto flex items-center justify-center h-screen">

        <LoginForm 
         submitForm={handleLogin}
         formData={formData}
         changeValue={changeData}
         
         formStyle={finalFormStyle}
         userData={userData}
         userInput={finalUserInput}
         title={finalTitle}
         buttonStyle={finalButtonStyle}
        />

      </div>
    </section>
  )
}

export default Login;