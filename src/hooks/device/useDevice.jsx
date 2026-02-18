import { useMemo } from "react";
import { UAParser } from "ua-parser-js";

let cachedDevice = null;

const getDevice = () => {
  if (cachedDevice) return cachedDevice;

  const parser = new UAParser();
  const result = parser.getResult();
  const { device, os, browser } = result;

  // Riconoscimento iPad anche se Safari lo maschera da desktop
  const isIPad =
    device.model === "iPad" ||
    (/iPad/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && "ontouchend" in document));

  cachedDevice = {
    type: device.type || (isIPad ? "tablet" : "desktop"),
    os: os.name,
    browser: browser.name,
    vendor: device.vendor || null,
    model: device.model || (isIPad ? "iPad" : null),
    isMobile: device.type === "mobile",
    isTablet: device.type === "tablet" || isIPad,
    isDesktop: !device.type && !isIPad,
    isIPhone: device.model === "iPhone",
    isIPad: isIPad,
    isAndroid: os.name === "Android",
  };

  return cachedDevice;
};

const useDevice = () => useMemo(() => getDevice(), []);

export { useDevice}
