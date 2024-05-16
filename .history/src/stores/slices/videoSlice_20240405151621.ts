import { getVideoDetailById } from "@/api/video";
import { VideoDetail, VideoInteraction } from "@/api/video/type";
import { Dispatch, PayloadAction, createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";


export interface VideoState {
    videoDetailList: VideoDetail[];
    videoList: VideoInteraction[]
}

const initialState: VideoState = {
    videoDetailList: [],
    videoList: [],
};

const getVideoDetailByVideoId = createAsyncThunk(
    'video/getVideoDetailByVideoId',
    async (videoId: number) => {
        return await getVideoDetailById(videoId)
    }
)

export const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        setVideoList(state, action: PayloadAction<VideoInteraction[]>) {
            console.log(action.payload)
            state.videoList = [...state.videoList, ...action.payload];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getVideoDetailByVideoId.fulfilled, (state, action) => {
            state.videoDetailList.push(action.payload)
        })
    }
});

export const setVideoDetailList = (videoId: number) => (dispatch: Dispatch<any>, getState: () => RootState) => {
    const { video } = getState();
    const videoDetail = video.videoDetailList.find((item) => item.id === videoId);
    if (!videoDetail) {
        dispatch(getVideoDetailByVideoId(videoId));
    }
};

export const selectCurrentVideoDetail = (videoId: number) =>
    createSelector(
        (state: RootState) => state.video.videoDetailList,
        (videoDetailList) =>
        videoDetailList.find((videoDetail) => videoDetail.id === videoId)
);

export const selectVideoList = (state: RootState) => state.video.videoList;
export const { setVideoList } = videoSlice.actions;

export default videoSlice.reducer;