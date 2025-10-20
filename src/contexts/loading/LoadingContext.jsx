import { createContext, useContext, useState } from "react";

const LoadingContext = createContext();

const LoadingProvider = ({ children, defaultComponent }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [loadingProps, setLoadingProps] = useState({});
    const [loadingComponent, setLoadingComponent] = useState(defaultComponent);

    const value = { isLoading, setIsLoading, loadingProps, setLoadingProps, loadingComponent, setLoadingComponent }

    return (
        <LoadingContext.Provider value={value}>
            {children}
        </LoadingContext.Provider>
    )
}

const useLoading = () => {
    const value = useContext(LoadingContext);

    if (value === undefined) throw new Error('Non puoi settare il loading');

    return value;
}

export { LoadingProvider, useLoading }