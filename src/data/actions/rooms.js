import {
    
    ERROR,
    GET_SINGLE_ROOM,
    GET_ROOMS
  } from "../constants"
  import {roomService} from "../services/rooms"
 
  
  
  
  export const getSingleRoom = (id) => async (dispatch) => { 
      try {
        const res = await roomService.getSingleRoom(id);
        dispatch({
          type: GET_SINGLE_ROOM,
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
  
    export const getRooms = () => async (dispatch) => { 
      try {
      
        const res = await roomService.getRooms();
        dispatch({
          type: GET_ROOMS,
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
  
  
  
    