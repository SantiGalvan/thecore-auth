import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { AuthProvider, useAuth } from "./AuthContext";
import { fetchAxiosConfig } from "../../api/axiosInstance.js";
import jwt_decode from "jwt-decode";

vi.mock("react-router-dom", () => ({
    useNavigate: () => vi.fn(),
}));

vi.mock("../config/ConfigContext.jsx", () => ({
    useConfig: () => ({
        heartbeatEndpoint: "/heartbeat",
        firstPrivatePath: "/dashboard/",
        infiniteSession: false,
        timeDeducted: 0,
        authenticatedEndpoint: "/login",
        autoLogin: false,
        setCurrentDate: vi.fn(),
        isDebug: false,
        backendToken: null,
        useCustomLoginTimeout: false,
        stopLoaderOnFinish: true,
        customLoginTimeout: 0,
        tokenLog: false,
        timerInfiniteSession: undefined,
    }),
}));

vi.mock("../loading/LoadingContext.jsx", () => ({
    useLoading: () => ({ setIsLoading: vi.fn(), showLoadingFor: vi.fn() }),
}));

vi.mock("../alert/AlertContext.jsx", () => ({
    useAlert: () => ({ setShowAlert: vi.fn(), activeAlert: vi.fn() }),
}));

vi.mock("../../api/axiosInstance.js", () => ({
    fetchAxiosConfig: vi.fn(),
}));

vi.mock("jwt-decode", () => ({
    default: vi.fn(),
}));

const defineReadyState = (value) => {
    Object.defineProperty(document, "readyState", { value, configurable: true });
};

describe("AuthProvider - window 'load' listener", () => {
    beforeEach(() => {
        localStorage.clear();
        defineReadyState("loading");
    });

    afterEach(() => {
        vi.restoreAllMocks();
        defineReadyState("complete");
    });

    it("does not revert a login that completes before the deferred window load event fires", async () => {
        jwt_decode.mockImplementation((token) => {
            if (token === "fresh-token") {
                return { exp: Math.floor(Date.now() / 1000) + 3600 };
            }
            throw new Error(`unexpected token passed to jwt_decode: ${token}`);
        });

        fetchAxiosConfig.mockResolvedValue({
            post: vi.fn().mockResolvedValue({
                headers: { token: "fresh-token" },
                data: { id: 42, name: "Mario" },
            }),
            get: vi.fn(),
        });

        // AuthProvider mounts here, while `document.readyState` is still
        // "loading" (simulating the slow hard-reload window before the
        // native `load` event fires) — this registers the listener instead
        // of running the check synchronously.
        const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

        await act(async () => {
            await result.current.login(null, { username: "mario", password: "secret" });
        });

        expect(result.current.isAuthenticated).toBe(true);
        expect(JSON.parse(localStorage.getItem("accessToken"))).toBe("fresh-token");

        // The deferred native `load` event finally fires, AFTER the login
        // already completed successfully.
        act(() => {
            window.dispatchEvent(new Event("load"));
        });

        expect(result.current.isAuthenticated).toBe(true);
        expect(JSON.parse(localStorage.getItem("accessToken"))).toBe("fresh-token");
    });

    it("still logs out via the load listener when the token becomes invalid before the deferred load event fires", () => {
        localStorage.setItem("accessToken", JSON.stringify("token-that-will-expire"));

        let tokenIsValid = true;
        jwt_decode.mockImplementation(() => {
            const currentTime = Math.floor(Date.now() / 1000);
            return { exp: tokenIsValid ? currentTime + 3600 : currentTime - 1 };
        });

        const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

        // Valid at mount time -> the mount-time check must NOT log out.
        expect(result.current.isAuthenticated).toBe(true);

        // Token expires while the (slow) hard reload is still fetching assets.
        tokenIsValid = false;

        act(() => {
            window.dispatchEvent(new Event("load"));
        });

        expect(result.current.isAuthenticated).toBe(false);
        expect(localStorage.getItem("accessToken")).toBeNull();
    });
});
