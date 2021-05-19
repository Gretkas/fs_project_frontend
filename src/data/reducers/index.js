
import { combineReducers } from 'redux';
import auth from "./auth"
import rooms from "./rooms"
import reservations from "./reservations"
import errors from "./errors";

const createRootReducer = () =>
  combineReducers({
    auth: auth,
    rooms: rooms,
    reservations: reservations,
    errors: errors,

  });
  
export default createRootReducer;
