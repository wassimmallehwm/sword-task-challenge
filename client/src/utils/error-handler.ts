import { AxiosError } from "axios";

interface HttpError {
    message?: any;
    status?: number;
} 

const isAxiosError = (error: any): error is AxiosError<any, any> => {
    return (error as AxiosError<any, any>).isAxiosError !== undefined;
}

const httpErrorHandler = (e: any): HttpError => {
    let error: HttpError = {}; 
    if (isAxiosError(e)) {
        error = {
            status: e.response?.status || 500,
            message: e.response?.data?.message || 'Server error'
        }
    } else {
        error = {
            status: e.response?.status || 500,
            message: e.response?.data?.message || 'Unknowen error'
        }
    }
    return error;
}

export default httpErrorHandler;