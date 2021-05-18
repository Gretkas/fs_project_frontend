import Rooms from "./rooms";
import { connect } from "react-redux";
import { getFilteredRooms } from "../../data/actions/rooms";
import { withRouter } from 'react-router';
import React, { useEffect, useState } from "react";
import SearchBar from "./searchBar/searchBar"
import Paginator from "./pagination/roomsPaginator"

const PAGE_SIZE = 8;

function RoomsContainer(props) {

  const [page, setPage] = useState(0);
  const [roomSearchCriteria, setRoomSearchCriteria] = useState({
    name: "",
  });
  useEffect(() => {
    executeSearch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, roomSearchCriteria]) 

  
  
  const executeSearch = () => {
    props.getFilteredRooms({
      roomSearchCriteria: roomSearchCriteria,
      roomPage: {
        pageNumber: page,
        pageSize: PAGE_SIZE,
        sortDirection: "ASC",
        sortBy: "name",
      },
    });
  };

  const handlePageClick = (event, value) => {
    //pageUrl(data.selected + 1);
    let page = Math.ceil(value - 1);
    setPage(page);
  };

  const searchRooms = (value) => {
    setPage((page) => {
      return 0;
    });
  };

  const handleSearchName = (newName) => {
    setPage((page) => {
      return 0;
    });
    setRoomSearchCriteria((roomSearchCriteria) => {
      return { ...roomSearchCriteria, name: newName };
    });
  };


  

  return props.rooms.content ? (
    <div className="roomsContainer">
      <SearchBar handleSearchName={handleSearchName} searchRooms={searchRooms} roomSearchCriteria={roomSearchCriteria}/>
      <Rooms rooms={props.rooms.content}/>
      <Paginator handlePageClick={handlePageClick} rooms={props.rooms}/>
    </div>
  ) : "";
}

const mapStateToProps = (state) => ({
  rooms: state.rooms.filteredRooms,
  singleRoom: state.rooms.singleRoom
});




export default withRouter(connect(mapStateToProps, { getFilteredRooms }, null, {
  forwardRef: true,
})(RoomsContainer));
