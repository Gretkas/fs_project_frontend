
import { combineReducers } from 'redux';
import auth from "./auth"
import reservations from "./reservations"



const createRootReducer = () =>
  combineReducers({
    auth: auth,
    reservations: reservations,
  });
  
export default createRootReducer;
