import { useLoginForm } from "../../contexts/login/LoginFormContext";
import Input from "../inputs/Input";
import InputLabel from "../inputs/InputLabel";

const LoginForm = () => {

    const { title, label, type, placeholder, buttonText, formData, changeData, handleLogin, overrideStyle } = useLoginForm();

    return (
        <form onSubmit={handleLogin} className={overrideStyle.form || `form-size`}>
            <h1 className={overrideStyle.title || `text-form-title-size show-title title-position m-form-title`}>{title}</h1>

            {/* Eamil */}
            <div className={overrideStyle.containerEmail || `flex justify-center flex-col gap-1 m-input-form input-size mx-auto`}>
                <InputLabel labelId={'user-email'} label={label} />
                <Input
                    inputType={type}
                    inputId={'user-email'}
                    inputPlaceholder={placeholder}
                    inputValue={formData.email}
                    inputChange={e => { changeData('email', e.target.value) }}
                    autoFocus={true}
                />
            </div>

            {/* Password */}
            <div className={overrideStyle.containerPassword || `flex justify-center flex-col gap-1 my-4 input-size mx-auto`}>
                <InputLabel labelId={'password'} label={'Password'} />
                <Input
                    inputType={'password'}
                    inputId={'password'}
                    inputPlaceholder={"Password"}
                    inputValue={formData.password}
                    inputChange={e => { changeData('password', e.target.value) }}
                />
            </div>

            <div className={overrideStyle.containerButton || `flex button-position items-center m-primary-button`}>
                <button className={overrideStyle.button || `font-bold cursor-pointer shadow-(--shadow-primary) transition-all duration-200 hover:shadow-(--shadow-primary-hover) active:shadow-(--shadow-primary-active) active:translate-y-[2px] p-primary-button rounded-primary-button bg-primary hover:bg-primary-hover text-primary-text`}>
                    {buttonText}
                </button>
            </div>

        </form>
    )
}

export default LoginForm;