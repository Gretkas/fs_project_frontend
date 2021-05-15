import "./activityPaginator.css";
//fra sys2
import Pagination from "@material-ui/lab/Pagination";
import "./activityPaginator.css";
const renderPaginator = (props) => {
  return (
    <>
      <div className="pagination-container">
        <Pagination
          count={props.activities.totalPages}
          onChange={props.handlePageClick}
        />
      </div>
    </>
  );
};

export default renderPaginator;
