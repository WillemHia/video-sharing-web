import { Get, Post } from "../request";
import { UploadVideoResponse, CreateViodeParams, VideoInteraction, VideoDetail, VideoInfo } from "./type";
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

export const getVideoDetailById = (videoId: number) => {
    return Get<VideoDetail>(`/video/${videoId}`);
}

export const searchVideo = (keyword: string) => {
    return Get<VideoInfo[]>(`/video/search/${keyword}`);
}

export const getRandowVideo = ()=>{
    return Get<VideoInteraction[]>('/video/recommend/random')
}

export const getRandowVideoByUserId = ()=>{
    return Get<VideoInteraction[]>('/video/recommend/random/user')
}

export const getRecommendVideoByUserId = ()=>{
    return Get<VideoInteraction[]>('/video/recommend/user')
}

export const getRecommendVideoByVideoId = (videoId: number)=>{
    return Get<VideoInteraction[]>(`/video/recommend/video/${videoId}`)
}