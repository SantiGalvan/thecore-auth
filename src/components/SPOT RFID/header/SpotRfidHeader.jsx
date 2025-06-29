import { IoIosLogOut } from "react-icons/io";
import { TiArrowBack } from "react-icons/ti";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import DefaultLogo from '../../../assets/MyTrack.svg?react';
import { useAuth } from "../../../contexts/auth/AuthContext";
import { useAlert } from "../../../contexts/alert/AlertContext";
import { useConfig } from "../../../contexts/config/ConfigContext";
import { useLoading } from "../../../contexts/loading/LoadingContext";

const Header = ({ Logo, logo }) => {

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
                    {Logo && typeof Logo === 'function' ? (
                        <Logo className="header-logo-size" />
                    ) : (
                        logo ? (
                            <img src={logo} alt="Logo" className="header-logo-size" />
                        ) : (
                            <DefaultLogo className="header-logo-size" />
                        )
                    )}
                </figure>

                {/* Informazioni pagina */}
                <div>
                    <p>{currentPath?.title || firstPrivateTitle}</p>
                </div>

                {/* Bottoni */}
                <div>

                    {/* Bottone Logout */}
                    {(!autoLogin && matchHome) && <button
                        className="h-[48px] w-[48px] flex items-center justify-center bg-red-600 text-white rounded-lg shadow-md transition duration-200 ease-in-out transform active:translate-y-[2px] cursor-pointer"
                        type="button"
                        onClick={signOut}
                    >
                        <IoIosLogOut className="text-4xl w-full" />
                    </button>}

                    {/* Bottone per tornare indietro */}
                    {(!matchHome && showHeaderButton) && <button
                        className="h-[48px] w-[48px] flex items-center justify-center bg-sky-600 text-white rounded-lg shadow-md transition duration-200 ease-in-out transform active:translate-y-[2px] cursor-pointer"
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