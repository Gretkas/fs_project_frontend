//fra sys2
import Pagination from "@material-ui/lab/Pagination";
import "./paginator.css";
const renderPaginator = (props) => {
  return (
    <>
      <div className="pagination-container">
        <Pagination
          count={props.content.totalPages}
          onChange={props.handlePageClick}
        />
      </div>
    </>
  );
};

export default renderPaginator;
