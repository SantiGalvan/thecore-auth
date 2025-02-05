const InputLabel = ({label, labelId}) => {
    return (
        <label htmlFor={labelId} className="show-label mb-2 text-input-label font-medium text-color-label">{label}</label>
    )
}

export default InputLabel;