import {

    ERROR,
    GET_SINGLE_ROOM,
    GET_FILTERED_ROOMS,
    GET_ROOMS, UPDATE_ROOM
} from "../constants"
  import {roomService} from "../services/rooms"
import {addError} from "./errors";
 
  
  
  
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
  
    export const getFilteredRooms = (data) => async (dispatch) => { 
      try {
      
        const res = await roomService.getFilteredRooms(data);
        console.log(res)
        dispatch({
          type: GET_FILTERED_ROOMS,
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
	try{
		const res = await roomService.getRooms();
		dispatch({
			type: GET_ROOMS,
			payload: res.data,
		});
	} catch(err){
        dispatch({
            type: ERROR,
            payload: {
              error: err,
            },
        });
    }
}

export const deleteRoom = (userId) => async (dispatch) => {
  try{
      await roomService.deleteRoom(userId);
      dispatch(
          getRooms()
      );
  } catch(err){
      dispatch({
          type: ERROR,
          payload: {
            error: err,
          },
      });
  }
}

export const updateRoom = (roomId, data) => async (dispatch) => {

    try {
        const res = await roomService.putRoom(roomId, data)
        await dispatch({
            type: UPDATE_ROOM,
            payload: res.data
        });
        return res.data;
    } catch (err) {
        dispatch(addError(err));
        return null;
    }
}
  
  
  
    