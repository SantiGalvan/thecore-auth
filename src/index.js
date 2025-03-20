import { LoadingProvider } from "./contexts/LoadingContext";
import { useLoading } from "./contexts/LoadingContext";
import { ConfigProvider } from "./contexts/ConfigContext";
import { useConfig } from "./contexts/ConfigContext";
import { AlertProvider } from "./contexts/AlertContext";
import { useAlert } from "./contexts/AlertContext";
import { AuthProvider } from "./contexts/AuthContext";
import { useAuth } from "./contexts/AuthContext";
import { RouteProvider } from "./contexts/RouteContext";
import { useRoutesInjection } from "./contexts/RouteContext";
import { LoginFormProvider } from "./contexts/LoginFormContext";
import { useLoginForm } from "./contexts/LoginFormContext";
import { BrowserRouter } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useMatch } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PackageRoutes from "./routes/PackageRoutes";
import AuthPage from "./middlewares/AuthPage";
import AuthAdmin from "./middlewares/AuthAdmin";
import DefaultLayout from "./layouts/DefaultLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/user/Dashboard";
import { fetchAxiosConfig } from "./utils/axiosInstance"
import LoginForm from "./components/LoginForm";
import Loading from "./components/loading/Loading";
import LoadingComponent from "./components/loading/LoadingComponent";
import Alert from "./components/Alert";
import Input from "./components/inputs/Input";
import InputLabel from "./components/inputs/InputLabel";
import ErrorPage from "./pages/ErrorPage";
import axios from "axios";
import './index.css'

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
    useNavigate
}