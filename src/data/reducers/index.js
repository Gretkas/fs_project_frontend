
import { combineReducers } from 'redux';
import auth from "./auth"
import rooms from "./rooms"
import reservations from "./reservations"
import users from "./users"
import errors from "./errors";

const createRootReducer = () =>
  combineReducers({
    auth: auth,
    rooms: rooms,
    reservations: reservations,
    users: users,
    errors: errors,
  });
  
export default createRootReducer;
