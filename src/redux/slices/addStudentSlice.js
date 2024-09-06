import { addStudent } from "../../api/create";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {};

export const fetchAddStudent = createAsyncThunk(
    "addStudent/fetchAddStudent",
    async (data, { dispatch }) => {
        const response = await addStudent(data);
        dispatch(putUser(response));
        return response;
    }
);

export const addStudentSlice = createSlice({
    name: "addStudent",
    initialState,
    reducers: {
        putUser: (state, action) => {
            state = action.payload;
            return state;
        },
    },

});
export default addStudentSlice.reducer;

export const { putUser } = addStudentSlice.actions;