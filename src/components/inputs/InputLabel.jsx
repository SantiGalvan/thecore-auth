const InputLabel = ({label, labelId, labelStyle, overrideStyle}) => {
    return (
        <label htmlFor={labelId} className={ overrideStyle || `show-label mb-2 text-input-label font-medium text-color-label ${labelStyle}`}>{label}</label>
    )
}

export default InputLabel;