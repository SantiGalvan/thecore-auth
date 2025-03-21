import { createContext, useContext, useState } from "react";

const LoadingContext = createContext();

const LoadingProvider = ({children}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingComponent, setIsLoadingComponent] = useState(false);
    const [loadingProps, setLoadingProps] = useState({});

    return (
        <LoadingContext.Provider value={{isLoading, setIsLoading, isLoadingComponent, setIsLoadingComponent, loadingProps, setLoadingProps}}>
            {children}
        </LoadingContext.Provider>
    )
}

const useLoading = () => {
    const value = useContext(LoadingContext);

    if(value === undefined) throw new Error('Non puoi settare il loading');

    return value;
}

export { LoadingProvider, useLoading }