import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const request = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 60000,
});

request.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        config.headers["Authorization"] = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

request.interceptors.response.use(
    (response:AxiosResponse) => {
        const token:string = response.headers["token"];
        if (token) {
            localStorage.setItem("token", token.split(" ")[1]);
        }
        return response.data;
    },
    (error) => {
        if (error.response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("userInfo");
            window.location.href = `${window.innerWidth > 768 ? '/login':'/mobile-login'}`;
        }
        if (error.response.status === 500) {
            console.log("服务器错误");
        }
        return Promise.reject(error);
    }
);

export const Get = <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return request.get(url, config);
};

export const Post = <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return request.post(url, data, config);
};

export const Put = <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return request.put(url, data, config);
};

export const Delete = <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return request.delete(url, config);
};

export default request;