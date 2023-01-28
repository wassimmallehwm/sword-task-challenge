export interface Page<T> {
    limit: number
    page: number
    pages: number
    total: number
    docs: T[]
}