import axios from "axios";

let instance;

const fetchConfig = async () => {
    try {
        const res = await fetch('/config.json');
        const data = await res.json();
        const baseURL = data.baseUri;

        instance = axios.create({
            baseURL,
            timeout: 3000,
        });

        instance.interceptors.request.use(
            (config) => {
                return config;
            }
        );

        instance.interceptors.response.use(
            response => response,
            (error) => {
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem('accessToken');
                }

                return Promise.reject(error);
            }
        );

        return instance;

    } catch (err) {
        console.error(err);
    }
};


export {fetchConfig};