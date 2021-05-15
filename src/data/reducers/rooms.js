import {
    
    ERROR,
    GET_SINGLE_ROOM,
    GET_ROOMS
  } from "../constants"


  const defaultState = {
    singleRoom: null,
    rooms: []
}

export default function reservationReducer(state = defaultState, action) {
    
    switch (action.type) {
      case GET_SINGLE_ROOM:
        return {
          ...state,
          singleRoom : action.payload
        };
      case GET_ROOMS:
          return {
              ...state,
            rooms : action.payload
        };
      case ERROR:
        return {
          ...state,
        };
  
      default:
        return state;
    }
  }