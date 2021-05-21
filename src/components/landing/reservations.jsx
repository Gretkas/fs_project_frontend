import ReservationCard from "./reservationCard";
import "./reservations.css";
import { v4 as uuid } from "uuid";
import Typography from "@material-ui/core/Typography";

function Reservations(props) {
  const renderReservations = () => {
    return props.reservations.map((reservation) => {
      return (
        <ReservationCard
          key={uuid()}
          cancelReservation={props.cancelReservation}
          reservation={reservation}
        />
      );
    });
  };
  return (
    <div className="reservations">
      <Typography variant="h2" gutterBottom>
        Mine reservasjoner
      </Typography>
      {renderReservations()}
    </div>
  );
}

export default Reservations;
