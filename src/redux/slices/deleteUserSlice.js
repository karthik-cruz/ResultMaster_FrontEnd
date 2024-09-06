import { deleteUser } from "../../api/delete";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {};

export const fetchDeleteUser = createAsyncThunk(
    "deleteUser/fetchDeleteUser",
    async (data, { dispatch }) => {
        const response = await deleteUser(data);
        dispatch(removeUser(response));
        return response;
    }
);

export const deleteUserSlice = createSlice({
    name: "deleteUser",
    initialState,
    reducers: {
        removeUser: (state, action) => {
            state = action.payload;
            return state;
        },
    },

});
export default deleteUserSlice.reducer;

export const { removeUser } = deleteUserSlice.actions;