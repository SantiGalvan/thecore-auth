import { matchPath, Outlet, useLocation } from "react-router-dom";
import Loading from "../components/loading/Loading";
import { useLoading } from "../contexts/LoadingContext";
import Alert from "../components/Alert";
import { useAlert } from "../contexts/AlertContext";

const DefaultLayout = ({isMain = true, headerComponent = null, showHeaderOnLogin = false, headerExcludedRoutes = []}) => {

    const {isLoading} = useLoading();
    const{showAlert} = useAlert();

    const location = useLocation();

    // Funzione per verificare se il percorso attuale è escluso
    const isExcluded = headerExcludedRoutes.some(pattern => matchPath(pattern, location.pathname));
  
    // Se siamo in "/" (login), mostriamo l'header solo se showHeaderOnLogin è true
    let showHeader;
    if (location.pathname === "/") {
      showHeader = headerComponent && showHeaderOnLogin;
    } else {
      showHeader = headerComponent && !isExcluded;
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
        </>
    )
}

export default DefaultLayout;