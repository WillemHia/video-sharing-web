import { Get, Post } from "../request";
import { NormalResponse } from "../type";
import { CommentDetail, CreateCommentDto } from "./type";

export const getCommentByVideoId = (videoId: number) => {
    return Get<number>(`/comment/video/${videoId}`);
}

export const getAllCommentByVideoId = (videoId: number) => {
    return Get<CommentDetail[]>(`/comment/${videoId}`);
}

export const createCommnet = (data: CreateCommentDto) => {
    return Post<NormalResponse>('/comment', data);
}