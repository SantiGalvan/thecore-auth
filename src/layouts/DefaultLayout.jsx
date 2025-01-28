import { Outlet } from "react-router-dom";
import Loading from "../components/Loading";
import { useLoading } from "../contexts/LoadingContext";
import Alert from "../components/Alert";
import { useAlert } from "../contexts/AlertContext";

const DefaultLayout = () => {

    const {isLoading} = useLoading();
    const{showAlert} = useAlert();

    return (
        <>
           {isLoading && <Loading />}
           
           <main className={isLoading ? 'hidden' : ''}>
               {showAlert && <Alert />}
               <Outlet />
           </main>
        </>
    )
}

export default DefaultLayout;