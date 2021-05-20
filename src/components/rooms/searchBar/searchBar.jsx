import "./searchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";

function RoomSearchBar(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      width: 400,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }));

  const classes = useStyles();

  const renderSearchBar = () => {
    return (
      <Paper component="form" className={classes.root} elevation={5}>
        <InputBase
          className={classes.input}
          placeholder="Search..."
          inputProps={{ "aria-label": "search for rooms" }}
          onChange={(event) => props.handleSearchName(event.target.value)}
          value={props.roomSearchCriteria.name}
        />
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton
          onClick={() => props.searchRooms()}
          className={classes.iconButton}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    );
  };

  return <div className="search-bar">{renderSearchBar()}</div>;
}

export default RoomSearchBar;

// <SearchBar
//        className="searchbar"
//        value={props.roomSearchCriteria.name}
//        onChange={(newValue) => props.handleSearchName(newValue)}
//        onCancelSearch={() => props.handleSearchName(null)}
//        onRequestSearch={() => props.searchRooms()}
//      />
