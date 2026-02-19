import { useState, useCallback } from "react";
import { SlCloudUpload } from "react-icons/sl";

const FileDropzone = (props) => {

    const [dragActive, setDragActive] = useState(false);

    const {
        onFilesSelect,
        id = "dropzone-file",
        containerStyle = 'flex items-center justify-center w-full relative h-full',
        dropzoneStyle = "flex flex-col items-center justify-center text-body px-6 text-center pt-5 pb-6 pointer-events-none",
        labelStyle = `flex flex-col items-center justify-center w-full h-full rounded-2xl transition-all duration-300 bg-slate-100/80 shadow-lg border border-slate-300 rounded-base cursor-pointer hover:bg-slate-200/80 hover:border-slate-500 hover:shadow-xl ${dragActive ? "bg-slate-200/80 border-slate-600 shadow-xl shadow-primary-strong" : "border-default-strong"}`,
        dragActiveStyle = "absolute w-full h-full top-0 left-0 rounded-2xl border-2 border-primary-strong/70 animate-pulse"
    } = props;

    const handleDrag = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            onFilesSelect?.(Array.from(e.dataTransfer.files));
        }
    }, [onFilesSelect]);

    const handleChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            onFilesSelect?.(Array.from(e.target.files));
        }
    };

    return (
        <div
            className={containerStyle}
            onDragEnter={handleDrag}
        >
            <label
                htmlFor={id}
                className={labelStyle}
            >
                <div className={dropzoneStyle}>

                    <SlCloudUpload className="text-8xl" />

                    <p className="mb-2">
                        <span className="font-semibold">Clicca per caricare</span> o trascina qui i file
                    </p>

                    <p className="text-sm opacity-70">Puoi selezionare più file</p>

                </div>

                <input
                    id={id}
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleChange}
                />

            </label>

            {dragActive && (
                <div
                    className={dragActiveStyle}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                />
            )}

        </div>
    );
}

export default FileDropzone;