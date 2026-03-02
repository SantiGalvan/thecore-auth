import { useRef } from "react";

const ConfigFileReaderAllBrowser = ({ show, isConfigPage, handleFileChange }) => {


    const fileInputRef = useRef(null);

    const handleSelectFile = () => {
        fileInputRef.current.click();
    };

    return (
        <div className={`${isConfigPage ? `${show ? "opacity-100 translate-y-0 delay-200" : "opacity-0 translate-y-10"}` : ''}  p-4 text-center transition-all duration-700 transform`}>

            <h2 className="text-xl my-4">Seleziona il file <strong>config.json</strong> per recuperare le chiavi univoche del dispositivo</h2>

            <div>
                {/* Input nascosto */}
                <input
                    type="file"
                    accept=".json"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                />

                {/* Bottone visibile */}
                <button
                    onClick={handleSelectFile}
                    className="my-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition-colors"
                >
                    Seleziona file
                </button>
            </div>

        </div>
    );
}

export default ConfigFileReaderAllBrowser;