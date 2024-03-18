import { Get } from "../request";

export const getInteractionByUserId = (userId: string) => {
    return Get< number >(`/interaction/user/${userId}`);
}

export const getInteractionCountByUserId  = (userId: string) => {
    return Get<number>(`/interaction/count/user/${userId}`);
}