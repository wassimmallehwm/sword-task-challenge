export class ErrorData {
    status?: number;
    message?: string;
    tryAgain?: any;

    constructor(json?: {
        status: number,
        message: string,
        tryAgain?: any
    }) {
        this.status = json?.status!;
        this.message = json?.message!;
        this.tryAgain = json?.tryAgain!;
    }
}
