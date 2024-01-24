import { configureStore, Action, ThunkAction } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import deviceAdjustReducer from "./deviceAdjustSlice";

const store = configureStore({
    reducer: {
        counter: counterReducer,
        deviceAdjust: deviceAdjustReducer,
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