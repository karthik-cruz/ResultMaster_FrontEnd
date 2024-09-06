
import { createSlice } from '@reduxjs/toolkit';

const toggleSlice = createSlice({
    name: 'toggle',
    initialState: {
        isChecked: false, // Assuming the toggle is initially checked
    },
    reducers: {
        toggleSwitch: (state) => {
            state.isChecked = !state.isChecked;
        },
    },
});

export const { toggleSwitch } = toggleSlice.actions;
export default toggleSlice.reducer;
