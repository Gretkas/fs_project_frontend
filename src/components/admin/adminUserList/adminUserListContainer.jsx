import AdminUserList from "./adminUserList";
import { connect } from "react-redux";
import { getReservation } from "../../data/actions/reservations";
import { withRouter } from 'react-router';
import React, { useEffect } from "react";

function LandingContainer(props) {
  useEffect(() => {
    props.getReservations()
    //props.getReservationHistory()
    
  }, []) 

  return (
    <div className="landingContainer">
      <Landing reservations={props.reservations} reservationHistory={props.reservationHistory}/>
    </div>
  );
}

const mapStateToProps = (state) => ({
  reservations: state.reservations.reservations,
  reservationHistory: state.reservations.reservationHistory
});

// const mapDispatchToProps = (dispatch) => ({ getCourses });



export default withRouter(connect(mapStateToProps, { getReservations, getReservationHistory }, null, {
  forwardRef: true,
})(LandingContainer));
