import Input from "../../inputs/Input";
import InputLabel from "../../inputs/InputLabel";

const InputGroup = ({ isTag = false, value, label, placeholder, id, onChange, error = null }) => {
    return (
        <div className={`flex items-center justify-center relative ${isTag ? 'gap-4 mb-2' : 'gap-1 m-4'}`}>
            <InputLabel labelId={id} label={label} overrideStyle={`text-xl font-bold text-color-label ${isTag ? '' : 'basis-1/3'}`} />
            <Input
                type={'text'}
                inputId={id}
                inputPlaceholder={placeholder}
                inputValue={value || ''}
                disabled={isTag}
                inputChange={onChange}
                overrideStyle={`${isTag ? 'w-full' : 'basis-2/3'} ${error ? 'border-red-600 focus:ring focus:ring-red-600 focus:border-red-600 focus:shadow-[0_0_0_4px_rgba(255,0,0,0.5)]' : ''} bg-input-bg border border-input-border text-input-text text-input-placeholder input-rounded focus:ring focus:ring-focus-ring focus:border-spot-rfid-input-border focus:outline-none focus:shadow-spot-rfid-input block w-full p-input`}
            />
            {error && <p className="text-red-600 text-[13px] absolute bottom-0 left-26 translate-y-[20px]">{error}</p>}
        </div>
    )
}

export default InputGroup;