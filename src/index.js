import { LoadingProvider } from "./contexts/LoadingContext";
import { useLoading } from "./contexts/LoadingContext";
import { ConfigProvider } from "./contexts/ConfigContext";
import { AlertProvider } from "./contexts/AlertContext";
import { AuthProvider } from "./contexts/AuthContext";
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
import PackageRoutes from "./routes/PackageRoutes";
import AuthPage from "./middlewares/AuthPage";
import DefaultLayout from "./layouts/DefaultLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/user/Dashboard";
import { fetchAxiosConfig } from "./utils/axiosInstance"
import LoginForm from "./components/LoginForm";
import Loading from "./components/Loading";
import Alert from "./components/Alert";
import Input from "./components/inputs/Input";
import InputLabel from "./components/inputs/InputLabel";
import ErrorPage from "./pages/ErrorPage";
import './index.css'

export { 
    BrowserRouter,
    LoadingProvider,
    useLoading,
    ConfigProvider,
    AlertProvider,
    AuthProvider,
    RouteProvider,
    useRoutesInjection,
    LoginFormProvider,
    Outlet,
    Route,
    Routes,
    Link,
    NavLink,
    useLocation,
    useLoginForm,
    PackageRoutes,
    AuthPage,
    DefaultLayout,
    Login,
    Dashboard,
    fetchAxiosConfig,
    LoginForm,
    Loading,
    Alert,
    Input,
    InputLabel,
    ErrorPage
}