import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

const ModalProvider = ({ children }) => {

    //? -------------------------------------- State ------------------------------------------------

    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState(null);
    const [title, setTitle] = useState("");
    const [onConfirm, setOnConfirm] = useState(null);
    const [item, setItem] = useState(null);
    const [formId, setFormId] = useState("modal-form");
    const [type, setType] = useState("default");
    const [style, setStyle] = useState({});
    const [modalData, setModalData] = useState(null);

    //? -------------------------------------- State ------------------------------------------------


    //? ------------------------------------- Funzioni ----------------------------------------------

    //* Funzione per aprire la modale
    const openModal = ({ component, title = "", onConfirm = null, type = "default", formId = "modal-form", item = null, style }) => {
        setContent(() => component);
        setTitle(title);
        setOnConfirm(() => onConfirm);
        setType(type);
        setFormId(formId);
        setItem(item);
        setStyle(style);
        setIsOpen(true);
    };

    //* Funzione per chiudere la modale
    const closeModal = () => {
        setIsOpen(false);
        setContent(null);
        setTitle("");
        setOnConfirm(null);
        setFormId("modal-form");
        setItem(null);
        setType("default");
    };

    //* Funzione per controllare il cambio degli input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setModalData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    //* Funzione di invio del form che restituisce i valori del form
    const handleSubmit = (e) => {
        e.preventDefault();
        if (onConfirm) {
            onConfirm(modalData);
        }
    }

    //? ------------------------------------- Funzioni ----------------------------------------------


    const value = { isOpen, openModal, closeModal, content, title, onConfirm, type, item, formId, style, modalData, setModalData, handleChange, handleSubmit }

    return (
        <ModalContext.Provider value={value}>
            {children}
        </ModalContext.Provider>
    )
}

const useModal = () => {
    const value = useContext(ModalContext);

    if (value === undefined) throw new Error('Non sei all\'interno del ModalProvider');

    return value;
}

export { ModalProvider, useModal }