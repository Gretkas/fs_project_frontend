import Rooms from "./rooms";
import { connect } from "react-redux";
import { getRooms } from "../../data/actions/rooms";
import { withRouter } from 'react-router';
import React, { useEffect } from "react";

function RoomsContainer(props) {
  useEffect(() => {
    props.getRooms()
    
  }, []) 

  return (
    <div className="roomsContainer">
      <Rooms rooms={props.rooms}/>
    </div>
  );
}

const mapStateToProps = (state) => ({
  rooms: state.rooms.rooms,
  singleRoom: state.rooms.singleRoom
});




export default withRouter(connect(mapStateToProps, { getRooms }, null, {
  forwardRef: true,
})(RoomsContainer));
