import SearchBar from "material-ui-search-bar";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import "./activityBar.css";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

function SearchBar(props) {
  const renderSearchBar = () => {
    return (
      <SearchBar
        className="searchbar"
        value={props.activitySearchCriteria.name}
        onChange={(newValue) => props.handleSearchName(newValue)}
        onCancelSearch={() => props.handleSearchName(null)}
        onRequestSearch={() => props.searchActivities()}
      />
    );
  };

  return (
    <div className="search-bar">
    {renderSearchBar()}
    </div>
  );
}

export default SearchBar;

