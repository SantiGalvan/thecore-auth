const ModalMain = ({ type, children, item }) => {
    return (
        <>
            {
                type !== 'delete' &&
                <main className="my-8">

                    {(type === 'edit' || type === 'delete') && !item ?
                        (
                            <div className="text-red-600 font-semibold">Errore: nessun item selezionato per l'operazione.</div>
                        )
                        :
                        (children)
                    }

                </main>
            }
        </>
    )
}

export default ModalMain;