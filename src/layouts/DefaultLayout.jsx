import { Outlet, useLocation } from "react-router-dom";
import Loading from "../components/loading/Loading";
import { useLoading } from "../contexts/LoadingContext";
import Alert from "../components/Alert";
import { useAlert } from "../contexts/AlertContext";

const DefaultLayout = ({isMain = true, headerComponent = null, showHeaderOnLogin = false}) => {

    const {isLoading} = useLoading();
    const{showAlert} = useAlert();

    const location = useLocation();

    const showHeader = headerComponent && (location.pathname !== "/login" || showHeaderOnLogin);

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