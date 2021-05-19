import AdminRoomList from "./adminRoomList";
import { connect } from "react-redux";
import { getRooms } from "../../../data/actions/rooms";
import { withRouter } from 'react-router';
import React, { useEffect } from "react";

function AdminRoomListContainer(props) {
  useEffect(() => {
    props.getRooms()    
  }, []) 

  return (
    <div className="landingContainer">
      <AdminRoomList rooms={props.rooms}/>
    </div>
  );
}

const mapStateToProps = (state) => ({
  rooms: state.rooms.rooms
});



export default withRouter(connect(mapStateToProps, { getRooms }, null, {
  forwardRef: true,
})(AdminRoomListContainer));
