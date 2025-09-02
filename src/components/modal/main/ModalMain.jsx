const ModalMain = ({ type, children, item, overrideStyle }) => {
    return (
        <>
            {
                type !== 'delete' &&
                <main className={overrideStyle || 'my-8 max-h-[600px] overflow-y-auto overflow-x-hidden'}>

                    {type === 'delete' && !item ?
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