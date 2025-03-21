import { createContext, useContext } from "react";

const RouteContext = createContext();

const RouteProvider = ({ children, publicRoutes = [], privateRoutes = [] }) => {
    return (
        <RouteContext.Provider value={{publicRoutes, privateRoutes}} >
            {children}
        </RouteContext.Provider>
    )
}

const useRoutesInjection = () => {
    const value = useContext(RouteContext);

    if (value === undefined) {
        throw new Error(
            "Errore: Le rotte non sono state inizializzate correttamente.\n\n" +
            "Soluzione: Assicurati di avvolgere il tuo componente con <RouteProvider>.\n\n" +
            "Esempio:\n\n" +
            "<RouteProvider publicRoutes={[]} privateRoutes={[]}>\n" +
            "   <MyPackageRoutes />\n" +
            "</RouteProvider>"
        );
    }

    return value;
}

export { RouteProvider, useRoutesInjection }