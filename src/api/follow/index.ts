import { Get, Post, Put } from "../request";
import { NormalResponse } from "../type";
import { FollowRelationship } from "./type";

export const getFansCount = (userId: string) => {
    return Get< number >(`/follow-relationship/fans/${userId}`);
}

export const getFollowingsCount = (userId: string) => {
    return Get< number >(`/follow-relationship/followings/${userId}`);
}

export const getIsFollow = (userId: number, videoId: number) => {
    return Get< boolean >(`/follow-relationship/${userId}/${videoId}`);
}

export const createFollow = (followedId:number)=>{
    return Post<NormalResponse> ('/follow-relationship/follow',{followedId})
}

export const updateFollow = (followedId:number)=>{
    return Put<NormalResponse> ('/follow-relationship/unfollow',{followedId})
}

export const getFollowRelationship = (followId: string) => {
    return Get< FollowRelationship >(`/follow-relationship/${followId}`);
}