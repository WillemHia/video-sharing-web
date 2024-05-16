import { Get, Post, Put } from "../request";
import { NormalResponse } from "../type";

export const getCollectByUserId = (userId: string) => {
    return Get< number >(`/collect/user/${userId}`);
}

export const getCollectByVideoId = (videoId: number) => {
    return Get< number >(`/collect/video/${videoId}`);
}

export const getIsCollect = (userId: number, videoId: number) => {
    return Get< boolean >(`/collect/${userId}/${videoId}`);
}

export const createCollect = (videoId:number)=>{
    return Post<NormalResponse> (`/collect`,{videoId});
}

export const updateCollect = (videoId:number)=>{
    return Put<NormalResponse> (`/collect`,{videoId});
}