import {reservationService} from "../services/reservations"
import {
  GET_RESERVATIONS, GET_RESERVATION_HISTORY,
  ERROR, NEW_RESERVATION
} from "../constants"
import {addError} from "./errors";

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

export const cancelReservation = (reservationId) => async (dispatch) => {
  try{
    const res = await reservationService.cancelReservation(reservationId);
    dispatch(
      getReservations()
    );    
  }
  catch(err){
    console.log(err);
    dispatch({
      type: ERROR,
      payload: {
        error: err,
      },
    });
  }
}

export const newReservation = (data) => async (dispatch) => {

  try {
    const res = await reservationService.postReservation(data)
    await dispatch({
      type: NEW_RESERVATION,
      payload: res.data
    });
    return res.data;
  } catch (err) {
    dispatch(addError(err));
    return null;
  }
}