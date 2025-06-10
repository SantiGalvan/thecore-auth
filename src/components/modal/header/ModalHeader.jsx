import { FiX } from "react-icons/fi";

const ModalHeader = ({ onClose, type, title, name }) => {
    return (
        <header className={`flex items-center justify-between mb-4 ${type === 'delete' ? 'gap-8' : ''}`}>

            {/* Titolo */}
            {
                type === 'delete' && name ?
                    <h2 className="text-2xl">Sei sicuro di volere eliminare: <strong>{name}</strong>?</h2>
                    :
                    <h2 className="text-2xl">{title || 'Conferma operazione'}</h2>
            }

            {/* X di chiusura modale */}
            <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 cursor-pointer transition-transform duration-150 ease-in-out hover:scale-110 hover:opacity-80 active:scale-95 active:opacity-60"
                aria-label="Chiudi modale"
            >
                <FiX className="text-2xl" />
            </button>

        </header>
    )
}

export default ModalHeader;