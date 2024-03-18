import { Get } from "../request";

export const getCollectByUserId = (userId: string) => {
    return Get< number >(`/collect/user/${userId}`);
}