import { END_POINTS } from "./urls";
import { createByApi } from "./action";


// const signupUser = async (data) => {
//     return await createByApi(END_POINTS.user_signup, data)
// }

const loginUser = async (data) => {
    return await createByApi(END_POINTS.user_login, data)
}

const addStudent = async (data) => {
    return await createByApi(END_POINTS.add_student, data)
}

const uploadStudents = async (data) => {
    return await createByApi(END_POINTS.upload_students, data)
}

const addMark = async (data) => {
    return await createByApi(END_POINTS.add_mark, data)
}

const uploadMarks = async (data) => {
    return await createByApi(END_POINTS.upload_marks, data)
}

const forgotPasswordUser = async (data) => {
    return await createByApi(END_POINTS.user_forgotPassword, data)
}

const resetPasswordUser = async (data) => {
    return await createByApi(END_POINTS.user_resetPassword, data)
}

const verifyOtpUser = async (data) => {
    return await createByApi(END_POINTS.user_verifyOtp, data)
}

export {
    // signupUser,
    loginUser,
    forgotPasswordUser,
    resetPasswordUser,
    verifyOtpUser,
    addStudent,
    uploadStudents,
    addMark,
    uploadMarks
}