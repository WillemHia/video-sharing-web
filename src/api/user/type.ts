export interface UserInfo {
    id: number;
    username: string;
    phoneNumber: string;
    email: string;
    introduce: string;
    avatar: string;
    sex: number;
    school: string;
    address: string;
    age: number;
    userId: string;
    backgroundImg: string;
}

export interface CreateUserParams {
    phoneNumber: string;
    password: string;
}

export interface UpdateUserAvatarResponse {
    avatar: string;
}

export interface UpdateUserBackgroundResponse {
    backgroundImg: string;
}