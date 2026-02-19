import axios from "axios";

let instance;

const fetchAxiosConfig = async (alert, onUnauthorized, onNotFound, onGenericError) => {
    if (instance) return instance;

    try {
        const res = await fetch('/config.json');
        const data = await res.json();
        const baseURL = data.baseUri;
        const { unauthorized, notFound, defaultMessage } = data.axiosErrors;

        instance = axios.create({
            baseURL
        });

        instance.interceptors.request.use(
            (config) => {
                const token = JSON.parse(localStorage.getItem("accessToken"));

                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                } else {
                    delete config.headers.Authorization;
                }

                return config;
            }
        );

        instance.interceptors.response.use(
            response => response,
            (error) => {

                if (error.response) {

                    switch (error.response.status) {
                        case 401:
                            localStorage.removeItem('accessToken');
                            alert?.('danger', unauthorized);
                            onUnauthorized?.();
                            break;
                        case 404:
                            alert?.('danger', notFound);
                            onNotFound?.(error);
                            break;
                        default:
                            alert?.('danger',`${defaultMessage} ${error.response.status || ''} ${error.response.data.error || ''}`);
                            onGenericError?.(error);
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