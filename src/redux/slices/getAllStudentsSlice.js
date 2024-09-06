import { getAllStudents } from "../../api/read";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    students: [], // Explicitly define an empty array for students
};

export const fetchGetAllStudents = createAsyncThunk(
    "getAllStudents/fetchGetStudents",
    async (data, { dispatch }) => {
        const response = await getAllStudents(data);
        dispatch(getAllUsers(response)); // Dispatch an action with the response data
        return response;
    }
);

export const getAllStudentsSlice = createSlice({
    name: "getAllStudents",
    initialState,
    reducers: {
        getAllUsers: (state, action) => {
            return {
                ...state,
                students: action.payload.students, // Ensure immutability by returning a new state object
            };
        },
    },
});

export default getAllStudentsSlice.reducer;

export const { getAllUsers } = getAllStudentsSlice.actions;
