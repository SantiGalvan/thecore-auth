import { Route, Routes } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import Login from "../pages/Login";
import AuthPage from "../middlewares/AuthPage";
import Dashboard from "../pages/user/Dashboard";
import { useRoutesInjection } from "../contexts/RouteContext";
import Logo from '../assets/MyWarehouse.svg?react';
import { useEffect } from "react";

const PackageRoutes = ({logoImg = Logo, pathImg = './src/assets/MyWarehouse.svg'}) => {

    const { publicRoutes, privateRoutes } = useRoutesInjection();


    const iconUpdater = () => {
        const favicon = document.querySelector("link[rel='icon']");

        if(pathImg) favicon.href = pathImg;
    }

    useEffect(() => {
        iconUpdater();
    }, [pathImg]);

    return (
        <Routes>

            <Route element={<DefaultLayout />}>

                {/* Rotte pubbliche */}
                <Route path="/">

                    <Route index element={<Login Logo={logoImg} />} />

                    {/* Nuove rotte da inserire con il Context */}
                    {publicRoutes.map((route, i) => (
                        <Route key={`public-${i}`} path={route.path} element={route.element} />
                    ))}

                </Route>

                {/* Rotte private */}
                <Route element={<AuthPage />}>

                    <Route path="/dashboard/:id" element={<Dashboard/>} />

                    {/* Nuove rotte da inserire con il Context */}
                    {privateRoutes.map((route, i) => (
                        <Route key={`private-${i}`} path={route.path} element={route.element} />
                    ))}

                </Route>

            </Route>

        </Routes>
    )
}

export default PackageRoutes;