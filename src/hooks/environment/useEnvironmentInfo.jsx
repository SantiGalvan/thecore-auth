import { useEffect, useMemo, useState } from "react";
import { useConfig } from "../../contexts/config/ConfigContext.jsx";

const logField = (enabled, name, value) => {
    if (enabled) console.log(`[useEnvironmentInfo] ${name}:`, value);
    return value;
};

const hasFeature = (name) => Boolean(navigator[name]);

const getCapabilities = (enabled) =>
    logField(enabled, "capabilities", {
        bluetooth: hasFeature("bluetooth"),
        usb: hasFeature("usb"),
        serial: hasFeature("serial"),
        hid: hasFeature("hid"),
        wakeLock: hasFeature("wakeLock"),
        share: hasFeature("share"),
        clipboard: hasFeature("clipboard"),
        serviceWorker: hasFeature("serviceWorker"),
        gpu: hasFeature("gpu"),
        gamepads: hasFeature("getGamepads"),
        geolocation: hasFeature("geolocation"),
        permissions: hasFeature("permissions"),
        xr: hasFeature("xr"),
    });

const getStaticEnvironmentInfo = (enabled) => ({
    hardwareConcurrency: logField(enabled, "hardwareConcurrency", navigator.hardwareConcurrency),
    deviceMemory: logField(enabled, "deviceMemory", navigator.deviceMemory),
    maxTouchPoints: logField(enabled, "maxTouchPoints", navigator.maxTouchPoints),
    cookieEnabled: logField(enabled, "cookieEnabled", navigator.cookieEnabled),
    screen: logField(enabled, "screen", {
        width: window.screen.width,
        height: window.screen.height,
        availWidth: window.screen.availWidth,
        availHeight: window.screen.availHeight,
        colorDepth: window.screen.colorDepth,
    }),
    userAgentData: logField(
        enabled,
        "userAgentData",
        navigator.userAgentData
            ? {
                  platform: navigator.userAgentData.platform,
                  mobile: navigator.userAgentData.mobile,
                  brands: navigator.userAgentData.brands,
              }
            : undefined
    ),
    capabilities: getCapabilities(enabled),
});

const getLocaleInfo = (enabled) => {
    const language = navigator.language;
    const languages = navigator.languages;
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const { numberingSystem, calendar } = language
        ? new Intl.Locale(language).maximize()
        : {};

    return {
        language: logField(enabled, "language", language),
        languages: logField(enabled, "languages", languages),
        timeZone: logField(enabled, "timeZone", timeZone),
        locale: logField(enabled, "locale", { numberingSystem, calendar }),
    };
};

const getOrientation = (enabled) => {
    const orientation = window.screen.orientation;
    return logField(enabled, "orientation", {
        type: orientation?.type,
        angle: orientation?.angle,
    });
};

const getConnectionSnapshot = (enabled) => {
    const connection = navigator.connection;
    return logField(
        enabled,
        "connection",
        connection
            ? {
                  effectiveType: connection.effectiveType,
                  downlink: connection.downlink,
                  rtt: connection.rtt,
                  saveData: connection.saveData,
                  type: connection.type,
              }
            : undefined
    );
};

const MEDIA_QUERY_FIELDS = {
    prefersColorSchemeDark: "(prefers-color-scheme: dark)",
    prefersReducedMotion: "(prefers-reduced-motion: reduce)",
    prefersContrastMore: "(prefers-contrast: more)",
    forcedColorsActive: "(forced-colors: active)",
    prefersReducedData: "(prefers-reduced-data: reduce)",
    isStandalonePwa: "(display-mode: standalone)",
};

const readMediaQuery = (enabled, field, query) => {
    if (typeof window.matchMedia !== "function") return undefined;
    return logField(enabled, field, window.matchMedia(query).matches);
};

const useMediaQueryPreference = (enabled, field, query) => {
    const [value, setValue] = useState(() => readMediaQuery(enabled, field, query));

    useEffect(() => {
        if (typeof window.matchMedia !== "function") return undefined;

        const mediaQueryList = window.matchMedia(query);
        const handleChange = (event) => setValue(logField(enabled, field, event.matches));

        mediaQueryList.addEventListener("change", handleChange);
        return () => mediaQueryList.removeEventListener("change", handleChange);
    }, [enabled, field, query]);

    return value;
};

