import Axios, { Method } from "axios";
import { Config } from "../../config/Config";
import storageService from "./storage.service";

export class BaseService {
    protected API_URL = Config.getConfig().apiUrl;

    constructor() {
        Axios.defaults.withCredentials = true;
        this.interceptToken(() => {
            storageService.clearUserData()
            window.location.reload()
        })
    }

    private interceptToken(logout: any) {
        Axios.interceptors.response.use(
            (res) => res,
            (error) => {
                if (
                    error.config &&
                    error.response?.status === 401 &&
                    error.response?.data?.message === "token_expired" &&
                    !error.config.__isRetry
                ) {
                    return new Promise((resolve, reject) => {
                        this.refreshToken(error.config, logout)
                            .then((result) => {
                                resolve(result);
                            })
                            .catch((err) => {
                                reject(err);
                            });
                    });
                }
                return Promise.reject(error);
            });
    }

    private refreshToken(config: any, logout: any) {
        return new Promise((resolve, reject) => {
            this.refresh()
                .then((res: any) => {
                    Axios
                        .request(config)
                        .then((result) => {
                            return resolve(result);
                        })
                        .catch((err) => {
                            console.log(err);
                            return reject(err);
                        });
                })
                .catch((err) => {
                    console.log(err);
                    logout();
                });
        });
    };

    private async refresh(){
        return this.httpClient("auth/refresh-token", 'POST')
    }


    protected async httpClient<T>(
        apiUrl: string,
        method: Method,
        body?: any,
        headers?: any,
        uploadReq?: boolean,
        uploadCallback?: any
    ) {
        let url = `${this.API_URL}${apiUrl}`
        if (method == "GET" && body && Object.keys(body).length > 0) {
            url += "?"
            Object.keys(body).forEach((key, i) => {
                if (body[key] && body[key] !== "") {
                    if (i === 0) {
                        url += `${key}=${body[key]}`
                    } else {
                        url += `&${key}=${body[key]}`
                    }
                }
            });
        }
        const options = {
            url,
            method: method,
            data: body || null,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
                ...headers
            },
            onUploadProgress: uploadReq ? uploadCallback : null
        };

        return Axios.request<T>(options);
    }
}