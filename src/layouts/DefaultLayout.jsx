import { matchPath, Outlet, useLocation } from "react-router-dom";
import Loading from "../components/loading/Loading";
import { useLoading } from "../contexts/loading/LoadingContext";
import { useAlert } from "../contexts/alert/AlertContext";
import Alert from "../components/alert/Alert";
import Modal from "../components/modal/Modal";
import { useModal } from "../contexts/modal/ModalContext";

const DefaultLayout = (props) => {

    const { isLoading } = useLoading();
    const { showAlert } = useAlert();
    const { isOpen, closeModal, content, title, onConfirm, item, type, formId, style, headerContent, footerContent } = useModal();

    const location = useLocation();

    const {
        isMain = true,
        headerComponent = null,
        showHeaderOnLogin = false,
        headerExcludedRoutes = [],
        footerComponent = null,
        showFooterOnLogin = false,
        footerExcludedRoutes = []
    } = props;

    // Funzione per verificare se il percorso attuale è escluso
    const isExcluded = headerExcludedRoutes.some(path => matchPath(path, location.pathname));

    // Se siamo in "/" (login), mostriamo l'header solo se showHeaderOnLogin è true altrimenti lo mostriamo solo se c'è un componente e la rotta non è esclusa
    let showHeader;
    if (location.pathname === "/") {
        showHeader = headerComponent && showHeaderOnLogin;
    } else {
        showHeader = headerComponent && !isExcluded;
    }

    // Funzione per verificare se il percorso attuale è escluso
    const footerIsExcluded = footerExcludedRoutes.some(path => matchPath(path, location.pathname));

    // Se siamo in "/" (login), mostriamo il footer solo se showHeaderOnLogin è true altrimenti lo mostriamo solo se c'è un componente e la rotta non è esclusa
    let showFooter;
    if (location.pathname === '/') {
        showFooter = footerComponent && showFooterOnLogin;
    } else {
        showFooter = footerComponent && !footerIsExcluded;
    }

    return (
        <>
            {isLoading && <Loading />}

            {showAlert && <Alert />}

            <Modal
                isOpen={isOpen}
                onClose={closeModal}
                title={title}
                formId={formId}
                onConfirm={onConfirm}
                type={type}
                item={item}
                style={style}
                headerContent={headerContent}
                footerContent={footerContent}
            >
                {content}
            </Modal>

            {showHeader && headerComponent}

            {isMain ?
                <main className={isLoading ? 'hidden' : ''}>
                    {showAlert && <Alert />}
                    <Outlet />
                </main>
                :
                <Outlet />
            }

            {showFooter && footerComponent}
        </>
    )
}

export default DefaultLayout;