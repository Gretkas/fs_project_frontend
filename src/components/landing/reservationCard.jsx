import './reservationCard.css';
import cancelButton from "../../assets/cancelButton.svg"
import { Divider } from '@material-ui/core';

function ReservationCard(props) {
  const {reservation} = props;

  console.log(reservation);

  return (
    <div className="reservationCardContainer">
      <div className="reservationCard">
        <p className="reservationCardRoomName">{reservation.roomName}</p>
        <p className="reservationCardDate">{reservation.startTime.split("T")[1].substring(0,2)} - {reservation.endTime.split("T")[1].substring(0,2)} {reservation.endTime.split("T")[0]}</p>
        <p className="reservationCardSectionName">Section name</p>
        <img className="reservationCardCancelButton" src={cancelButton} onClick={()=>{console.log("loooooool")}}/>
        
    </div>
    <Divider className="hr"/>
   </div>
  );
}

export default ReservationCard;