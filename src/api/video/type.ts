import { Interaction } from "../Interaction/type";

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
    interaction: Interaction[];
}