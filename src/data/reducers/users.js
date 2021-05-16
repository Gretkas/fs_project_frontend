import {
    GET_USERS,
    ERROR
} from "../constants"

const defaultState = {
    users: []
}

export default function userReducer(state = defaultState, action){
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.payload
            }
        case ERROR:
            return {
            ...state,
            };
        default:
            return state;
    }
    }
}