import { Method } from "axios";

export type HttpRequest = {
    apiUrl: string,
    method: Method,
    body?: any,
    params?: any[],
    query?: any,
    headers?: any
}