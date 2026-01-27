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
            <div className={startContainerStyle || `flex flex-col gap-1 mx-auto w-full`}>
                <label
                    htmlFor={startId}
                    className={labelStyle || `mb-1 text-input-label font-medium text-color-label`}
                >
                    {startTitle}
                </label>
                <input
                    type="date"
                    id={startId}
                    name={startName}
                    value={startValue || ""}
                    onChange={onChange}
                    disabled={disabled}
                    required={required}
                    className={startStyle || `bg-input-bg border border-input-border rounded-lg text-input-text placeholder:text-input-placeholder rounded-input focus:ring focus:ring-primary focus:border-primary focus:outline-none focus:shadow-[var(--shadow-primary-input)] block w-full h-[43px] p-input disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed disabled:opacity-60`}
                />
            </div>

            {/* End Date */}
            {endDateShow &&
                <div className={endContainerStyle || `flex flex-col gap-1 mx-auto w-full`}>
                    <label
                        htmlFor={endId}
                        className={labelStyle || `mb-1 text-input-label font-medium text-color-label`}
                    >
                        {endTitle}
                    </label>
                    <input
                        type="date"
                        id={endId}
                        name={endName}
                        value={endValue || ""}
                        onChange={onChange}
                        disabled={disabled}
                        required={required}
                        className={endStyle || `bg-input-bg border rounded-lg text-input-text placeholder:text-input-placeholder  rounded-input focus:ring focus:ring-primary focus:border-primary focus:outline-none  focus:shadow-[var(--shadow-primary-input)] block w-full h-[43px] p-input  disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed disabled:opacity-60 ${dateError ? "border-red-500" : "border-input-border"}`}
                    />
                    {dateError && <p className="text-red-500 text-[13px] mt-1">{dateError}</p>}
                </div>
            }

            {children}

        </div>
    )
}

export default InputStartEndDate;