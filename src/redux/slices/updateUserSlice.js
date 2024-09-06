import { updateUser } from "../../api/update";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {};

export const fetchUpdateUser = createAsyncThunk(
    "updateUser/fetchUpdateUser",
    async (data, { dispatch }) => {
        const response = await updateUser(data?.params, data?.data);
        dispatch(putUser(response));
        return response;
    }
);

export const updateUserSlice = createSlice({
    name: "updateUser",
    initialState,
    reducers: {
        putUser: (state, action) => {
            state = action.payload;
            return state;
        },
    },

});
export default updateUserSlice.reducer;

export const { putUser } = updateUserSlice.actions;