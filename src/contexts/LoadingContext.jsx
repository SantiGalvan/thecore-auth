import { createContext, useState } from "react";

const LoadingContext = createContext();

const LoadingProvider = ({children}) => {

    const [isLoading, setIsLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{isLoading, setIsLoading}}>
            {children}
        </LoadingContext.Provider>
    )
}

export { LoadingProvider, LoadingContext }