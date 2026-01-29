import InputDate from "./InputDate";

const InputStartEndDate = (props) => {

    const {
        startId,
        endId,
        startName,
        endName,
        startValue,
        endValue,
        onChange,
        disabled,
        required,
        dateError,
        startTitle,
        endTitle,
        startStyle,
        endStyle,
        labelStyle,
        containerStyle,
        startContainerStyle,
        endContainerStyle,
        endDateShow = true,
        children
    } = props;

    return (
        <div className={containerStyle || `flex gap-4 mx-auto w-full mb-4`}>

            {/* Start Date */}
            <InputDate
                id={startId}
                name={startName}
                value={startValue}
                onChange={onChange}
                disabled={disabled}
                required={required}
                title={startTitle}
                labelStyle={labelStyle}
                containerStyle={startContainerStyle}
                inputStyle={startStyle}
            />

            {/* End Date */}
            {endDateShow &&
                <InputDate
                    id={endId}
                    name={endName}
                    value={endValue}
                    onChange={onChange}
                    disabled={disabled}
                    required={required}
                    title={endTitle}
                    labelStyle={labelStyle}
                    containerStyle={endContainerStyle}
                    inputStyle={endStyle}
                >
                    {dateError && <p className="text-red-500 text-[13px] mt-1">{dateError}</p>}
                </InputDate>
            }

            {children}

        </div>
    )
}

export default InputStartEndDate;