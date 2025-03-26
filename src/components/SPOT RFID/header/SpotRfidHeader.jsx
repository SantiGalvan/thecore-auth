import { IoIosLogOut } from "react-icons/io";
import { TiArrowBack } from "react-icons/ti";
import { useAuth } from "../../../contexts/AuthContext";
import { useAlert } from "../../../contexts/AlertContext";
import { useConfig } from "../../../contexts/ConfigContext";
import { useLoading } from "../../../contexts/LoadingContext";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import DefaultLogo from '../../../assets/MyTrack.svg?react';

const Header = ({ Logo }) => {

    const { logout } = useAuth();
    const { activeAlert } = useAlert();
    const { autoLogin, configRoutes, firstPrivateTitle, showHeaderButton } = useConfig();
    const { isLoading } = useLoading();

    const location = useLocation();
    const navigate = useNavigate();

    const signOut = () => {
        logout();
        activeAlert('info', 'Hai effettuato il logout');
    }

    const currentPath = configRoutes.find(item => item.path === location.pathname);

    const matchHome = useMatch("home/:id");

    return (
        <header className={isLoading ? 'hidden' : ''}>
            <nav className="header-size flex items-center justify-between px-2 shadow-lg border-b gap-2 border-b-gray-300">

                {/* Logo */}
                <figure>
                    {Logo ? <Logo className="header-logo-size" /> : <DefaultLogo className="header-logo-size" />}
                </figure>

                {/* Informazioni pagina */}
                <div>
                    <p>{currentPath?.title || firstPrivateTitle}</p>
                </div>

                {/* Bottoni */}
                <div>

                    {/* Bottone Logout */}
                    {(!autoLogin && matchHome) && <button
                        className="h-[var(--header-logo-size)] w-[var(--header-logo-size)] flex items-center justify-center bg-red-600 text-white rounded-lg shadow-md transition duration-200 ease-in-out transform active:translate-y-[2px] cursor-pointer"
                        type="button"
                        onClick={signOut}
                    >
                        <IoIosLogOut className="text-4xl w-full" />
                    </button>}

                    {/* Bottone per tornare indietro */}
                    {(!matchHome && showHeaderButton) && <button
                        className="h-[var(--header-logo-size)] w-[var(--header-logo-size)] flex items-center justify-center bg-sky-600 text-white rounded-lg shadow-md transition duration-200 ease-in-out transform active:translate-y-[2px] cursor-pointer"
                        type="button"
                        onClick={() => navigate(-1)}
                    >
                        <TiArrowBack className="text-4xl w-full" />
                    </button>}

                </div>
            </nav>
        </header>
    )
}

export default Header;