import Room from "./singleRoom";
import { connect } from "react-redux";
import { getSingleRoom } from "../../data/actions/rooms";
import { withRouter } from 'react-router';
import React, { useEffect, useState } from "react";




function RoomContainer(props) {

  
useEffect(() => { 
    
    props.getSingleRoom(props.location.pathname.split("/")[props.location.pathname.split("/").length-1])
}, [])
  

  return props.room ? (
    <div className="roomContainer">
      <Room room={props.room}/>
      
      
    </div>
  ) : "";
}

const mapStateToProps = (state) => ({
  room: state.rooms.singleRoom
});




export default withRouter(connect(mapStateToProps, { getSingleRoom }, null, {
  forwardRef: true,
})(RoomContainer));
