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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring focus:ring-[#f56907] focus:border-[#f56907] focus:outline-none focus:shadow-[inset_0_1px_1px_rgba(0,0,0,0.075),0_0_8px_rgba(245,105,7,0.6)] block w-full p-2.5" 
            placeholder={inputPlaceholder}
            required={inputRequired ?? true}
            value={inputValue}
            onChange={inputChange}
        />
    )
}

export default Input;