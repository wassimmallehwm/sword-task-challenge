import { useEffect, useState } from 'react'
import { AxiosResponse, AxiosError } from "axios";

interface HttpError {
    data?: any;
    status?: number;
}

function isAxiosError(error: any): error is AxiosError {
    return (error as AxiosError).isAxiosError !== undefined;
}

const useHttpClient = (httpPromise: Promise<AxiosResponse<unknown, any>>) => {

    const [response, setResponse] = useState<any>(null);
    const [error, setError] = useState<HttpError>();
    const apiUrl: string = process.env.REACT_APP_API_URL!;

    useEffect(() => {
        (async () => {
            try {
                const response: AxiosResponse = await httpPromise;
                setResponse(response.data)
            } catch (e: any) {
                if (isAxiosError(e)) {
                    setError({
                        status: e.response?.status || 500,
                        data: e.response?.data || 'Server error'
                    })
                } else {
                    setError({
                        status: e.response?.status || 500,
                        data: e.response?.data || 'Unknowen error'
                    })
                }
            }
        })();
    }, [httpPromise])

    return { response, error };
}

export default useHttpClient
