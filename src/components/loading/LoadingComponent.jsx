import { ImSpinner9 } from "react-icons/im";

const LoadingComponent = ({spinner = true, spinnerStyle, text, textStyle, children, containerStyle}) => {
    return (
        <div className={ `w-full h-full relative flex items-center justify-center ${containerStyle}`}>
            {spinner && <ImSpinner9 className={`text-[20rem] animate-spin text-black ${spinnerStyle}`} />}
            {children ?  children : <p className={`text-black text-2xl select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${textStyle}`} >{text || 'Loading...'}</p>}
        </div>
    )
}

export default LoadingComponent;