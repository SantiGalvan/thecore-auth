import { useEffect, useMemo, useState } from "react";

const logField = (name, value) => {
    console.log(`[useEnvironmentInfo] ${name}:`, value);
    return value;
};

const hasFeature = (name) => Boolean(navigator[name]);

const getCapabilities = () =>
    logField("capabilities", {
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

const getStaticEnvironmentInfo = () => ({
    hardwareConcurrency: logField("hardwareConcurrency", navigator.hardwareConcurrency),
    deviceMemory: logField("deviceMemory", navigator.deviceMemory),
    maxTouchPoints: logField("maxTouchPoints", navigator.maxTouchPoints),
    cookieEnabled: logField("cookieEnabled", navigator.cookieEnabled),
    screen: logField("screen", {
        width: window.screen.width,
        height: window.screen.height,
        availWidth: window.screen.availWidth,
        availHeight: window.screen.availHeight,
        colorDepth: window.screen.colorDepth,
    }),
    userAgentData: logField(
        "userAgentData",
        navigator.userAgentData
            ? {
                  platform: navigator.userAgentData.platform,
                  mobile: navigator.userAgentData.mobile,
                  brands: navigator.userAgentData.brands,
              }
            : undefined
    ),
    capabilities: getCapabilities(),
});

const getLocaleInfo = () => {
    const language = navigator.language;
    const languages = navigator.languages;
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const { numberingSystem, calendar } = language
        ? new Intl.Locale(language).maximize()
        : {};

    return {
        language: logField("language", language),
        languages: logField("languages", languages),
        timeZone: logField("timeZone", timeZone),
        locale: logField("locale", { numberingSystem, calendar }),
    };
};

const getOrientation = () => {
    const orientation = window.screen.orientation;
    return logField("orientation", {
        type: orientation?.type,
        angle: orientation?.angle,
    });
};

const getConnectionSnapshot = () => {
    const connection = navigator.connection;
    return logField(
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

const readMediaQuery = (field, query) => {
    if (typeof window.matchMedia !== "function") return undefined;
    return logField(field, window.matchMedia(query).matches);
};

const useMediaQueryPreference = (field, query) => {
    const [value, setValue] = useState(() => readMediaQuery(field, query));

    useEffect(() => {
        if (typeof window.matchMedia !== "function") return undefined;

        const mediaQueryList = window.matchMedia(query);
        const handleChange = (event) => setValue(logField(field, event.matches));

        mediaQueryList.addEventListener("change", handleChange);
        return () => mediaQueryList.removeEventListener("change", handleChange);
    }, [field, query]);

    return value;
};

const useEnvironmentInfo = () => {
    const staticInfo = useMemo(() => getStaticEnvironmentInfo(), []);
    const [localeInfo, setLocaleInfo] = useState(getLocaleInfo);
    const [devicePixelRatio, setDevicePixelRatio] = useState(() => logField("devicePixelRatio", window.devicePixelRatio));
    const [orientation, setOrientation] = useState(getOrientation);
    const [isOnline, setIsOnline] = useState(() => logField("isOnline", navigator.onLine));
    const [connection, setConnection] = useState(getConnectionSnapshot);
    const [storageEstimate, setStorageEstimate] = useState({ storageUsage: undefined, storageQuota: undefined });

    const mediaPreferences = {
        prefersColorSchemeDark: useMediaQueryPreference("prefersColorSchemeDark", MEDIA_QUERY_FIELDS.prefersColorSchemeDark),
        prefersReducedMotion: useMediaQueryPreference("prefersReducedMotion", MEDIA_QUERY_FIELDS.prefersReducedMotion),
        prefersContrastMore: useMediaQueryPreference("prefersContrastMore", MEDIA_QUERY_FIELDS.prefersContrastMore),
        forcedColorsActive: useMediaQueryPreference("forcedColorsActive", MEDIA_QUERY_FIELDS.forcedColorsActive),
        prefersReducedData: useMediaQueryPreference("prefersReducedData", MEDIA_QUERY_FIELDS.prefersReducedData),
        isStandalonePwa: useMediaQueryPreference("isStandalonePwa", MEDIA_QUERY_FIELDS.isStandalonePwa),
    };

    const readStorageEstimate = async () => {
        if (!navigator.storage?.estimate) return;

        const { usage, quota } = await navigator.storage.estimate();
        setStorageEstimate({
            storageUsage: logField("storageUsage", usage),
            storageQuota: logField("storageQuota", quota),
        });
    };

    useEffect(() => {
        const handleLanguageChange = () => setLocaleInfo(getLocaleInfo());

        window.addEventListener("languagechange", handleLanguageChange);
        return () => window.removeEventListener("languagechange", handleLanguageChange);
    }, []);

    useEffect(() => {
        const handleResize = () => setDevicePixelRatio(logField("devicePixelRatio", window.devicePixelRatio));

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const screenOrientation = window.screen.orientation;
        if (!screenOrientation) return undefined;

        const handleOrientationChange = () => setOrientation(getOrientation());

        screenOrientation.addEventListener("change", handleOrientationChange);
        return () => screenOrientation.removeEventListener("change", handleOrientationChange);
    }, []);

    useEffect(() => {
        const handleConnectivityChange = () => setIsOnline(logField("isOnline", navigator.onLine));

        window.addEventListener("online", handleConnectivityChange);
        window.addEventListener("offline", handleConnectivityChange);
        return () => {
            window.removeEventListener("online", handleConnectivityChange);
            window.removeEventListener("offline", handleConnectivityChange);
        };
    }, []);

    useEffect(() => {
        const connectionApi = navigator.connection;
        if (!connectionApi) return undefined;

        const handleConnectionChange = () => setConnection(getConnectionSnapshot());

        connectionApi.addEventListener("change", handleConnectionChange);
        return () => connectionApi.removeEventListener("change", handleConnectionChange);
    }, []);

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
