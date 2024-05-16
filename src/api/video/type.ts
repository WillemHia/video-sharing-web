import { Interaction } from "../Interaction/type";
import { UserInfo } from "../user/type";

export interface UploadVideoResponse {
    url: string;
    poster: string;
    totalTime: number;
}

export interface CreateViodeParams {
    url: string;
    poster: string;
    totalTime: number;
    introduce: string;
    labelNames: string[];
    userId: number;
}

export interface Video {
    id: number;
    url: string;
    poster: string;
    totalTime: number;
    introduce: string;
    label: string;
    userId: number;
}

export interface VideoInteraction extends Video {
    interactionCount: number;
}

export interface VideoDetail extends Video {
    user: UserInfo;
}

export interface VideoInfo extends VideoDetail {
    collectCount: number;
    interactionCount: number;
    commentCount: number;
}