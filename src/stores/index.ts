import { configureStore, Action, ThunkAction } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import deviceAdjustReducer from "./slices/deviceAdjustSlice";
import userInfoReducer from "./slices/userInfoSlice";

const store = configureStore({
    reducer: {
        counter: counterReducer,
        deviceAdjust: deviceAdjustReducer,
        userInfo: userInfoReducer,
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