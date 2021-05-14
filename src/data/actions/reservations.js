import {reservationService} from "../services/reservations"
import {GET_RESERVATIONS, GET_RESERVATION_HISTORY, ERROR} from "../constants"

export const getReservations = () => async (dispatch) => { 
    try {
      
      const res = await reservationService.getReservations();
      
      dispatch({
        type: GET_RESERVATIONS,
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

  export const getReservationHistory = () => async (dispatch) => { 
    try {
      
      const res = await reservationService.getReservationHistory();
      
      dispatch({
        type: GET_RESERVATION_HISTORY,
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