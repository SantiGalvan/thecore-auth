import { LoadingProvider } from "./contexts/loading/LoadingContext";
import { useLoading } from "./contexts/loading/LoadingContext";
import { ConfigProvider } from "./contexts/config/ConfigContext";
import { useConfig } from "./contexts/config/ConfigContext";
import { AlertProvider } from "./contexts/alert/AlertContext";
import { useAlert } from "./contexts/alert/AlertContext";
import { AuthProvider } from "./contexts/auth/AuthContext";
import { useAuth } from "./contexts/auth/AuthContext";
import { RouteProvider } from "./contexts/route/RouteContext";
import { useRoutesInjection } from "./contexts/route/RouteContext";
import { LoginFormProvider } from "./contexts/login/LoginFormContext";
import { useLoginForm } from "./contexts/login/LoginFormContext";
import { ModalProvider } from "./contexts/modal/ModalContext";
import { useModal } from "./contexts/modal/ModalContext";
import { BrowserRouter } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useMatch } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { UsePageTitle } from "./hooks/title/UsePageTitle";
import { useStorage } from "./hooks/storage/useStorage";
import { useAuthStorage } from "./hooks/auth/useAuthStorage";
import { useIndexedDB } from "./hooks/indexedDB/useIndexedDB";
import { useOrientation } from "./hooks/orientation/useOrientation";
import PackageRoutes from "./routes/PackageRoutes";
import AuthPage from "./middlewares/auth/AuthPage";
import AuthAdmin from "./middlewares/admin/AuthAdmin";
import DefaultLayout from "./layouts/DefaultLayout";
import Login from "./pages/login/Login";
import Dashboard from "./pages/user/Dashboard";
import { fetchAxiosConfig } from "./api/axiosInstance"
import LoginForm from "./components/form/LoginForm";
import Loading from "./components/loading/Loading";
import LoadingComponent from "./components/loading/LoadingComponent";
import Alert from "./components/alert/Alert";
import Input from "./components/inputs/Input";
import InputLabel from "./components/inputs/InputLabel";
import ErrorPage from "./pages/error/ErrorPage";
import axios from "axios";
import InputGroup from "./components/SPOT RFID/inputs/InputGroup";
import CardInputTag from "./components/SPOT RFID/card/CardInputTag";
import CardInputRange from "./components/SPOT RFID/card/CardInputRange";
import ConfigFileReader from "./components/SPOT RFID/config/ConfigFileReader";
import Header from "./components/SPOT RFID/header/SpotRfidHeader";
import FileDropzone from "./components/inputs/FileDropzone";
import SwitchRadio from "./components/inputs/SwitchRadio";
import InputDate from "./components/inputs/date/InputDate";
import InputStartEndDate from "./components/inputs/date/InputStartEndDate";
import ReactDOM from "react-dom";
import './css/index.css';

export {
    BrowserRouter,
    LoadingProvider,
    useLoading,
    ConfigProvider,
    useConfig,
    AlertProvider,
    useAlert,
    AuthProvider,
    useAuth,
    RouteProvider,
    useRoutesInjection,
    LoginFormProvider,
    Outlet,
    Route,
    Routes,
    Link,
    NavLink,
    useLocation,
    useMatch,
    useLoginForm,
    PackageRoutes,
    AuthPage,
    AuthAdmin,
    DefaultLayout,
    Login,
    Dashboard,
    fetchAxiosConfig,
    LoginForm,
    Loading,
    LoadingComponent,
    Alert,
    Input,
    InputLabel,
    ErrorPage,
    axios,
    useNavigate,
    useParams,
    InputGroup,
    CardInputTag,
    CardInputRange,
    ConfigFileReader,
    Header,
    ReactDOM,
    ModalProvider,
    useModal,
    UsePageTitle,
    useStorage,
    useAuthStorage,
    useIndexedDB,
    useOrientation,
    FileDropzone,
    SwitchRadio,
    InputDate,
    InputStartEndDate
}