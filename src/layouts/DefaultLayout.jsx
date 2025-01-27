import { Outlet } from "react-router-dom";
import Loading from "../components/Loading";
import { useLoading } from "../contexts/LoadingContext";

const DefaultLayout = () => {

    const {isLoading} = useLoading();

    return (
        <>
           {isLoading && <Loading />}
           
           <main className={isLoading ? 'hidden' : ''}>
               <Outlet />
           </main>
        </>
    )
}

export default DefaultLayout;