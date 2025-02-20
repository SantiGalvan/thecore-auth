import { ImSpinner9 } from "react-icons/im";

const Loading = ({spinner = true, spinnerStyle, text, textStyle, children, containerStyle}) => {
    return (
        <div className={`fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-loading-bg z-[999] ${containerStyle}`}>
            {spinner && <ImSpinner9 className={`text-[20rem] relative animate-spin text-spinner ${spinnerStyle}`} />}
            {children ? children : <p className={`text-white text-2xl select-none absolute ${textStyle}`}>{text || 'Loading...'}</p>}
        </div>
    )
}

export default Loading;