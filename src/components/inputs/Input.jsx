const Input = (props) => {

    const {
        inputType,
        inputId,
        inputPlaceholder,
        inputRequired,
        inputValue,
        inputChange,
        autoFocus,
        inputStyle,
        overrideStyle
    } = props;

    const validTypes = ['text', 'email', 'password', 'search', 'tel', 'url'];
    const type = validTypes.includes(inputType) ? inputType : 'text';

    return (
        <input 
            type={type}
            autoFocus={autoFocus}
            id={inputId} 
            className={overrideStyle || `bg-input-bg border border-input-border text-input-text text-input-placeholder input-rounded focus:ring focus:ring-primary focus:border-primary focus:outline-none focus:shadow-(--shadow-primary-input) block w-full p-input ${inputStyle}`} 
            placeholder={inputPlaceholder}
            required={inputRequired ?? true}
            value={inputValue}
            onChange={inputChange}
        />
    )
}

export default Input;