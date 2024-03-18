import { Get, Post, Put } from "../request";
import { UserInfo, CreateUserParams, UpdateUserAvatarResponse, UpdateUserBackgroundResponse } from "./type";
import { NormalResponse } from "../type";

export const getUserInfo = (id: string) => {
    return Get<UserInfo>(`/user/${id}`);
};

export const createUser = (data: CreateUserParams) =>{
    return Post<UserInfo>("/user", data);
}

export const updateUserAvatar = (data: FormData) => {
    return Post<UpdateUserAvatarResponse>("/upload/avatar", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

export const updateUserBackground = (data: FormData) => {
    return Post<UpdateUserBackgroundResponse>("/upload/background", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

export const updateUser = (data: UserInfo) => {
    return Put<NormalResponse>("/user", data);
}
