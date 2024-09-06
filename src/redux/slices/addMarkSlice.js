import { addMark } from "../../api/create";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {};

export const fetchAddMark = createAsyncThunk(
    "addMark/fetchAddMark",
    async (data, { dispatch }) => {
        const response = await addMark(data);
        dispatch(putUser(response));
        return response;
    }
);

export const addMarkSlice = createSlice({
    name: "addMark",
    initialState,
    reducers: {
        putUser: (state, action) => {
            state = action.payload;
            return state;
        },
    },

});
export default addMarkSlice.reducer;

export const { putUser } = addMarkSlice.actions;