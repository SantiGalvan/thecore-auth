const InputDate = (props) => {

    const {
        id,
        name,
        value,
        onChange,
        disabled,
        required,
        labelStyle,
        containerStyle,
        inputStyle,
        title,
        children
    } = props;

    return (
        <div className={containerStyle || `flex flex-col gap-1 mx-auto w-full`}>
            <label
                htmlFor={id}
                className={labelStyle || `mb-1 text-input-label font-medium text-color-label`}
            >
                {title}
            </label>
            <input
                type="date"
                id={id}
                name={name}
                value={value || ""}
                onChange={onChange}
                disabled={disabled}
                required={required}
                className={inputStyle || `bg-input-bg border border-input-border rounded-lg text-input-text placeholder:text-input-placeholder rounded-input focus:ring focus:ring-primary focus:border-primary focus:outline-none focus:shadow-[var(--shadow-primary-input)] block w-full h-[43px] p-input disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed disabled:opacity-60`}
            />
            {children}
        </div>
    )
}

export default InputDate;