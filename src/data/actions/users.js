import { userService } from "../services/users";
import { ERROR, GET_USERS, NEW_USER, UPDATE_USER } from "../constants";
import { addError } from "./errors";

export const addUser = (data) => async (dispatch) => {
  try {
    const res = await userService.postUser(data);
    await dispatch({
      type: NEW_USER,
      payload: res.data,
    });
    return res.data;
  } catch (err) {
    dispatch(addError(err));
    return null;
  }
};

export const getUsers = () => async (dispatch) => {
  try {
    const res = await userService.getUsers();
    dispatch({
      type: GET_USERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
      payload: {
        error: err,
      },
    });
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  try {
    await userService.deleteUser(userId);
    dispatch(getUsers());
  } catch (err) {
    dispatch({
      type: ERROR,
      payload: {
        error: err,
      },
    });
  }
};

export const getUser = (userId) => async (dispatch) => {
  try {
    const res = await userService.getUser(userId);
    return res.data;
  } catch (err) {
    dispatch(addError(err));
    return null;
  }
};

export const updateUser = (userId, data) => async (dispatch) => {
  try {
    const res = await userService.putUser(userId, data);
    await dispatch({
      type: UPDATE_USER,
      payload: res.data,
    });
    return res.data;
  } catch (err) {
    dispatch(addError(err));
    return null;
  }
};
