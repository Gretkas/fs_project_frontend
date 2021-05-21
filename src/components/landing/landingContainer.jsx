import Landing from "./landing";
import { connect } from "react-redux";
import { getReservations, getReservationHistory,cancelReservation,cancelSuccess } from "../../data/actions/reservations";
import { withRouter } from 'react-router';
import React, { useEffect } from "react";

function LandingContainer(props) {
  useEffect(() => {
    if(props.cancelledReservation){
      
      props.cancelSuccess()
    }else{
      props.getReservations()
    }
    
    //props.getReservationHistory()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.cancelledReservation]) 

  return (
    <div className="landingContainer">
      <Landing reservations={props.reservations} cancelReservation={props.cancelReservation} reservationHistory={props.reservationHistory}/>
    </div>
  );
}

const mapStateToProps = (state) => ({
  reservations: state.reservations.reservations,
  reservationHistory: state.reservations.reservationHistory,
  cancelledReservation: state.reservations.canceled
});

// const mapDispatchToProps = (dispatch) => ({ getCourses });



export default withRouter(connect(mapStateToProps, { getReservations,cancelReservation,cancelSuccess, getReservationHistory }, null, {
  forwardRef: true,
})(LandingContainer));
