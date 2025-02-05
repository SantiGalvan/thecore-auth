const Input = (props) => {

    const {
        inputType,
        inputId,
        inputPlaceholder,
        inputRequired,
        inputValue,
        inputChange,
        autoFocus
    } = props;

    const validTypes = ['text', 'email', 'password', 'search', 'tel', 'url'];
    const type = validTypes.includes(inputType) ? inputType : 'text';

    return (
        <input 
            type={type}
            autoFocus={autoFocus}
            id={inputId} 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring focus:ring-primary focus:border-primary focus:outline-none focus:shadow-primary-input block w-full p-input" 
            placeholder={inputPlaceholder}
            required={inputRequired ?? true}
            value={inputValue}
            onChange={inputChange}
        />
    )
}

export default Input;