import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

export interface DeviceAdjustState {
    isMobile: boolean;
    isVideoFullScreen: boolean;
    isLayoutRouteTop: boolean;
}

const initialState: DeviceAdjustState = {
    isMobile: false,
    isVideoFullScreen: false,
    isLayoutRouteTop: false,
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
        setIsLayoutRouteTop: (state, action: PayloadAction<boolean>) => {
            state.isLayoutRouteTop = action.payload;
        }
    },
});

export const { setIsMobile, setIsVideoFullScreen,setIsLayoutRouteTop } = deviceAdjustSlice.actions;

export const selectIsMobile = (state: RootState) => state.deviceAdjust.isMobile;
export const selectIsVideoFullScreen = (state: RootState) => state.deviceAdjust.isVideoFullScreen;
export const selectIsLayoutRouteTop = (state: RootState) => state.deviceAdjust.isLayoutRouteTop;

export default deviceAdjustSlice.reducer;


