import { loginUser } from "../../api/create";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {};

export const fetchUserLogin = createAsyncThunk(
    "loginUser/fetchUserLogin",
    async (data, { dispatch }) => {
        const response = await loginUser(data);
        dispatch(getUser(response));
        return response;
    }
);

export const loginUserSlice = createSlice({
    name: "loginUser",
    initialState,
    reducers: {
        getUser: (state, action) => {
            state = action.payload;
            return state;
        },
    },

});
export default loginUserSlice.reducer;

export const { getUser } = loginUserSlice.actions;