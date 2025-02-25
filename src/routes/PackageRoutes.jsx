import { Route, Routes } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import Login from "../pages/Login";
import AuthPage from "../middlewares/AuthPage";
import Dashboard from "../pages/user/Dashboard";
import { useRoutesInjection } from "../contexts/RouteContext";
import Logo from '../assets/MyWarehouse.svg?react';
import React, { useEffect } from "react";
import { useConfig } from "../contexts/ConfigContext";

const PackageRoutes = (props) => {

    const { publicRoutes, privateRoutes } = useRoutesInjection();
    const { firstPrivatePath } = useConfig();

    const {
        logoImg = Logo, 
        pathImg = './src/assets/MyWarehouse.svg', 
        firstPrivateElement = <Dashboard/>,
        globalLayout,
        isMain,
        headerComponent,
        showHeaderOnLogin,
        privateProvider,
        customProvider
    } = props;

    const layout = globalLayout ? globalLayout : <DefaultLayout isMain={isMain} headerComponent={headerComponent} showHeaderOnLogin={showHeaderOnLogin} />
    const provider = privateProvider ? (React.cloneElement(privateProvider, {}, customProvider)) : (<AuthPage>{customProvider}</AuthPage>);

    const iconUpdater = () => {
        const favicon = document.querySelector("link[rel='icon']");

        if(pathImg) favicon.href = pathImg;
    }

    useEffect(() => {
        iconUpdater();
    }, []);

    return (
        <Routes>

            <Route element={globalLayout === 'none' ? null : layout}>

                {/* Rotte pubbliche */}
                <Route path="/">

                    <Route index element={<Login Logo={logoImg} />} />

                    {/* Nuove rotte da inserire con il Context */}
                    {publicRoutes.map((route, i) => (
                        <Route key={`public-${i}`} path={route.path} element={route.element} />
                    ))}

                </Route>

                {/* Rotte private */}
                <Route element={provider}>

                    <Route path={`${firstPrivatePath}:id`} element={firstPrivateElement} />

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