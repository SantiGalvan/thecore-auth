import { ImSpinner9 } from "react-icons/im";

const Loading = () => {

    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-[#00000080]">
            <ImSpinner9 className="text-[20rem] relative animate-spin text-white" />
            <p className="text-white text-2xl select-none absolute">Loading...</p>
        </div>
    )
}

export default Loading;