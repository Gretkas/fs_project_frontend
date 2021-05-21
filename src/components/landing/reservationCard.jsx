import "./reservationCard.css";
import cancelButton from "../../assets/cancelButton.svg";
import { Paper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import IconButton from "@material-ui/core/IconButton";

function ReservationCard(props) {
  return (
    <Paper className="reservationCardContainer" elevation={5}>
      <div className="reservationCard">
        <Typography
          className="reservationCardRoomName"
          variant="h6"
          gutterBottom
        >
          {props.reservation.roomName}
        </Typography>
        <div className="reservationCardDate">
          <Typography
            className="reservationCardSectionName"
            variant="body2"
            gutterBottom
          >
            Klokken: {props.reservation.startTime.split("T")[1].substring(0, 2)}{" "}
            - {props.reservation.endTime.split("T")[1].substring(0, 2)}{" "}
          </Typography>
          <Typography
            className="reservationCardSectionName"
            variant="body2"
            gutterBottom
          >
            Dato: {props.reservation.endTime.split("T")[0]}
          </Typography>
        </div>
        <Typography
          className="reservationCardSectionName"
          variant="body1"
          gutterBottom
        >
          Seksjon: {props.reservation.title}
        </Typography>
        <IconButton
          className="reservationCardCancelButton"
          aria-label="Slett reservasjon"
          onClick={() => {
            props.cancelReservation(props.reservation.id);
          }}
        >
          <img src={cancelButton} alt="Slett reservasjon" />
        </IconButton>
      </div>
    </Paper>
  );
}

export default ReservationCard;
