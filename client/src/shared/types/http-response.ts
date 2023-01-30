import { HttpError } from "./http-error"

export type HttpResponse<T> = {
    success: boolean
    response: T | null,
    error: HttpError | null
}