import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

export interface DeviceAdjustState {
    isMobile: boolean;
}

const initialState: DeviceAdjustState = {
    isMobile: false,
};

export const deviceAdjustSlice = createSlice({
    name: 'deviceAdjust',
    initialState,
    reducers: {
        setIsMobile: (state, action: PayloadAction<boolean>) => {
            state.isMobile = action.payload;
        },
    },
});

export const { setIsMobile } = deviceAdjustSlice.actions;

export const selectIsMobile = (state: RootState) => state.deviceAdjust.isMobile;

export default deviceAdjustSlice.reducer;


