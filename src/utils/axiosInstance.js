import axios from "axios";

let instance;

const fetchAxiosConfig = async (show, type, message) => {
    if (instance) return instance;

    try {
        const res = await fetch('/config.json');
        const data = await res.json();
        const baseURL = data.baseUri;
        const { unauthorized, notFound, defaultMessage } = data.axiosErrors;
        const timeout = data.axiosTimeout;

        instance = axios.create({
            baseURL,
            timeout
        });

        instance.interceptors.request.use(
            (config) => {
                return config;
            }
        );

        instance.interceptors.response.use(
            response => response,
            (error) => {

                if (error.response) {

                    show(true);
                    type('danger');

                    switch (error.response.status) {
                        case 401:
                            localStorage.removeItem('accessToken');
                            message(unauthorized);
                            break;
                        case 404:
                            message(notFound);
                            break;
                        default:
                            message(`${defaultMessage} ${error.response.status || ''} ${error.response.data.error || ''}`);
                    }

                }
                return Promise.reject(error);
            }
        );

        return instance;

    } catch (err) {
        console.error(err);
    }
};


export { fetchAxiosConfig };