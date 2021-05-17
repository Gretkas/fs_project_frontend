import SearchBar from "material-ui-search-bar";
import "./searchBar.css";


function RoomSearchBar(props) {
  const renderSearchBar = () => {
    return (
      <SearchBar
        className="searchbar"
        value={props.roomSearchCriteria.name}
        onChange={(newValue) => props.handleSearchName(newValue)}
        onCancelSearch={() => props.handleSearchName(null)}
        onRequestSearch={() => props.searchRooms()}
      />
    );
  };

  return (
    <div className="search-bar">
    {renderSearchBar()}
    </div>
  );
}

export default RoomSearchBar;

