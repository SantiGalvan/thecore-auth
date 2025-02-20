import { Outlet } from "react-router-dom";
import Loading from "../components/loading/Loading";
import { useLoading } from "../contexts/LoadingContext";
import Alert from "../components/Alert";
import { useAlert } from "../contexts/AlertContext";

const DefaultLayout = ({isMain = true}) => {

    const {isLoading} = useLoading();
    const{showAlert} = useAlert();

    return (
        <>
           {isLoading && <Loading />}
           
            {showAlert && <Alert />}
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