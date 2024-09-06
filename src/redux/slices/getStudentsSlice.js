import { getStudents } from "../../api/read";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {};

export const fetchGetStudents = createAsyncThunk(
    "getStudents/fetchGetStudents",
    async (data, { dispatch }) => {
        const response = await getStudents(data);
        dispatch(getUsers(response));
        return response;
    }
);

export const getStudentsSlice = createSlice({
    name: "getStudents",
    initialState,
    reducers: {
        getUsers: (state, action) => {
            state = action.payload;
            return state;
        },
    },

});
export default getStudentsSlice.reducer;

export const { getUsers } = getStudentsSlice.actions;