import { ADD_ERROR, REMOVE_ERROR } from "../constants";

const mapErrorMessage = (err) => {
    return (err.response && err.response.data && err.response.data.description) ?
        err.response.data.description : "Something went wrong";
}

export const addError = error => ({
    type: ADD_ERROR,
    error: mapErrorMessage(error),
});

export const removeError = () => ({
    type: REMOVE_ERROR
});