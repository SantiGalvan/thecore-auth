import { useLayoutEffect } from "react";
import { matchPath, useLocation } from "react-router-dom";

const UsePageTitle = (routes = [], defaultTitle = "SPOT") => {
    const location = useLocation();

    useLayoutEffect(() => {
        let matchedTitle = defaultTitle;

        for (const route of routes) {
            // matchPath gestisce anche route dinamiche come /dashboard/:id
            if (matchPath({ path: route.path, end: true }, location.pathname)) {
                matchedTitle = route.title;
                break;
            }
        }

        document.title = matchedTitle;
    }, [location, routes, defaultTitle]);

}

export default UsePageTitle;