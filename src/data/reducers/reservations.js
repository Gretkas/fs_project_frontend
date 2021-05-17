import {GET_RESERVATIONS, GET_RESERVATION_HISTORY,ERROR} from "../constants"


const defaultState = {
    reservations: [],
    reservationHistory: []
}

export default function reservationReducer(state = defaultState, action) {
    
    switch (action.type) {
      case GET_RESERVATIONS:
        return {
          ...state,
          reservations : action.payload
        };
      case GET_RESERVATION_HISTORY:
          return {
              ...state,
            reservationHistory : action.payload
        };
      case ERROR:
        return {
          ...state,
        };
  
      default:
        return state;
    }
  }