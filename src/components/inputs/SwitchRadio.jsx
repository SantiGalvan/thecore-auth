import { useState } from "react";

const SwitchRadio = ({ initial = false, onChange }) => {
    const [on, setOn] = useState(initial);

    const toggle = () => {
        setOn(!on);
        onChange && onChange(!on);
    };

    return (
        <button
            onClick={toggle}
            className={`w-14 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${on ? "bg-blue-500" : "bg-gray-300"}`}
        >
            <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${on ? "translate-x-8" : "translate-x-0"}`}
            />
        </button>
    );
};

export default SwitchRadio;