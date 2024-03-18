import { Get } from "../request";

export const getFansCount = (userId: string) => {
    return Get< number >(`/follow-relationship/fans/${userId}`);
}

export const getFollowingsCount = (userId: string) => {
    return Get< number >(`/follow-relationship/followings/${userId}`);
}