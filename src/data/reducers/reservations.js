import {GET_RESERVATIONS, GET_RESERVATION_HISTORY, POST_RESERVATION_SUCCESS, GET_AVAILABLE_TIMETABLE,  ERROR, NEW_RESERVATION,CANCELED_RESERVATION, CANCEL_SUCCESS, GET_FILTERED_RESERVATIONS} from "../constants"

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
    availableTimeTable: defaultReservationTable,
    filteredReservations: [],
    canceled: false
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
      case POST_RESERVATION_SUCCESS: 
        return {
          ...state
        }

      case GET_AVAILABLE_TIMETABLE:
        return {
          ...state,
          availableTimeTable : action.payload
        }
      case NEW_RESERVATION:
        return {
            ...state,
            reservations: [...state.reservations, action.payload]
        }
      case GET_FILTERED_RESERVATIONS:
        return {
          ...state,
          filteredReservations: action.payload
        }
      case CANCELED_RESERVATION:
        return{
          ...state,
          canceled:true
        }
      case CANCEL_SUCCESS:
        return{
          ...state,
          canceled: false
        }
      case ERROR:
        return {
          ...state
          
        };
  
      default:
        return state;
    }
  }