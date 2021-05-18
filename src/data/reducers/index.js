
import { combineReducers } from 'redux';
import auth from "./auth"
import rooms from "./rooms"
import reservations from "./reservations"
import users from "./users"

const createRootReducer = () =>
  combineReducers({
    auth: auth,
    rooms: rooms,
    reservations: reservations,
    users: users
  });
  
export default createRootReducer;
