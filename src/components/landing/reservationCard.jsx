import './reservationCard.css';
import cancelButton from "../../assets/cancelButton.svg"
import { Divider } from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton';

function ReservationCard(props) {

  return (
    <div className="reservationCardContainer">
      <div className="reservationCard">
        <p className="reservationCardRoomName">{props.reservation.roomName}</p>
        <p className="reservationCardDate">{props.reservation.startTime.split("T")[1].substring(0,2)} - {props.reservation.endTime.split("T")[1].substring(0,2)} {props.reservation.endTime.split("T")[0]}</p>
        <p className="reservationCardSectionName">{props.reservation.title}</p>
        <IconButton className="reservationCardCancelButton" aria-label="Slett reservasjon" onClick={()=>{props.cancelReservation(props.reservation.id);}}>
          <img src={cancelButton} alt="Slett reservasjon"/>
        </IconButton>        
    </div>
    <Divider className="hr"/>
   </div>
  );
}

export default ReservationCard;