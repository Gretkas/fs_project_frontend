import "./rooms.css";
import RoomCard from "./roomCard";
import { v4 as uuid } from "uuid";

function Rooms(props) {
  const renderRooms = () => {
    console.log(props);
    return props.rooms.map((room) => {
      return <RoomCard key={uuid()} room={room} />;
    });
  };
  return <div className="Rooms">{renderRooms()}</div>;
}

export default Rooms;
