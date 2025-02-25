import { matchPath, Outlet, useLocation } from "react-router-dom";
import Loading from "../components/loading/Loading";
import { useLoading } from "../contexts/LoadingContext";
import Alert from "../components/Alert";
import { useAlert } from "../contexts/AlertContext";

const DefaultLayout = (props) => {

    const {isLoading} = useLoading();
    const{showAlert} = useAlert();

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
    if(location.pathname === '/') {
        showFooter = footerComponent && showFooterOnLogin;
    } else {
        showFooter = footerComponent && !footerIsExcluded;
    }
  
    return (
        <>
           {isLoading && <Loading />}
           
            {showAlert && <Alert />}
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