import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";
import { useConfig } from "./ConfigContext";

const LoginFormContext = createContext();

const LoginFormProvider = ({children}) => {

    const { login } = useAuth();
    const { clearLoginFormOnError } = useConfig();

    const initialData = {
        email: '',
        password: ''
    }

    // Variabili form
    const [title, setTitle] = useState('Accedi');
    const [label, setLabel] = useState('Email');
    const [type, setType] = useState('email');
    const [placeholder, setPlaceholder] = useState('example@example.it');
    const [buttonText, setButtonText] = useState('Accedi');

    // Data del form
    const [formData, setFormData] = useState(initialData);

    // Immagine della card
    const [LogoImg, setLogoImg ] = useState();

    // Style della card del logo e del form
    const [styleCardForm, setStyleCardForm] = useState();
    const [styleContainerLogo, setStyleContainerLogo] = useState();
    const [styleLogo, setStyleLogo] = useState();

    const changeData = (key, value) => {
        setFormData(curr => ({...curr, [key]:value}));
    }

    const handleLogin = e => {
        login(e,formData);
        if(clearLoginFormOnError) setFormData(initialData);
    }

    const value = {
        title,
        setTitle,
        label,
        setLabel,
        type,
        setType,
        placeholder,
        setPlaceholder,
        buttonText,
        setButtonText,
        formData,
        setFormData,
        LogoImg,
        setLogoImg,
        styleCardForm,
        setStyleCardForm,
        styleContainerLogo,
        setStyleContainerLogo,
        styleLogo,
        setStyleLogo,
        changeData,
        handleLogin
    }

    return (
        <LoginFormContext.Provider value={value}>
            {children}
        </LoginFormContext.Provider>
    )
}

const useLoginForm = () => {
    const value = useContext(LoginFormContext);

    if (value === undefined) throw new Error('Non puoi modificare La login');

    return value;
}

export { LoginFormProvider, useLoginForm }