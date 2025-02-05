import Input from "./inputs/Input";
import InputLabel from "./inputs/InputLabel";

const LoginForm = (props) => {

    const {
        title,
        label,
        type,
        placeholder,
        buttonText,
        userData,
        formData,
        changeValue,
        submitForm
    } = props;

    return (
        <form onSubmit={submitForm} className="basis-1/2">
            <h1 className={`text-form-title-size show-title title-position m-form-title`}>{title}</h1>

            {/* Eamil */}
            <div className="flex justify-center flex-col gap-1 my-4 w-[70%] mx-auto">
                <InputLabel labelId={'user-email'} label={label} />
                <Input 
                    inputType={type} 
                    inputId={'user-email'} 
                    inputPlaceholder={placeholder} 
                    inputValue={userData ? formData[userData] : formData.email}  
                    inputChange={e => {changeValue(userData || 'email' , e.target.value)}}
                    autoFocus={true}
                />
            </div>

            {/* Password */}
            <div className="flex justify-center flex-col gap-1 my-4 w-[70%] mx-auto">
                <InputLabel labelId={'password'} label={'Password'} />
                <Input 
                    inputType={'password'} 
                    inputId={'password'} 
                    inputPlaceholder={"Password"}
                    inputValue={formData.password}
                    inputChange={e => {changeValue('password', e.target.value)}}
                />
            </div>

            <div className={`flex button-position items-center m-primary-button`}>
                <button className={`font-bold cursor-pointer shadow-primary transition-all duration-200 hover:shadow-primary-hover active:shadow-primary-active active:translate-y-[2px] p-primary-button rounded-primary-button bg-primary hover:bg-primary-hover text-primary-text`}>
                    {buttonText}
                </button>
            </div>

        </form>
    )
}

export default LoginForm;