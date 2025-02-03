import Input from "./inputs/Input";
import InputLabel from "./inputs/InputLabel";

const LoginForm = (props) => {

    const {
        formStyle,
        userData,
        userInput,
        title,
        buttonStyle,
        formData,
        changeValue,
        submitForm
    } = props;

    return (
        <form onSubmit={submitForm} className={`${formStyle.size} ${formStyle.rounded} ${formStyle.shadow} ${formStyle.bgColor}`}>
            <h1 className={`${title.size} ${title.position} ${title.spacing}`}>{title.text}</h1>

            {/* Eamil */}
            <div className="flex justify-center flex-col gap-1 my-4 w-1/2 mx-auto">
                <InputLabel labelId={'user-email'} label={userInput.label} />
                <Input 
                    inputType={userInput.label} 
                    inputId={'user-email'} 
                    inputPlaceholder={userInput.placeholder} 
                    inputValue={userData ? formData[userData] : formData.email}  
                    inputChange={e => {changeValue(userData || 'email' , e.target.value)}}
                />
            </div>

            {/* Password */}
            <div className="flex justify-center flex-col gap-1 my-4 w-1/2 mx-auto">
                <InputLabel labelId={'password'} label={'Password'} />
                <Input 
                    inputType={'password'} 
                    inputId={'password'} 
                    inputPlaceholder={"Password"}
                    inputValue={formData.password}
                    inputChange={e => {changeValue('password', e.target.value)}}
                />
            </div>

            <div className={`flex ${buttonStyle.position} items-center ${buttonStyle.spacing}`}>
                <button className={`${buttonStyle.color} ${buttonStyle.hoverColor} ${buttonStyle.textColor} font-bold cursor-pointer ${buttonStyle.size} ${buttonStyle.rounded}`}>
                    {buttonStyle.text}
                </button>
            </div>

        </form>
    )
}

export default LoginForm;