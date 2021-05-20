import ReservationCard from "./reservationCard";
import "./reservations.css";
import { v4 as uuid } from "uuid";

function Reservations(props) {
  const renderReservations = () => {
    return props.reservations.map((reservation) => {
      return <ReservationCard key={uuid()} reservation={reservation} />;
    });
  };
  return <div className="reservations">{renderReservations()}</div>;
}

export default Reservations;
