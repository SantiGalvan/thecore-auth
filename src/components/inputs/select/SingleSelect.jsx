const SingleSelect = ({ options = [], value, onChange }) => {
    return (
        <div className="grid grid-cols-1 gap-2">
            {options.map((option) => {
                const isActive = value === option;

                return (
                    <button
                        key={option}
                        onClick={() => onChange(option)}
                        className={`p-4 border text-center rounded-xl text-xs font-black uppercase tracking-tighter transition-all shadow-sm
                            ${isActive
                                ? 'bg-blue-500 text-white border-blue-500'
                                : 'bg-white text-slate-600 border-slate-100'
                            }
                        `}
                    >
                        {option}
                    </button>
                );
            })}
        </div>
    );
};

export default SingleSelect;