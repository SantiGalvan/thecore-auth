import { describe, it, expect, vi, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useEnvironmentInfo } from "./useEnvironmentInfo";

const defineNavigatorProp = (name, value) => {
    Object.defineProperty(navigator, name, { value, configurable: true });
};

describe("useEnvironmentInfo - static fields", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("exposes hardwareConcurrency read from navigator", () => {
        defineNavigatorProp("hardwareConcurrency", 8);

        const { result } = renderHook(() => useEnvironmentInfo());

        expect(result.current.hardwareConcurrency).toBe(8);
    });

    it("logs every field individually with the [useEnvironmentInfo] prefix", () => {
        defineNavigatorProp("hardwareConcurrency", 8);
        const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

        renderHook(() => useEnvironmentInfo());

        expect(logSpy).toHaveBeenCalledWith("[useEnvironmentInfo] hardwareConcurrency:", 8);
    });

    it("exposes deviceMemory as undefined when the browser does not support it", () => {
        defineNavigatorProp("deviceMemory", undefined);

        const { result } = renderHook(() => useEnvironmentInfo());

        expect(result.current.deviceMemory).toBeUndefined();
    });

    it("exposes maxTouchPoints and cookieEnabled read from navigator", () => {
        defineNavigatorProp("maxTouchPoints", 5);
        defineNavigatorProp("cookieEnabled", true);

        const { result } = renderHook(() => useEnvironmentInfo());

        expect(result.current.maxTouchPoints).toBe(5);
        expect(result.current.cookieEnabled).toBe(true);
    });

    it("exposes screen dimensions read from the screen object", () => {
        vi.spyOn(window.screen, "width", "get").mockReturnValue(1920);
        vi.spyOn(window.screen, "height", "get").mockReturnValue(1080);
        vi.spyOn(window.screen, "availWidth", "get").mockReturnValue(1900);
        vi.spyOn(window.screen, "availHeight", "get").mockReturnValue(1040);
        vi.spyOn(window.screen, "colorDepth", "get").mockReturnValue(24);

        const { result } = renderHook(() => useEnvironmentInfo());

        expect(result.current.screen).toEqual({
            width: 1920,
            height: 1080,
            availWidth: 1900,
            availHeight: 1040,
            colorDepth: 24,
        });
    });

    it("exposes userAgentData low-entropy fields when supported, undefined otherwise", () => {
        defineNavigatorProp("userAgentData", {
            platform: "Linux",
            mobile: false,
            brands: [{ brand: "Chromium", version: "126" }],
        });

        const { result } = renderHook(() => useEnvironmentInfo());

        expect(result.current.userAgentData).toEqual({
            platform: "Linux",
            mobile: false,
            brands: [{ brand: "Chromium", version: "126" }],
        });

        defineNavigatorProp("userAgentData", undefined);

        const { result: resultWithoutUAData } = renderHook(() => useEnvironmentInfo());

        expect(resultWithoutUAData.current.userAgentData).toBeUndefined();
    });

    it("exposes capability flags as booleans based on feature presence on navigator", () => {
        defineNavigatorProp("bluetooth", {});
        defineNavigatorProp("usb", undefined);
        defineNavigatorProp("share", vi.fn());

        const { result } = renderHook(() => useEnvironmentInfo());

        expect(result.current.capabilities.bluetooth).toBe(true);
        expect(result.current.capabilities.usb).toBe(false);
        expect(result.current.capabilities.share).toBe(true);
    });
});

