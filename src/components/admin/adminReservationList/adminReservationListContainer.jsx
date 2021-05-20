import { connect } from "react-redux";
import { getFilteredReservations, cancelReservation } from "../../../data/actions/reservations";
import { withRouter } from 'react-router';
import React, { useEffect, useState } from "react";
import SearchBar from "../../searchBar/searchBar"
import Paginator from "../../pagination/paginator"
import AdminReservationList from "./adminReservationList"


const PAGE_SIZE = 20;

function AdminUserListContainer(props) {

  const [page, setPage] = useState(0);
  const [reservationSearchCriteria, setReservationSearchCriteria] = useState({
    name: "",
  });
  useEffect(() => {
    executeSearch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, reservationSearchCriteria]) 

  
  
  const executeSearch = () => {
    props.getFilteredReservations({
      reservationSearchCriteria: reservationSearchCriteria,
      reservationPage: {
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

  const searchReservations = (value) => {
    setPage((page) => {
      return 0;
    });
  };

  const handleSearchName = (newName) => {
    setPage((page) => {
      return 0;
    });
    setReservationSearchCriteria((reservationSearchCriteria) => {
      return { ...reservationSearchCriteria, name: newName };
    });
  };


  

  return props.reservations.content ? (
    <div className="reservationsContainer">
      <SearchBar handleSearchName={handleSearchName} search={searchReservations} searchCriteria={reservationSearchCriteria}/>
      <AdminReservationList reservations={props.reservations.content} cancelReservation={props.cancelReservation}/>
      <Paginator handlePageClick={handlePageClick} content={props.reservations}/>
    </div>
  ) : "";
}

const mapStateToProps = (state) => ({
  reservations: state.reservations.filteredReservations,
});




export default withRouter(connect(mapStateToProps, { getFilteredReservations, cancelReservation }, null, {
  forwardRef: true,
})(AdminUserListContainer));
