import './roomCard.css';

function RoomCard(props) {
  

  return (
    <div className="RoomCardContainer">
        {props.room.name}
   </div>
  );
}

export default RoomCard;