import { Redirect } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import "./singleRoom.css";
import CheckIcon from "@material-ui/icons/Check";
import { Divider } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import TimeSelectionTable from "../timeselection/TimeSelectionTable.tsx";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { v4 as uuidv4 } from "uuid";
import PeopleAmount from "./PeopleAmount";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const purplecolor = "#6200EA";
function SingleRoom(props) {
  const [reservationTime, setReservationTime] = useState([
    undefined,
    undefined,
    undefined,
  ]);

  const [createOwnSectionTitle, setcreateOwnSectionTitle] = useState("");
  const [selectedSection, setSelectedSection] = useState(-2);
  const [isCreatingOwnSection, setCreatingOwnSection] = useState(false);
  const [selectedSectionItems, setSelectedSectionItems] = useState(
    props.room.items
  );
  const [TimeSelectionKey, setTimeSelectionKey] = useState(uuidv4());
  const [isReserved, setReserved] = useState(false);
  const [numberOfPeople, setNumberOfpeople] = useState({
    error: true,
    message: "Please specify how many people",
    amount: "",
  });

  const { getAvailableTimeTable } = props;
  useEffect(() => {
    getAvailableTimeTable(selectedSectionItems);
    setTimeSelectionKey(uuidv4());
  }, [selectedSectionItems, getAvailableTimeTable]);

  useEffect(() => {
    setTimeSelectionKey(uuidv4());
  }, [props.availableTimeTable]);

  const renderSelection = () => {
    return (
      <div className="roomReservationSelectionComponent">
        <div
          className={
            selectedSection === -2
              ? "roomReservationSelectedSection"
              : "roomReservationSection"
          }
          onClick={() => handleSectionClick(-2, props.room.items)}
        >
          <Paper className="roomReservationPaper" elevation={3}>
            <div className="roomReservationSectionHeader">
              <Typography variant="h4" component="h4">
                Hele rommet
              </Typography>
              {selectedSection === -2 ? (
                <CheckIcon style={{ color: purplecolor }} />
              ) : (
                <CheckIcon color="disabled" />
              )}
            </div>
            <div className="roomReservationSectionItems">
              {renderSectionItems(props.room.items, selectedSection === -2)}
            </div>
          </Paper>
        </div>

        {renderSections()}

        <CreateOwnSection />

        <Paper className="roomReservationPaper" elevation={3}>
          <Typography variant="h4" component="h4">
            Velg tidspunkt
          </Typography>

          <TimeSelectionTable
            key={TimeSelectionKey}
            reservedArray={props.availableTimeTable}
            reservationTime={reservationTime}
            setReservationTime={setReservationTime}
          />
        </Paper>
        <PeopleAmount
          setNumberOfpeople={setNumberOfpeople}
          numberOfPeople={numberOfPeople}
          maxPeople={props.room.maxNumber}
        />
        <div className="roomReservationReserveButton">
          <SubmitButton />
        </div>
      </div>
    );
  };

  function SubmitButton() {
    let disabledStatus = false;

    if (numberOfPeople.error) {
      disabledStatus = true;
    }
    if (reservationTime[0] === undefined) {
      disabledStatus = true;
    }

    return (
      <ThemeProvider theme={theme}>
        <Button
          onClick={() => handleReservationPost()}
          variant="contained"
          color="primary"
          disabled={disabledStatus}
        >
          RESERVER
        </Button>
      </ThemeProvider>
    );
  }

  const renderSections = () => {
    let elements = [];
    props.room.sections.forEach((section) => {
      elements.push(
        <div
          className={
            selectedSection === section.id
              ? "roomReservationSelectedSection"
              : "roomReservationSection"
          }
        >
          <Paper
            className="roomReservationPaper"
            key={uuid()}
            elevation={selectedSection === section.id ? 10 : 5}
            onClick={() => handleSectionClick(section.id, section.items)}
          >
            <div className="roomReservationSectionHeader">
              <Typography variant="h4" component="h4">
                {section.name}
              </Typography>
              {selectedSection === section.id ? (
                <CheckIcon style={{ color: purplecolor }} />
              ) : (
                <CheckIcon color="disabled" />
              )}
            </div>

            {renderSectionItems(section.items, selectedSection === section.id)}

            <div className="hr">
              <Divider flexItem />
            </div>
          </Paper>
        </div>
      );
    });
    return elements;
  };

  const renderSectionItems = (items, selected) => {
    return items.map((item) => {
      return (
        <div
          className={selected ? "selectedItem" : "unselectedItem"}
          key={uuidv4()}
        >
          {item.name}
        </div>
      );
    });
  };

  function CreateOwnSection() {
    if (!isCreatingOwnSection) {
      return (
        <div className="roomReservationSection">
          <Paper className=" roomReservationPaper" elevation={3}>
            <div
              className="create-own-section"
              onClick={() => {
                setCreatingOwnSection(true);
                setSelectedSectionItems([]);
                setSelectedSection(-1);
              }}
            >
              <div className="roomReservationSectionHeader">
                <Typography variant="h4" component="h4">
                  Lag egen seksjon
                </Typography>
                <ArrowDropDownIcon color="primary" />
              </div>
            </div>
          </Paper>
        </div>
      );
    } else
      return (
        <Paper className="roomReservationPaper selected" elevation={10}>
          <div className="create-own-section">
            <div
              className="roomReservationSectionHeader"
              onClick={() => setCreatingOwnSection(false)}
            >
              <Typography variant="h4" component="h4">
                Lag egen seksjon
              </Typography>
              <ArrowDropUpIcon color="primary" />
            </div>
            <div className="roomReservationCreateOwnSectionItems">
              {renderCreateOwnSectionItems()}

              {renderSelectedItems()}
            </div>
            <div className="roomReservationCreateOwnSectionTitle">
              <TextField
                fullWidth
                id="outlined-basic"
                label="Tittel"
                variant="outlined"
                value={createOwnSectionTitle ? createOwnSectionTitle : ""}
                helperText="Beskrivende tittel for din egen seksjon"
                onChange={(event) =>
                  setcreateOwnSectionTitle(event.target.value)
                }
              />
            </div>
          </div>
        </Paper>
      );
  }

  const renderCreateOwnSectionItems = () => {
    return (
      <div className="createOwnSectionItems">
        {props.room.items.map((item) => {
          if (
            !selectedSectionItems.some(
              (selectedItem) => item.itemId === selectedItem.itemId
            )
          ) {
            return (
              <div
                className="unselectedItem"
                key={uuidv4()}
                onClick={() => handleItemSelection(item)}
              >
                {item.name}
              </div>
            );
          } else {
            return "";
          }
        })}
      </div>
    );
  };
  const renderSelectedItems = () => {
    return (
      <div className="selectedCreateOwnSectionItems">
        {selectedSectionItems.map((item) => {
          return (
            <div
              className="selectedItem"
              key={uuidv4()}
              onClick={() => handleItemSelection(item)}
            >
              {item.name}
              <CheckIcon fontSize="small" style={{ color: "#FFFFFF" }} />
            </div>
          );
        })}
      </div>
    );
  };

  const handleSectionClick = (id, items, name) => {
    setSelectedSection((selectedSection) => {
      return selectedSection === id ? -1 : id;
    });
    setSelectedSectionItems((selectedSectionItems) => {
      return selectedSection === id ? [] : items;
    });
    setcreateOwnSectionTitle(name);
    setCreatingOwnSection(false);
  };

  const handleItemSelection = (item) => {
    setSelectedSectionItems((selectedSectionItems) => {
      return selectedSectionItems.includes(item)
        ? selectedSectionItems.filter((selectedItem) => selectedItem !== item)
        : [...selectedSectionItems, item];
    });
  };

  const handleReservationPost = async () => {
    console.log(reservationTime[0]);
    const startDate = new Date(reservationTime[2]);
    console.log(startDate);
    startDate.setHours(
      reservationTime[0] - startDate.getTimezoneOffset() / 60,
      0,
      0
    );
    const endDate = new Date(reservationTime[2]);
    endDate.setHours(
      reservationTime[1] - startDate.getTimezoneOffset() / 60,
      0,
      0
    );
    console.log(startDate);

    const data = {
      startTime: startDate,
      endTime: endDate,
      items: selectedSectionItems,
      type: "RESERVATION",
    };
    await props.postReservation(data);
    setReserved(true);
  };

  return (
    <div className="singleRoom">
      <div className="RoomDetails">
        <div>
          <Typography variant="h2" component="h2">
            {props.room.name}
          </Typography>
        </div>
      </div>

      <div className="RoomDescription">
        <Typography variant="subtitle1" color="textSecondary">
          {props.room.description}
        </Typography>
      </div>

      {renderSelection()}
      {isReserved ? <Redirect to="/" /> : ""}
    </div>
  );
}

const theme = createMuiTheme({
  palette: {
    primary: { main: purplecolor },
  },
});

export default SingleRoom;
