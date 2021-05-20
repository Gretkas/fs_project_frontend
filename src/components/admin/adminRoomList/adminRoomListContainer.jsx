import AdminRoomList from "./adminRoomList";
import { connect } from "react-redux";
import { getRooms, deleteRoom } from "../../../data/actions/rooms";
import { withRouter } from 'react-router';
import React, { useEffect } from "react";

function AdminRoomListContainer(props) {
  const {getRooms} = props;
  useEffect(() => {
    getRooms()    
  }, [getRooms]) 

  return (
    <div className="landingContainer">
      <AdminRoomList rooms={props.rooms} deleteRoom={props.deleteRoom}/>
    </div>
  );
}

const mapStateToProps = (state) => ({
  rooms: state.rooms.rooms
});



export default withRouter(connect(mapStateToProps, { getRooms, deleteRoom }, null, {
  forwardRef: true,
})(AdminRoomListContainer));
