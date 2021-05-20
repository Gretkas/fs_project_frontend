
import { combineReducers } from 'redux';
import auth from "./auth"
import rooms from "./rooms"
import reservations from "./reservations"
import errors from "./errors";
import users from "./users"

const createRootReducer = () =>
  combineReducers({
    auth: auth,
    rooms: rooms,
    reservations: reservations,
    errors: errors,
    users,
  });
  
export default createRootReducer;
