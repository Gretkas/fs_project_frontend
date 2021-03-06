import {
    GET_USERS,
    ERROR, NEW_USER, UPDATE_USER
} from "../constants"

const defaultState = {
    users: [],
}

export default function userReducer(state = defaultState, action){
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.payload
            }
        case NEW_USER:
        return {
            ...state,
            users: [...state.users, action.payload]
        }
        case UPDATE_USER:
            return {
                ...state,
                users: state.users.map(user => user.id === action.payload.id ? {...action.payload} : user)
            }
        case ERROR:
            return {
            ...state,
            };
        default:
            return state;
    }
}