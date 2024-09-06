import { uploadStudents } from "../../api/create";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],       // To store the users added from the file
    loading: false,  // For tracking loading state
    success: false,  // To track the success of the operation
    error: null,     // To track errors
};

export const fetchUploadStudents = createAsyncThunk(
    "uploadStudents/fetchUploadStudents",
    async (data, { rejectWithValue }) => {
        try {
            const response = await uploadStudents(data);
            return response;  // Returning the data which will be available in fulfilled case
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Something went wrong');  // Handling errors
        }
    }
);

export const uploadStudentsSlice = createSlice({
    name: "uploadStudents",
    initialState,
    reducers: {
        // Reducer to handle any additional logic like putting users directly
        putUsers: (state, action) => {
            state.users = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUploadStudents.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(fetchUploadStudents.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.users = action.payload;
            })
            .addCase(fetchUploadStudents.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            });
    },
});

export default uploadStudentsSlice.reducer;

export const { putUsers } = uploadStudentsSlice.actions;
