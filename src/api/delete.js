import { deleteByIdApi } from "./action";
import { END_POINTS } from "./urls";


const deleteUser = async (data) => {
    return await deleteByIdApi(END_POINTS.delete_user, data)
}




export { deleteUser }