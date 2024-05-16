import { NormalResponse } from './../type';
import { Get, Put } from "../request";

export const getInteractionByUserId = (userId: string) => {
    return Get< number >(`/interaction/user/${userId}`);
}

export const getInteractionCountByUserId  = (userId: string) => {
    return Get<number>(`/interaction/count/user/${userId}`);
}

export const getInteractionByVideoId = (videoId: number) => {
    return Get< number >(`/interaction/video/${videoId}`);
}

export const getIsInteraction = (userId: number, videoId: number) => {
    return Get< number >(`/interaction/${userId}/${videoId}`);
}

export const updateInteractionType = (videoId:number,interactionType:number)=>{
    return Put<NormalResponse>(`/interaction`,{videoId,interactionType});
}