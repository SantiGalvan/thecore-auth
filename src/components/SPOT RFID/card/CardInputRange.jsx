import { VscSaveAs } from "react-icons/vsc";

const CardInputRange = ({ minReadingPower, maxReadingPower, stepRangePower, rangeValue, setRangeValue, show, handleClick }) => {

    const position = ((rangeValue - minReadingPower) / (maxReadingPower - minReadingPower)) * 100;

    return (
        <div className={`border border-slate-300 rounded-xl p-2 m-2 shadow-xl transition-all duration-700 transform ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <h2 className="text-center my-4 text-2xl">Configurazione Potenza</h2>

            <div className="relative my-12 w-[90%] mx-auto">
                <input
                    id="power"
                    type="range"
                    min={minReadingPower}
                    max={maxReadingPower}
                    step={stepRangePower}
                    value={rangeValue}
                    onChange={(e) => setRangeValue(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-accent"
                />

                {/* Tooltip */}
                <div
                    className="absolute bottom-8 transform -translate-x-1/2 bg-white border border-gray-200 text-sm text-gray-800 py-1 px-2 rounded-lg shadow-md transition-opacity"
                    style={{ left: `${position}%` }}
                >
                    {rangeValue}
                </div>

            </div>

            <div className="flex items-center justify-center my-4">
                <button
                    onClick={() => handleClick(rangeValue)}
                    className="py-2 px-4 flex items-center justify-center gap-1 bg-save-button text-white rounded-lg shadow-md transition duration-200 ease-in-out transform active:translate-y-[2px] cursor-pointer"
                >
                    Salva<VscSaveAs />
                </button>
            </div>
        </div>
    )
}

export default CardInputRange;