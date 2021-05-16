import './reservationCard.css';
import cancelButton from "../../assets/cancelButton.svg"
import { Divider } from '@material-ui/core';
import { withRouter } from 'react-router';
import { connect } from "react-redux";
import { cancelReservation } from "../../data/actions/reservations";

function ReservationCard(props) {

  return (
    <div className="reservationCardContainer">
      <div className="reservationCard">
        <p className="reservationCardRoomName">{props.reservation.roomName}</p>
        <p className="reservationCardDate">{props.reservation.startTime.split("T")[1].substring(0,2)} - {props.reservation.endTime.split("T")[1].substring(0,2)} {props.reservation.endTime.split("T")[0]}</p>
        <p className="reservationCardSectionName">{props.reservation.sectionName}</p>
        <img className="reservationCardCancelButton" src={cancelButton} onClick={()=>{props.cancelReservation(props.reservation.id);}}/>
        
    </div>
    <Divider className="hr"/>
   </div>
  );
}

export default withRouter(connect(null, { cancelReservation }, null, {
  forwardRef: true,
})(ReservationCard));