export class Response<T> {
    data?: T;
    success?: boolean;
    status?: number
    message?: string;
}