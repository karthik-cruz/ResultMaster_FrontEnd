import { END_POINTS } from "./urls";
import { readByApi } from "./action";


const getStudents = async (params) => {
    return await readByApi(END_POINTS.get_students, params)
}

const getAllStudents = async () => {
    return await readByApi(END_POINTS.get_all_students)
}


export {
    getStudents,
    getAllStudents
}