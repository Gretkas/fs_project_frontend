import './landing.css';
import Reservations from './reservations';

function Landing(props) {
  return (
    <div className="App">
      <Reservations reservations={props.reservations}/>
    </div>
  );
}

export default Landing;