import { updateUserMarks } from "../../api/update";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {};

export const fetchUpdateUserMarks = createAsyncThunk(
    "updateMarks/fetchUpdateUserMarks",
    async (data, { dispatch }) => {
        const response = await updateUserMarks(data?.params, data?.data);
        dispatch(putUser(response));
        return response;
    }
);

export const updateUserMarksSlice = createSlice({
    name: "updateMarks",
    initialState,
    reducers: {
        putUser: (state, action) => {
            state = action.payload;
            return state;
        },
    },

});
export default updateUserMarksSlice.reducer;

export const { putUser } = updateUserMarksSlice.actions;