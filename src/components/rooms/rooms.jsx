import './rooms.css';
import RoomCard from './roomCard';

function Rooms(props) {

    const renderRooms = () => {
        return props.rooms.map(room => {
            return <RoomCard room={room}/>
        })
    }
  return (
    <div className="Rooms">
      {renderRooms()}
    </div>
  );
}

export default Rooms;