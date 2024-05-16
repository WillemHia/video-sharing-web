import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { VideoInfo, VideoInteraction } from '@/api/video/type';


export interface DeviceAdjustState {
    isMobile: boolean;
    isVideoFullScreen: boolean;
    videoListArray: Array<VideoInteraction[] | VideoInfo[]>;
}

const initialState: DeviceAdjustState = {
    isMobile: false,
    isVideoFullScreen: false,
    videoListArray: [],
};

export const deviceAdjustSlice = createSlice({
    name: 'deviceAdjust',
    initialState,
    reducers: {
        setIsMobile: (state, action: PayloadAction<boolean>) => {
            state.isMobile = action.payload;
        },
        setIsVideoFullScreen: (state, action: PayloadAction<boolean>) => {
            state.isVideoFullScreen = action.payload;
        },
        setVideoListArray: (state, action: PayloadAction<VideoInteraction[] | VideoInfo[]>) => {
            const videoListArray = [...state.videoListArray, action.payload];
            state.videoListArray = videoListArray;
        },
        deleteVideoListArray: (state, action: PayloadAction<VideoInteraction[] | VideoInfo[]>) => {
            const videoListArray = state.videoListArray.filter((item) => JSON.stringify(item) !== JSON.stringify(action.payload));
            state.videoListArray = videoListArray;
        },
        resetVideoListArray: (state) => {
            state.videoListArray = [];
        },
    },
});

export const { setIsMobile, setIsVideoFullScreen,setVideoListArray, deleteVideoListArray, resetVideoListArray } = deviceAdjustSlice.actions;

export const selectIsMobile = (state: RootState) => state.deviceAdjust.isMobile;
export const selectIsVideoFullScreen = (state: RootState) => state.deviceAdjust.isVideoFullScreen;
export const selectVideoListArray = (state: RootState) => state.deviceAdjust.videoListArray;

export default deviceAdjustSlice.reducer;


