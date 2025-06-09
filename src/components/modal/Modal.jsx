import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { FiX } from "react-icons/fi";

const Modal = ({ isOpen, onClose, title, formId, children, item, onConfirm, type = 'default' }) => {

    const modalRef = useRef(null);

    const [show, setShow] = useState(isOpen);

    const handleTransitionEnd = () => {
        if (!isOpen) setShow(false);
    };

    useEffect(() => {
        if (isOpen) setShow(true);
    }, [isOpen]);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };

        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            const previouslyFocused = document.activeElement;
            modalRef.current?.focus();
            return () => previouslyFocused?.focus();
        }
    }, [isOpen]);

    return show ? ReactDOM.createPortal(
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-200 ${isOpen ? 'bg-black/50 opacity-100' : 'opacity-0'}`}
            onClick={onClose}
            onTransitionEnd={handleTransitionEnd}
        >
            <div
                ref={modalRef}
                className={`relative bg-white rounded-lg p-6 shadow-xl min-w-[300px] max-w-[90%] ${type === 'delete' ? 'w-[400px]' : 'w-1/2'} transform transition-transform duration-200 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
                onClick={e => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                tabIndex={-1}
            >
                <header className={`flex items-center justify-between mb-4 ${type === 'delete' ? 'gap-8' : ''}`}>

                    {
                        type === 'delete' ?
                            <h2 className="text-2xl">Sei sicuro di volere eliminare: <strong>{item.name}</strong>?</h2>
                            :
                            <h2 className="text-2xl">{title || 'Conferma operazione'}</h2>
                    }

                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 cursor-pointer transition-transform duration-150 ease-in-out hover:scale-110 hover:opacity-80 active:scale-95 active:opacity-60"
                        aria-label="Chiudi modale"
                    >
                        <FiX className="text-2xl" />
                    </button>

                </header>

                {type !== 'delete' && <main className="my-8">

                    {children}

                </main>}

                <footer className="flex items-center justify-between mt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 cursor-pointer text-sm font-medium text-gray-800 bg-gray-300 rounded-lg shadow-md hover:bg-gray-400 hover:shadow-lg active:bg-gray-500 active:shadow-sm transition-all duration-150 ease-in-out hover:opacity-90 active:scale-95 active:opacity-70"
                    >
                        Annulla
                    </button>

                    <div className="flex items-center gap-4">
                        {type !== 'delete' &&
                            <button
                                type="reset"
                                form={formId}
                                className="px-4 py-2 cursor-pointer text-sm font-medium text-white bg-rose-500 rounded-lg shadow-md hover:bg-rose-600 hover:shadow-lg active:bg-rose-700 active:shadow-sm transition-all duration-150 ease-in-out hover:opacity-90 active:scale-95 active:opacity-70"
                            >
                                Reset
                            </button>
                        }

                        <button
                            form={formId}
                            onClick={() => {
                                onConfirm();
                                onClose();
                            }}
                            className={`${type === 'delete' ? 'bg-rose-500 rounded-lg shadow-md hover:bg-rose-600 hover:shadow-lg active:bg-rose-700' : 'bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 hover:shadow-lg active:bg-indigo-800'} px-4 py-2 cursor-pointer text-sm font-medium text-white  active:shadow-sm transition-all duration-150 ease-in-out hover:opacity-90 active:scale-95 active:opacity-70`}
                        >
                            {type === 'delete' ? 'Elimina' : 'Salva'}
                        </button>
                    </div>
                </footer>

            </div>
        </div >,
        document.body
    ) : null;
}

export default Modal;