const useEnvironmentInfo = () => {
    const { environmentInfoLog } = useConfig();
    const loggingEnabled = Boolean(environmentInfoLog);

    const staticInfo = useMemo(() => getStaticEnvironmentInfo(loggingEnabled), [loggingEnabled]);
    const [localeInfo, setLocaleInfo] = useState(() => getLocaleInfo(loggingEnabled));
    const [devicePixelRatio, setDevicePixelRatio] = useState(() => logField(loggingEnabled, "devicePixelRatio", window.devicePixelRatio));
    const [orientation, setOrientation] = useState(() => getOrientation(loggingEnabled));
    const [isOnline, setIsOnline] = useState(() => logField(loggingEnabled, "isOnline", navigator.onLine));
    const [connection, setConnection] = useState(() => getConnectionSnapshot(loggingEnabled));
    const [storageEstimate, setStorageEstimate] = useState({ storageUsage: undefined, storageQuota: undefined });

    const mediaPreferences = {
        prefersColorSchemeDark: useMediaQueryPreference(loggingEnabled, "prefersColorSchemeDark", MEDIA_QUERY_FIELDS.prefersColorSchemeDark),
        prefersReducedMotion: useMediaQueryPreference(loggingEnabled, "prefersReducedMotion", MEDIA_QUERY_FIELDS.prefersReducedMotion),
        prefersContrastMore: useMediaQueryPreference(loggingEnabled, "prefersContrastMore", MEDIA_QUERY_FIELDS.prefersContrastMore),
        forcedColorsActive: useMediaQueryPreference(loggingEnabled, "forcedColorsActive", MEDIA_QUERY_FIELDS.forcedColorsActive),
        prefersReducedData: useMediaQueryPreference(loggingEnabled, "prefersReducedData", MEDIA_QUERY_FIELDS.prefersReducedData),
        isStandalonePwa: useMediaQueryPreference(loggingEnabled, "isStandalonePwa", MEDIA_QUERY_FIELDS.isStandalonePwa),
    };

    const readStorageEstimate = async () => {
        if (!navigator.storage?.estimate) return;

        const { usage, quota } = await navigator.storage.estimate();
        setStorageEstimate({
            storageUsage: logField(loggingEnabled, "storageUsage", usage),
            storageQuota: logField(loggingEnabled, "storageQuota", quota),
        });
    };

    useEffect(() => {
        const handleLanguageChange = () => setLocaleInfo(getLocaleInfo(loggingEnabled));

        window.addEventListener("languagechange", handleLanguageChange);
        return () => window.removeEventListener("languagechange", handleLanguageChange);
    }, [loggingEnabled]);

    useEffect(() => {
        const handleResize = () => setDevicePixelRatio(logField(loggingEnabled, "devicePixelRatio", window.devicePixelRatio));

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [loggingEnabled]);

    useEffect(() => {
        const screenOrientation = window.screen.orientation;
        if (!screenOrientation) return undefined;

        const handleOrientationChange = () => setOrientation(getOrientation(loggingEnabled));

        screenOrientation.addEventListener("change", handleOrientationChange);
        return () => screenOrientation.removeEventListener("change", handleOrientationChange);
    }, [loggingEnabled]);

    useEffect(() => {
        const handleConnectivityChange = () => setIsOnline(logField(loggingEnabled, "isOnline", navigator.onLine));

        window.addEventListener("online", handleConnectivityChange);
        window.addEventListener("offline", handleConnectivityChange);
        return () => {
            window.removeEventListener("online", handleConnectivityChange);
            window.removeEventListener("offline", handleConnectivityChange);
        };
    }, [loggingEnabled]);

    useEffect(() => {
        const connectionApi = navigator.connection;
        if (!connectionApi) return undefined;

        const handleConnectionChange = () => setConnection(getConnectionSnapshot(loggingEnabled));

        connectionApi.addEventListener("change", handleConnectionChange);
        return () => connectionApi.removeEventListener("change", handleConnectionChange);
    }, [loggingEnabled]);

    useEffect(() => {
        readStorageEstimate();
    }, []);

    return {
        ...staticInfo,
        ...localeInfo,
        devicePixelRatio,
        orientation,
        isOnline,
        connection,
        ...mediaPreferences,
        ...storageEstimate,
        refreshStorageEstimate: readStorageEstimate,
    };
};

export { useEnvironmentInfo };
