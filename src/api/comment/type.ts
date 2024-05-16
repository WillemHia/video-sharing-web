import { UserInfo } from "../user/type";

export interface CommentDetail {
    id: number;
    content: string;
    videoId: number;
    userId: number;
    replyUserId: number;
    parentId: number | null;
    user: UserInfo;
    replyUser?: UserInfo;
    commentCount: number;
    createTime: string;
    childComment?: CommentDetail[];
}

export interface CreateCommentDto {
    content: string;
    videoId: number;
    replyUserId?: number;
    parentId?: number;
}