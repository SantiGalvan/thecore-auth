import { createContext, useContext, useState } from "react";

const LoadingContext = createContext();

const LoadingProvider = ({ children, defaultComponent }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [loadingProps, setLoadingProps] = useState({});
    const [loadingComponent, setLoadingComponent] = useState(defaultComponent);

    const showLoadingFor = (duration = 2000, props = {}) => {
        setLoadingProps(props);
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
        }, duration);
    };

    const value = { isLoading, setIsLoading, loadingProps, setLoadingProps, loadingComponent, setLoadingComponent, showLoadingFor }

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