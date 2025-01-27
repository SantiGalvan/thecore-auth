import { createContext, useContext, useState } from "react";

const LoadingContext = createContext();

const LoadingProvider = ({children}) => {

    const [isLoading, setIsLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{isLoading, setIsLoading}}>
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