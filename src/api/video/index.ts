import { Get, Post } from "../request";
import { UploadVideoResponse, CreateViodeParams, Video, VideoInteraction } from "./type";
import { NormalResponse } from "../type";

export const uploadVideo = (data: FormData) => {
    return Post<UploadVideoResponse>("/upload/video", data,{
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

export const updateVideoPoster = (data: FormData) => {
    return Post< { poster: string} >("/upload/poster", data,{
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

export const createVideo = (data: CreateViodeParams) =>{
    return Post<NormalResponse>("/video", data);
}

export const getVideoByUserId = (userId: string) => {
    return Get<VideoInteraction[]>(`/video/userId/${userId}`);
}

export const getVideoByInteraction = (userId: string) => {
    return Get<VideoInteraction[]>(`/video/interaction/${userId}`);
}

export const getVideoByCollect = (userId: string) => {
    return Get<VideoInteraction[]>(`/video/collect/${userId}`);
}

export const getVideoCountByUserId = (userId: string) => {
    return Get<number>(`/video/count/${userId}`);
}