import {userService} from "../services/users"
import {NEW_USER} from "../constants"
import {addError} from "./errors";

export const addUser = (data) => async (dispatch) => {

    try {
        const res = await userService.postUser(data)
        await dispatch({
            type: NEW_USER,
            payload: res.data
        });
        return res.data;
    } catch (err) {
        dispatch(addError(err));
        return null;
    }
}