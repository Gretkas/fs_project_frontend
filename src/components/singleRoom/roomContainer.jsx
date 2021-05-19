import Room from "./singleRoom";
import { connect } from "react-redux";
import { getSingleRoom } from "../../data/actions/rooms";
import {postReservation, getAvailableTimeTable} from "../../data/actions/reservations";
import { withRouter } from 'react-router';
import { useEffect } from "react";




function RoomContainer(props) {

  const { getSingleRoom } = props;
    useEffect(() => { 
    
    getSingleRoom(props.location.pathname.split("/")[props.location.pathname.split("/").length-1])
}, [getSingleRoom])
  

  return props.room ? (
    <div className="roomContainer">
      <Room room={props.room} postReservation={props.postReservation} availableTimeTable={props.availableTimeTable} getAvailableTimeTable={props.getAvailableTimeTable}/>
      
      
    </div>
  ) : "";
}

const mapStateToProps = (state) => ({
  room: state.rooms.singleRoom,
  availableTimeTable: state.reservations.availableTimeTable
});




export default withRouter(connect(mapStateToProps, { postReservation, getSingleRoom, getAvailableTimeTable }, null, {
  forwardRef: true,
})(RoomContainer));
