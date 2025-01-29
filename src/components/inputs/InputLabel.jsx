const InputLabel = ({label, labelId, labelStyle}) => {
    return (
        <label htmlFor={labelId} className={`${labelStyle ?? "block mb-2 text-sm font-medium text-gray-900"}`}>{label}</label>
    )
}

export default InputLabel;