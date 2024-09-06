import { END_POINTS } from "./urls";
import { updateByIdApi } from "./action";

const updateUser = (params, data) => {
    return updateByIdApi(END_POINTS.update_user, params, data)
}

const updateUserMarks = (params, data) => {
    return updateByIdApi(END_POINTS.update_user_marks, params, data)
}

export { updateUser, updateUserMarks }