import { HttpRequest, HttpResponse } from "@shared/types";
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

    private async refresh() {
        return this.httpClient({
            apiUrl: "auth/refresh-token",
            method: "POST"
        })
    }

    private createParams = (params: any[]) => {
        return params.join('/')
    }

    private createQuery = (query: any) => {
        let url = ""
        if (Object.keys(query).length > 0) {
            Object.keys(query).forEach((key, i) => {
                if (query[key] != undefined && query[key].toString().length > 0) {
                    if (url === "") {
                        url += `?${key}=${query[key]}`
                    } else {
                        url += `&${key}=${query[key]}`
                    }
                }
            });
        }
        return url;
    }


    protected async httpClient<T>({
        apiUrl,
        method,
        body,
        params,
        query,
        headers,
    }: HttpRequest): Promise<HttpResponse<T>> {
        let url = `${this.API_URL}${apiUrl}`
        if (params && params.length > 0) {
            url += this.createParams(params)
        }
        if (query && Object.keys(query).length > 0) {
            url += this.createQuery(query)
        }
        const options = {
            url,
            method: method,
            data: body || null,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
                ...headers
            }
        };

        try {
            const request_start_at = performance.now();
            const {data} = await Axios.request<T>(options);
            const request_end_at = performance.now();
            const request_duration = request_end_at - request_start_at;
            console.log("Request perf : ", request_duration)
            return {
                success: true,
                response: data,
                error: null
            }
        } catch (error: any) {
            console.error(error)
            let errorMessage = error.response?.data || 'Server error';
            if (typeof error.response?.data !== 'string') {
                errorMessage = 'Server error';
            }
            if (!navigator.onLine) {
                errorMessage = "Check your internet connection"
            }
            return {
                success: false,
                response: null,
                error: {
                    status: error.response?.status || 500,
                    message: errorMessage
                }
            }
        }
    }
}