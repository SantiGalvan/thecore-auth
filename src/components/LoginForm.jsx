import Input from "./inputs/Input";
import InputLabel from "./inputs/InputLabel";

const LoginForm = (props) => {

    const {
        // Variabili funzionamento della Login
        submitForm, 
        formData, 
        changeValue,
        // Stile form 
        formSize = 'w-[800px]',
        formBgColor = 'bg-slate-50',
        formRounded = 'rounded-lg',
        formShadow = 'shadow-lg',
        // Input email/username
        userData,
        userLabel = 'Email',
        userType = 'email',
        userPlaceholder = 'email@email.it',
        // Titolo
        formTitle = 'Login',
        titleSize = 'text-4xl',
        titlePosition = 'text-center',
        titleSpacing = 'my-12',
        // Bottone
        buttonPosition = 'justify-center',
        buttonSpacing = 'my-12',
        buttonColor = 'bg-blue-500',
        buttonHoverColor = 'hoverbg-blue-700',
        buttonTextColor = 'text-white',
        buttonSize = 'py-2 px-4',
        buttonRounded = 'rounded-full',
        buttonText = 'Login'
    } = props;

    return (
        <form onSubmit={submitForm} className={`${formSize} ${formRounded} ${formShadow} ${formBgColor}`}>
            <h1 className={`${titleSize} ${titlePosition} ${titleSpacing}`}>{formTitle}</h1>

            {/* Eamil */}
            <div className="flex justify-center flex-col gap-1 my-4 w-1/2 mx-auto">
                <InputLabel labelId={'user-email'} label={userLabel} />
                <Input 
                    inputType={userType} 
                    inputId={'user-email'} 
                    inputPlaceholder={userPlaceholder} 
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

            <div className={`flex ${buttonPosition} items-center ${buttonSpacing}`}>
                <button className={`${buttonColor} ${buttonHoverColor} ${buttonTextColor} font-bold ${buttonSize} ${buttonRounded}`}>
                    {buttonText}
                </button>
            </div>

        </form>
    )
}

export default LoginForm;