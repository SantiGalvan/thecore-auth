import InputGroup from "../inputs/InputGroup";

const CardInputTag = ({ title, showTag, value, tag, showButton, handleClick }) => {
    return (
        <div className={`border border-slate-300 rounded-xl p-2 m-2 shadow-xl transition-all duration-700 transform ${title === 'TAG B' ? 'delay-200' : 'mb-4'} ${showTag ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <h2 className="text-center mb-2 text-2xl">{title}</h2>

            {/* TID */}
            <InputGroup
                label={'TID'}
                placeholder={`Leggi ${title}`}
                id={tag ? `tid-${tag}` : 'tid'}
                isTag={true}
                value={value?.valueTID || ''}
            />

            {/* EPC */}
            <InputGroup
                label={'EPC'}
                placeholder={`Leggi ${title}`}
                id={tag ? `epc-${tag}` : 'epc'}
                isTag={true}
                value={value?.valueEPC || ''}
            />

            {/* Bottone di scrittura */}
            {!showButton && <div className="flex items-center justify-center">
                <button
                    onClick={handleClick}
                    disabled={!value?.valueTID && !value?.valueEPC}
                    className="my-1 bg-sky-600 disabled:bg-sky-600/40 text-white px-4 py-2 rounded-lg shadow-md disabled:transition-none disabled:active:translate-y-0 transition-all duration-200 ease-in-out transform active:translate-y-[2px] cursor-pointer uppercase"
                >
                    Scrivi tag
                </button>
            </div>}

        </div>
    )
}

export default CardInputTag;