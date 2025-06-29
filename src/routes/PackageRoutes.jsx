import { Outlet, Route, Routes } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import Login from "../pages/login/Login";
import AuthPage from "../middlewares/auth/AuthPage";
import Dashboard from "../pages/user/Dashboard";
import Logo from '../assets/MyWarehouse.svg?react';
import React, { useEffect } from "react";
import { useRoutesInjection } from "../contexts/route/RouteContext";
import { useConfig } from "../contexts/config/ConfigContext";

const PackageRoutes = (props) => {

    const { publicRoutes, privateRoutes } = useRoutesInjection();
    const { firstPrivatePath } = useConfig();

    const {
        logoImg = Logo,
        pathImg = './src/assets/MyWarehouse.svg',
        firstPrivateElement = <Dashboard />,
        globalLayout,
        isMain,
        headerComponent,
        showHeaderOnLogin,
        headerExcludedRoutes,
        footerComponent,
        showFooterOnLogin,
        footerExcludedRoutes,
        privateProvider,
        customProvider
    } = props;

    let layout;

    if (globalLayout === "none") {
        layout = null;
    } else if (React.isValidElement(globalLayout)) {
        layout = globalLayout;
    } else {
        layout = (
            <DefaultLayout
                isMain={isMain}
                headerComponent={headerComponent}
                showHeaderOnLogin={showHeaderOnLogin}
                headerExcludedRoutes={headerExcludedRoutes}
                footerComponent={footerComponent}
                showFooterOnLogin={showFooterOnLogin}
                footerExcludedRoutes={footerExcludedRoutes}
            />
        );
    }

    const provider = privateProvider
        ? React.cloneElement(privateProvider, {},
            customProvider
                ? React.createElement(customProvider.type, customProvider.props,
                    <AuthPage>
                        <Outlet />
                    </AuthPage>
                )
                : (
                    <AuthPage>
                        <Outlet />
                    </AuthPage>
                )
        )
        : customProvider
            ? React.createElement(customProvider.type, customProvider.props,
                <AuthPage>
                    <Outlet />
                </AuthPage>
            )
            : (
                <AuthPage>
                    <Outlet />
                </AuthPage>
            );

    const iconUpdater = () => {
        const favicon = document.querySelector("link[rel='icon']");

        if (pathImg) favicon.href = pathImg;
    }

    useEffect(() => {
        iconUpdater();
    }, []);

    return (
        <Routes>

            <Route element={layout}>

                {/* Rotte pubbliche */}
                <Route path="/">

                    <Route index element={<Login Logo={logoImg} />} />

                    {/* Nuove rotte da inserire con il Context */}
                    {publicRoutes.map((route, i) => (
                        <Route key={`public-${i}`} path={route.path} element={route.element} />
                    ))}

                </Route>

                {/* Rotte private */}
                <Route element={provider} >

                    <Route path={`${firstPrivatePath ?? '/dashboard/'}:id`} element={firstPrivateElement} />

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