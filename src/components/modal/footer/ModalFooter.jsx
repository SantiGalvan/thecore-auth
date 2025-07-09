const ModalFooter = ({ onClose, onConfirm, onCancel, type, formId, style }) => {

    const resetButton = style.resetButton ? false : true;
    const confirmButtonText = style.confirmButtonText ?? (type === 'delete' ? 'Elimina' : 'Salva');
    const cancelButtonText = style.cancelButtonText ?? 'Annulla';
    const bgSaveButton = style.bgSaveButton ?? 'bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 hover:shadow-lg active:bg-indigo-800 text-white';
    const bgDeleteButton = style.bgDeleteButton ?? 'bg-rose-500 rounded-lg shadow-md hover:bg-rose-600 hover:shadow-lg active:bg-rose-700 text-white';
    const bgResetButton = style.bgResetButton ?? 'bg-rose-500 rounded-lg shadow-md hover:bg-rose-600 hover:shadow-lg active:bg-rose-700 text-white';
    const bgCancelButton = style.bgCancelButton ?? 'text-gray-800 bg-gray-300 rounded-lg shadow-md hover:bg-gray-400 hover:shadow-lg active:bg-gray-500';

    return (
        <footer className="flex items-center justify-between mt-4">

            {/* Annulla */}
            <button
                onClick={onCancel || onClose}
                className={`${bgCancelButton} px-4 py-2 cursor-pointer text-sm font-medium active:shadow-sm transition-all duration-150 ease-in-out hover:opacity-90 active:scale-95 active:opacity-70`}
            >
                {cancelButtonText}
            </button>

            {/* Reset/Salva/Elimina */}
            <div className="flex items-center gap-4">

                {/* Reset */}
                {(type !== 'delete' && resetButton) &&
                    <button
                        type="reset"
                        form={formId}
                        className={`px-4 py-2 cursor-pointer text-sm font-medium ${bgResetButton} active:shadow-sm transition-all duration-150 ease-in-out hover:opacity-90 active:scale-95 active:opacity-70`}
                    >
                        Reset
                    </button>
                }

                {/* Salva/Elimina */}
                <button
                    type={type !== 'delete' ? 'submit' : 'button'}
                    form={type !== 'delete' ? formId : undefined}
                    onClick={() => {
                        if (type === 'delete') {
                            onConfirm();
                            onClose();
                        }
                    }}
                    className={`${type === 'delete' ? bgDeleteButton : bgSaveButton} px-4 py-2 cursor-pointer text-sm font-medium active:shadow-sm transition-all duration-150 ease-in-out hover:opacity-90 active:scale-95 active:opacity-70`}
                >
                    {confirmButtonText}
                </button>

            </div>

        </footer>
    )
}

export default ModalFooter;