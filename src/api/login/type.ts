export interface LoginParams {
    phoneNumber: string;
    password: string;
}

export interface LoginResponse {
    code: number,
    message?: string,
    token?: string;
}