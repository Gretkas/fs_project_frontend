import {GET_RESERVATIONS, GET_RESERVATION_HISTORY, ERROR, NEW_RESERVATION} from "../constants"


const defaultState = {
    reservations: [],
    reservationHistory: [],
    // newestReservation: null,
}

export default function reservationReducer(state = defaultState, action) {
    
    switch (action.type) {
      case GET_RESERVATIONS:
        return {
          ...state,
          reservations : [...action.payload]
        };
      case GET_RESERVATION_HISTORY:
          return {
              ...state,
            reservationHistory : action.payload
        };
        case NEW_RESERVATION:
            return {
                ...state,
                reservations: [...state.reservations, action.payload],
                // newestReservation: action.payload,
            }
      case ERROR:
        return {
          ...state,
        };
  
      default:
        return state;
    }
  }