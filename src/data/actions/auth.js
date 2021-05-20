//fra sys2 prosjekt
import {
    LOGIN,
    ERROR,
    AUTH_USER,
    LOGOUT,
    NO_SESSION_COOKIE,
    AUTH_ADMIN
  } from "../constants"

  import {authenticationService} from "../services/auth"
 

  
  export const login = (data) => async (dispatch) => { 
      try {
        
        const res = await authenticationService.login(data);
        
        dispatch({
          type: LOGIN,
          payload: res.data,
        });
        
      } catch (err) {
        dispatch({
          type: ERROR,
          payload: {
            error: err,
          },
        });
      }
    };
  
    export const logout = () => async (dispatch) => { 
      try {
      
        await authenticationService.logout();
        dispatch({
          type: LOGOUT,
        });
      } catch (err) {
        dispatch({
          type: ERROR,
          payload: {
            error: err,
          },
        });
      }
    };
  
    export const authUser = () => async (dispatch) => {
      try {
        const result = await authenticationService.authUser();
        if(result instanceof Error) throw result;
        if(result.data.role === "ADMIN"){
          dispatch({
            type: AUTH_ADMIN,
            payload: result.data,
          });
        }else{
          dispatch({
          type: AUTH_USER,
          payload: result.data,
        });
        }
        
      }catch(e){
        console.log("HEIDER");
        dispatch({
          type: NO_SESSION_COOKIE,
          payload: {
            error: e,
          },
        });
      }
    }
  
    