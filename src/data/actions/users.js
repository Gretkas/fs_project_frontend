import {
    GET_USERS,
    ERROR
} from "../constants"
import { userService } from "../services/users"

export const getUsers = () => async (dispatch) => {
    try {
        const res = await userService.getUsers();
        console.log("brukere:")
        console.log(res)
        dispatch({
            type: GET_USERS,
            payload: res.data,
        });
    } catch(err){
        dispatch({
            type: ERROR,
            payload: {
              error: err,
            },
        });
    }
}