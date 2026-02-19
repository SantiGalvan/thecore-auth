import { matchPath, Outlet, useLocation } from "react-router-dom";
import Loading from "../components/loading/Loading";
import { useLoading } from "../contexts/loading/LoadingContext";
import { useAlert } from "../contexts/alert/AlertContext";
import Alert from "../components/alert/Alert";
import Modal from "../components/modal/Modal";
import { useModal } from "../contexts/modal/ModalContext";
import { Toaster } from "sileo";
import { useConfig } from "../contexts/config/ConfigContext";

const DefaultLayout = (props) => {

    const { isLoading } = useLoading();
    const { showAlert } = useAlert();
    const { sileoToastConfig } = useConfig();
    const { isOpen, closeModal, onCancel, content, title, onConfirm, item, type, formId, style, headerContent, footerContent } = useModal();
    
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
    
    // Recupero i dati per i toast si Sileo
    const defaultOptions = {
        fill: "#000000",          
        duration: 2000,           
        styles: {
            title: "text-white font-semibold",       
            description: "text-white/75",            
            badge: "bg-white/20"
        }
    }
    const toastPosition = sileoToastConfig?.position;
    const toastOptions = sileoToastConfig?.options || defaultOptions;

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

            <Toaster 
                position={toastPosition || "bottom-right"} // posizione di default
                options={toastOptions || {}} // opzioni
            />

            <Modal
                isOpen={isOpen}
                onClose={closeModal}
                onCancel={onCancel}
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