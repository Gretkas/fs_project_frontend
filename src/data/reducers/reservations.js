import {GET_RESERVATIONS, GET_RESERVATION_HISTORY, POST_RESERVATION_SUCCESS, GET_AVAILABLE_TIMETABLE,  ERROR} from "../constants"

const defaultReservationTable = [
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
];

const defaultState = {
    reservations: [],
    reservationHistory: [],
    availableTimeTable: defaultReservationTable
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
      case POST_RESERVATION_SUCCESS: 
        return {
          ...state
        }

      case GET_AVAILABLE_TIMETABLE:
        return {
          ...state,
          availableTimeTable : action.payload
        }
      case ERROR:
        return {
          ...state
          
        };
  
      default:
        return state;
    }
  }