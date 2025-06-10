import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import ModalFooter from "./footer/ModalFooter";
import ModalHeader from "./header/ModalHeader";
import ModalMain from "./main/ModalMain";

const Modal = ({ isOpen, onClose, title, formId, children, item, onConfirm, type = 'default', style = {} }) => {

    const modalRef = useRef(null);

    const [show, setShow] = useState(isOpen);

    const handleTransitionEnd = () => {
        if (!isOpen) setShow(false);
    };

    //* Calcolo dello style della modale
    const modalWidth = style.width ?? (type === 'delete' ? 'max-w-md w-auto' : 'w-full max-w-4xl');
    const bgModal = style.bgModal ?? 'bg-white';
    const bgOverlay = style.bgOverlay ?? 'bg-black/50';


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
            className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-200 ${isOpen ? `${bgOverlay} opacity-100` : 'opacity-0'}`}
            onClick={onClose}
            onTransitionEnd={handleTransitionEnd}
        >
            <div
                ref={modalRef}
                className={`relative ${bgModal} rounded-lg p-6 shadow-xl ${modalWidth} transform transition-transform duration-200 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
                onClick={e => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                tabIndex={-1}
            >

                {/* Header */}
                <ModalHeader
                    onClose={onClose}
                    type={type}
                    title={title}
                    name={item?.name}
                />

                {/* Main */}
                <ModalMain
                    type={type}
                    item={item}
                >
                    {children}
                </ModalMain>

                {/* Footer */}
                <ModalFooter
                    onClose={onClose}
                    onConfirm={onConfirm}
                    type={type}
                    formId={formId}
                    style={style}
                />

            </div>

        </div >,
        document.body
    ) : null;
}

export default Modal;