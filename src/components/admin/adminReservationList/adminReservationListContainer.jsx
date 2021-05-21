import { connect } from "react-redux";
import { getFilteredReservations,cancelSuccess, cancelReservation } from "../../../data/actions/reservations";
import { withRouter } from 'react-router';
import React, { useEffect, useState } from "react";
import SearchBar from "../../searchBar/searchBar"
import Paginator from "../../pagination/paginator"
import AdminReservationList from "./adminReservationList"


const PAGE_SIZE = 20;

function AdminUserListContainer(props) {

  const [page, setPage] = useState(0);
  const [reservationSearchCriteria, setReservationSearchCriteria] = useState({
    title: "",
    showPreviousReservations: false
  });

  const [sortDirection, setSortDirection] = useState("ASC");
  const [sortby, setSortby] = useState("startTime");
  useEffect(() => {
    if(props.cancelledReservation){
      
      props.cancelSuccess()
    }else{
      executeSearch()
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, reservationSearchCriteria, sortDirection, sortby, props.cancelledReservation]) 

  
  
  const executeSearch = () => {
    props.getFilteredReservations({
      reservationSearchCriteria: reservationSearchCriteria,
      reservationPage: {
        pageNumber: page,
        pageSize: PAGE_SIZE,
        sortDirection: sortDirection,
        sortBy: sortby,
      },
    });
  };

  const handlePageClick = (event, value) => {
    //pageUrl(data.selected + 1);
    let page = Math.ceil(value - 1);
    setPage(page);
  };

  const searchReservations = (value) => {
    setPage((page) => {
      return 0;
    });
  };

  const handleSearchName = (newTitle) => {
    setPage((page) => {
      return 0;
    });
    setReservationSearchCriteria((reservationSearchCriteria) => {
      return { ...reservationSearchCriteria, title: newTitle };
    });
  };


  

  return props.reservations.content ? (
    <div className="reservationsContainer">
      <SearchBar handleSearchName={handleSearchName} search={searchReservations} searchCriteria={reservationSearchCriteria}/>
      <AdminReservationList reservations={props.reservations.content} cancelReservation={props.cancelReservation} setSortby={setSortby} setSortDirection={setSortDirection}/>
      <Paginator handlePageClick={handlePageClick} content={props.reservations}/>
    </div>
  ) : "";
}

const mapStateToProps = (state) => ({
  reservations: state.reservations.filteredReservations,
  cancelledReservation: state.reservations.canceled
});




export default withRouter(connect(mapStateToProps, { getFilteredReservations, cancelSuccess, cancelReservation }, null, {
  forwardRef: true,
})(AdminUserListContainer));
