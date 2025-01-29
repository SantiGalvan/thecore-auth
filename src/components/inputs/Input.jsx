const Input = (props) => {

    const {
        inputType,
        inputId,
        inputPlaceholder,
        inputRequired,
        inputValue,
        inputChange
    } = props;

    const validTypes = ['text', 'email', 'password', 'search', 'tel', 'url'];
    const type = validTypes.includes(inputType) ? inputType : 'text';

    return (
        <input 
            type={type}
            id={inputId} 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
            placeholder={inputPlaceholder}
            required={inputRequired ?? true}
            value={inputValue}
            onChange={inputChange}
        />
    )
}

export default Input;