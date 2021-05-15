
import { combineReducers } from 'redux';
import auth from "./auth"
import rooms from "./rooms"
import reservations from "./reservations"

const createRootReducer = () =>
  combineReducers({
    auth: auth,
    rooms: rooms,
    reservations: reservations
  });
  
export default createRootReducer;
