import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

export interface DeviceAdjustState {
    isMobile: boolean;
    isVideoFullScreen: boolean;
}

const initialState: DeviceAdjustState = {
    isMobile: false,
    isVideoFullScreen: false,
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
    },
});

export const { setIsMobile, setIsVideoFullScreen } = deviceAdjustSlice.actions;

export const selectIsMobile = (state: RootState) => state.deviceAdjust.isMobile;
export const selectIsVideoFullScreen = (state: RootState) => state.deviceAdjust.isVideoFullScreen;

export default deviceAdjustSlice.reducer;


