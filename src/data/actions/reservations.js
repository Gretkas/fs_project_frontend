import {reservationService} from "../services/reservations"
import {GET_RESERVATIONS, GET_RESERVATION_HISTORY, POST_RESERVATION_SUCCESS, GET_AVAILABLE_TIMETABLE, ERROR, NEW_RESERVATION,CANCELED_RESERVATION, GET_FILTERED_RESERVATIONS, CANCEL_SUCCESS} from "../constants"
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

export const getAvailableTimeTable = (items) => async (dispatch) => { 
  try {
    
    const res = await reservationService.getAvailableTimeTable(items);
    console.log(res)
    dispatch({
      type: GET_AVAILABLE_TIMETABLE,
      payload: res.data.timetable,
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

export const cancelSuccess = () => async (dispatch) => {
  dispatch({
    type: CANCEL_SUCCESS,
  });  
}

export const postReservation = (data) => async (dispatch) => {
  try{
    await reservationService.postReservation(data);
    dispatch({
      type: POST_RESERVATION_SUCCESS,
    });    
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
export const cancelReservation = (reservationId) => async (dispatch) => {
  try{
    await reservationService.cancelReservation(reservationId);
      
    dispatch({
      type: CANCELED_RESERVATION
    })
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
    const res = await reservationService.postMaintenanceReservation(data)
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

export const getFilteredReservations = (data) => async (dispatch) => { 
  try {
    const res = await reservationService.getFilteredReservations(data);
    dispatch({
      type: GET_FILTERED_RESERVATIONS,
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