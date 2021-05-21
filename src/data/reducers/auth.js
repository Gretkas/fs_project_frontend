//fra sys2 prosjekt
import {
    LOGIN,
    ERROR,
    AUTH_USER,
    AUTH_ADMIN,
    LOGOUT,
    NO_SESSION_COOKIE
  } from "../constants"
const defaultState = {
  isLoggedIn: null,
  isAdmin: null,
  user: false,
  userIsLoading: null,
  refreshUserError: null
};

export default function authReducer(state = defaultState, action) {
  console.log("state")
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true
      };
    
    case AUTH_USER:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
        isAdmin: false
      }
    case AUTH_ADMIN:
      return{
        ...state,
        user: action.payload,
        isLoggedIn: true,
        isAdmin: true
      }
      
    case LOGOUT:
      return{
        state
      }
    case NO_SESSION_COOKIE:
      return{
        ...state,
        isLoggedIn: false
      }
    case ERROR:
      console.log("err" )
      return {
        ...state,
      };

    default:
      
      return state;
  }
}
  