import { configureStore, Action, ThunkAction } from "@reduxjs/toolkit";
import deviceAdjustReducer from "./slices/deviceAdjustSlice";
import userInfoReducer from "./slices/userInfoSlice";
import videoReduceer from "./slices/videoSlice";

const store = configureStore({
    reducer: {
        deviceAdjust: deviceAdjustReducer,
        userInfo: userInfoReducer,
        video: videoReduceer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

export default store;