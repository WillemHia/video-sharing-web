import { Post } from "../request";
import { NormalResponse } from "../type";
import { CreateWatchHistoryParams } from "./type";

export const createWatchHistory = (data: CreateWatchHistoryParams) => {
    return Post<NormalResponse>("/watch-history", data);
}