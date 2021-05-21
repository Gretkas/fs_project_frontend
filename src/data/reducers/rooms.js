import {

    ERROR,
    GET_SINGLE_ROOM,
    GET_ROOMS,
    GET_FILTERED_ROOMS, UPDATE_ROOM
} from "../constants"


  const defaultState = {
    singleRoom: null,
    rooms: [],
    filteredRooms: []
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
      case GET_FILTERED_ROOMS:
        return {
            ...state,
            filteredRooms : action.payload
        };
        case UPDATE_ROOM:
            return {
                ...state,
                rooms: state.rooms.map(room => room.id === action.payload.id ? {...action.payload} : room)
            }
      case ERROR:
        return {
          ...state,
        };
  
      default:
        return state;
    }
  }