import './landing.css';
import Reservations from './reservations';

function Landing(props) {
  return (
    <div className="App">
      <Reservations cancelReservation={props.cancelReservation} reservations={props.reservations}/>
    </div>
  );
}

export default Landing;