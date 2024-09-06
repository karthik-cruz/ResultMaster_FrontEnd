import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { loginUserSlice } from "./slices/loginUserSlice";
import { forgotPasswordSlice } from "./slices/forgotPasswordSlice";
import { verifyOtpSlice } from "./slices/verifyOtpSlice";
import { resetPasswordSlice } from "./slices/resetPasswordSlice";
import toggleReducer from './slices/darkModeSlice';
import { addStudentSlice } from "./slices/addStudentSlice";
import { uploadStudentsSlice } from "./slices/uploadStudentsSlice";
import { addMarkSlice } from "./slices/addMarkSlice";
import { getStudentsSlice } from "./slices/getStudentsSlice";
import { getAllStudentsSlice } from "./slices/getAllStudentsSlice";
import { updateUserSlice } from "./slices/updateUserSlice";
import { updateUserMarksSlice } from "./slices/updateUserMarksSlice";
import { uploadMarksSlice } from "./slices/uploadMarksSlice";

// Configure persist
const persistConfig = {
    key: "root",
    storage,
    version: 1,
};

// Combine all reducers
const reducer = combineReducers({
    loginUser: loginUserSlice.reducer,
    forgotPassword: forgotPasswordSlice.reducer,
    verifyOtp: verifyOtpSlice.reducer,
    resetPassword: resetPasswordSlice.reducer,
    toggle: toggleReducer,
    addStudent: addStudentSlice.reducer,
    uploadStudents: uploadStudentsSlice.reducer,
    addMark: addMarkSlice.reducer,
    getStudents: getStudentsSlice.reducer,
    getAllStudents: getAllStudentsSlice.reducer,
    updateUser: updateUserSlice.reducer,
    updateUserMarks: updateUserMarksSlice.reducer,
    uploadMarks: uploadMarksSlice.reducer
});

// Persist the combined reducers
const persistedReducer = persistReducer(persistConfig, reducer);

// Configure the store
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
            },
        }),
});

// Create the persistor
export const persistor = persistStore(store);

export default store;
