import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { UserInfo } from "@/api/user/type";

export interface UserInfoState {
    userInfo: UserInfo | null;
}

const initialState: UserInfoState = {
    userInfo: JSON.parse(localStorage.getItem('userInfo') || 'null'),
};

export const userInfoSlice = createSlice({
    name: "userInfo",
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<UserInfo | null>) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo',JSON.stringify(action.payload))
        },
    },
});

export const { setUserInfo } = userInfoSlice.actions;

export const selectUserInfo = (state: RootState) => state.userInfo.userInfo;

export default userInfoSlice.reducer;
