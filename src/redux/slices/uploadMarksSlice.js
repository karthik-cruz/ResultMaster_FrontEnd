import { uploadMarks } from "../../api/create";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],       // To store the users added from the file
    loading: false,  // For tracking loading state
    success: false,  // To track the success of the operation
    error: null,     // To track errors
};

export const fetchUploadMarks = createAsyncThunk(
    "uploadMarks/fetchUploadMarks",
    async (data, { rejectWithValue }) => {
        try {
            const response = await uploadMarks(data);
            return response;  // Returning the data which will be available in fulfilled case
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Something went wrong');  // Handling errors
        }
    }
);

export const uploadMarksSlice = createSlice({
    name: "uploadMarks",
    initialState,
    reducers: {
        // Reducer to handle any additional logic like putting users directly
        putUsers: (state, action) => {
            state.users = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUploadMarks.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(fetchUploadMarks.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.users = action.payload;
            })
            .addCase(fetchUploadMarks.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            });
    },
});

export default uploadMarksSlice.reducer;

export const { putUsers } = uploadMarksSlice.actions;