describe("useEnvironmentInfo - dynamic fields", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("updates language, languages and timeZone together on languagechange", () => {
        defineNavigatorProp("language", "it-IT");
        defineNavigatorProp("languages", ["it-IT", "en-US"]);

        const { result } = renderHook(() => useEnvironmentInfo());

        expect(result.current.language).toBe("it-IT");
        expect(result.current.languages).toEqual(["it-IT", "en-US"]);
        expect(typeof result.current.timeZone).toBe("string");

        defineNavigatorProp("language", "en-US");
        defineNavigatorProp("languages", ["en-US"]);

        act(() => {
            window.dispatchEvent(new Event("languagechange"));
        });

        expect(result.current.language).toBe("en-US");
        expect(result.current.languages).toEqual(["en-US"]);
    });

    it("updates devicePixelRatio on resize", () => {
        vi.spyOn(window, "devicePixelRatio", "get").mockReturnValue(1);

        const { result } = renderHook(() => useEnvironmentInfo());

        expect(result.current.devicePixelRatio).toBe(1);

        vi.spyOn(window, "devicePixelRatio", "get").mockReturnValue(2);

        act(() => {
            window.dispatchEvent(new Event("resize"));
        });

        expect(result.current.devicePixelRatio).toBe(2);
    });

    it("updates orientation on screen.orientation change", () => {
        const listeners = {};
        const orientation = {
            type: "portrait-primary",
            angle: 0,
            addEventListener: (event, cb) => { listeners[event] = cb; },
            removeEventListener: vi.fn(),
        };
        Object.defineProperty(window.screen, "orientation", { value: orientation, configurable: true });

        const { result } = renderHook(() => useEnvironmentInfo());

        expect(result.current.orientation).toEqual({ type: "portrait-primary", angle: 0 });

        orientation.type = "landscape-primary";
        orientation.angle = 90;

        act(() => {
            listeners.change();
        });

        expect(result.current.orientation).toEqual({ type: "landscape-primary", angle: 90 });
    });

    it("updates isOnline on online/offline events", () => {
        defineNavigatorProp("onLine", true);

        const { result } = renderHook(() => useEnvironmentInfo());

        expect(result.current.isOnline).toBe(true);

        defineNavigatorProp("onLine", false);

        act(() => {
            window.dispatchEvent(new Event("offline"));
        });

        expect(result.current.isOnline).toBe(false);
    });

    it("updates independently-wired media query preferences on their own change event", () => {
        const mediaQueryLists = {};
        window.matchMedia = vi.fn();
        vi.spyOn(window, "matchMedia").mockImplementation((query) => {
            if (!mediaQueryLists[query]) {
                const listeners = [];
                mediaQueryLists[query] = {
                    matches: false,
                    media: query,
                    addEventListener: (event, cb) => listeners.push(cb),
                    removeEventListener: vi.fn(),
                    _fireChange: (matches) => {
                        mediaQueryLists[query].matches = matches;
                        listeners.forEach((cb) => cb({ matches }));
                    },
                };
            }
            return mediaQueryLists[query];
        });

        const { result } = renderHook(() => useEnvironmentInfo());

        expect(result.current.prefersColorSchemeDark).toBe(false);
        expect(result.current.prefersReducedMotion).toBe(false);

        act(() => {
            mediaQueryLists["(prefers-color-scheme: dark)"]._fireChange(true);
        });

        expect(result.current.prefersColorSchemeDark).toBe(true);
        expect(result.current.prefersReducedMotion).toBe(false);
    });

    it("exposes navigator.connection fields when supported and updates on its change event", () => {
        const listeners = {};
        defineNavigatorProp("connection", {
            effectiveType: "4g",
            downlink: 10,
            rtt: 50,
            saveData: false,
            type: "wifi",
            addEventListener: (event, cb) => { listeners[event] = cb; },
            removeEventListener: vi.fn(),
        });

        const { result } = renderHook(() => useEnvironmentInfo());

        expect(result.current.connection).toEqual({
            effectiveType: "4g",
            downlink: 10,
            rtt: 50,
            saveData: false,
            type: "wifi",
        });

        navigator.connection.effectiveType = "2g";
        navigator.connection.saveData = true;

        act(() => {
            listeners.change();
        });

        expect(result.current.connection.effectiveType).toBe("2g");
        expect(result.current.connection.saveData).toBe(true);
    });

    it("exposes connection as undefined when navigator.connection is not supported", () => {
        defineNavigatorProp("connection", undefined);

        const { result } = renderHook(() => useEnvironmentInfo());

        expect(result.current.connection).toBeUndefined();
    });

    it("reads storage estimate once on mount and allows manual refresh", async () => {
        const estimate = vi.fn()
            .mockResolvedValueOnce({ usage: 100, quota: 1000 })
            .mockResolvedValueOnce({ usage: 200, quota: 1000 });
        defineNavigatorProp("storage", { estimate });

        const { result } = renderHook(() => useEnvironmentInfo());

        await act(async () => {
            await Promise.resolve();
        });

        expect(result.current.storageUsage).toBe(100);
        expect(result.current.storageQuota).toBe(1000);

        await act(async () => {
            await result.current.refreshStorageEstimate();
        });

        expect(result.current.storageUsage).toBe(200);
        expect(estimate).toHaveBeenCalledTimes(2);
    });
});
