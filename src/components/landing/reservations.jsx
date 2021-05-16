import ReservationCard from './reservationCard';
import './reservations.css';

function Reservations(props) {



  const renderReservations = () => {
      console.log(props.reservations)
      return props.reservations.map(reservation => {
          return <ReservationCard reservation={reservation}/>
      })
  }
  return (
    <div className="reservations">
      {renderReservations()}
    </div>
  );
}

export default Reservations;