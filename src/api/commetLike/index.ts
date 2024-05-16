import { Delete, Get, Post } from "../request";
import { NormalResponse } from "../type";
import { CommentLike } from "./type";

export const createCommentLike = (commentId: number) => {
    return Post<NormalResponse>('/comment-like', { commentId });
};

export const deleteCommentLike = (commentId: number) => {
    return Delete<NormalResponse>(`/comment-like/${commentId}`);
};

export const getCommnetLikeByVideoIdAndUserId = (videoId: number) => {
    return Get<CommentLike[]>(`/comment-like/user/video/${videoId}`);
}