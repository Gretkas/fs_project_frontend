//fra sys2
import Pagination from "@material-ui/lab/Pagination";
import "./roomsPaginator.css";
const renderPaginator = (props) => {
  return (
    <>
      <div className="pagination-container">
        <Pagination
          count={props.rooms.totalPages}
          onChange={props.handlePageClick}
        />
      </div>
    </>
  );
};

export default renderPaginator;
