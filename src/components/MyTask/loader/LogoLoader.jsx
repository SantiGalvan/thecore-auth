const LogoLoader = ({ sizeContainer, Logo }) => {

    return (
        <div className={`relative ${sizeContainer ? sizeContainer : 'h-60 w-60'}`}>
            {/* SPINNER CIRCOLARE */}
            <svg className="absolute inset-0 w-full h-full animate-spin-slow z-10" viewBox="0 0 100 100">
                <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#60A5FA"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray="280"
                    strokeDashoffset="210"
                />
            </svg>

            {/* LOGO */}
            <figure className="h-full w-full rounded-full overflow-hidden relative">
                <Logo className="h-full w-full" />
            </figure>
        </div>
    )
}

export default LogoLoader;