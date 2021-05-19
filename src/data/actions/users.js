import {
    GET_USERS,
    ERROR
} from "../constants"
import { userService } from "../services/users"

export const getUsers = () => async (dispatch) => {
    try {
        const res = await userService.getUsers();
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

export const deleteUser = (userId) => async (dispatch) => {
    try{
        await userService.deleteUser(userId);
        dispatch(
            getUsers()
        );
    } catch(err){
        dispatch({
            type: ERROR,
            payload: {
              error: err,
            },
        });
    }
}