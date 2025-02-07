import { useLoginForm } from "../contexts/LoginFormContext";
import Input from "./inputs/Input";
import InputLabel from "./inputs/InputLabel";

const LoginForm = () => {

    const { title, label, type, placeholder, buttonText, formData, changeData, handleLogin } = useLoginForm();

    return (
        <form onSubmit={handleLogin} className="form-size">
            <h1 className={`text-form-title-size show-title title-position m-form-title`}>{title}</h1>

            {/* Eamil */}
            <div className="flex justify-center flex-col gap-1 m-input-form input-size mx-auto">
                <InputLabel labelId={'user-email'} label={label} />
                <Input 
                    inputType={type} 
                    inputId={'user-email'} 
                    inputPlaceholder={placeholder} 
                    inputValue={formData.email}  
                    inputChange={e => {changeData('email' , e.target.value)}}
                    autoFocus={true}
                />
            </div>

            {/* Password */}
            <div className="flex justify-center flex-col gap-1 my-4 input-size mx-auto">
                <InputLabel labelId={'password'} label={'Password'} />
                <Input 
                    inputType={'password'} 
                    inputId={'password'} 
                    inputPlaceholder={"Password"}
                    inputValue={formData.password}
                    inputChange={e => {changeData('password', e.target.value)}}
                />
            </div>

            <div className={`flex button-position items-center m-primary-button`}>
                <button className={`font-bold cursor-pointer shadow-(--shadow-primary) transition-all duration-200 hover:shadow-(--shadow-primary-hover) active:shadow-(--shadow-primary-active) active:translate-y-[2px] p-primary-button rounded-primary-button bg-primary hover:bg-primary-hover text-primary-text`}>
                    {buttonText}
                </button>
            </div>

        </form>
    )
}

export default LoginForm;