import { useState } from "react";

const useForm = (initialValues = {}) => {
    const [values, setValues] = useState(initialValues);
    const [files, setFiles] = useState({});       // per file multipli
    const [previews, setPreviews] = useState({}); // per preview immagini

    // Gestione classica input
    const handleChange = (field, value) => {
        setValues(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Aggiunge file senza cancellare i precedenti
    const addFiles = (field, fileList) => {
        const fileArray = Array.from(fileList);

        // append dei nuovi file
        setFiles(prev => ({
            ...prev,
            [field]: [...(prev[field] || []), ...fileArray]
        }));

        // append delle nuove preview
        const previewUrls = fileArray.map(file => URL.createObjectURL(file));
        setPreviews(prev => ({
            ...prev,
            [field]: [...(prev[field] || []), ...previewUrls]
        }));
    };

    // Sostituisce completamente i file
    const replaceFiles = (field, fileList) => {
        const fileArray = Array.from(fileList);

        setFiles(prev => ({
            ...prev,
            [field]: fileArray
        }));

        const previewUrls = fileArray.map(file => URL.createObjectURL(file));
        setPreviews(prev => ({
            ...prev,
            [field]: previewUrls
        }));
    };

    // Rimuove un singolo file dalla lista
    const removeFile = (field, index) => {
        setFiles(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }));
        setPreviews(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }));
    };

    // Reset totale
    const resetForm = () => {
        setValues(initialValues);
        setFiles({});
        setPreviews({});
    };

    return {
        values,
        handleChange,
        files,
        previews,
        addFiles,
        replaceFiles,
        removeFile,
        setValues,
        resetForm
    };
};

export { useForm };