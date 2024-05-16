import { Delete, Get, Post } from "../request";
import { NormalResponse } from "../type";
import { SearchHistory } from "./type";

export const getSearchHistoryByUserId = (userId: number) => {
    return Get<SearchHistory[]>(`/search-history/${userId}`)
};

export const deleteById = (id: number) => {
    return Delete<NormalResponse>(`/search-history/${id}`)
}

export const deleteAll = (userId: number) => {
    return Delete<NormalResponse>(`/search-history/all/${userId}`)
}

export const createSearchHistory = (userId: number, content: string) => {
    return Post<NormalResponse>("/search-history", { userId, content })
}