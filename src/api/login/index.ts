import { Post } from "../request";
import { LoginParams, LoginResponse } from "./type";

export const loginApi = (data:LoginParams) => {
    return Post<LoginResponse>("/auth/login", data);
};