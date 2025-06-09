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

    //? -------------------------------------- State ------------------------------------------------


    //? ------------------------------------- Funzioni ----------------------------------------------

    //* Funzione per aprire la modale
    const openModal = ({ content, title = "", onConfirm = null, type = "default", formId = "modal-form", item = null }) => {
        setContent(content);
        setTitle(title);
        setOnConfirm(() => onConfirm);
        setType(type);
        setFormId(formId);
        setItem(item);
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

    //? ------------------------------------- Funzioni ----------------------------------------------


    const value = { isOpen, openModal, closeModal, content, title, onConfirm, type, item, formId }

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