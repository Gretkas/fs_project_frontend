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
  const [sectionTitle, setSectionTitle] = useState("Hele Rommet");
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
        <button
          className={
            selectedSection === -2
              ? "roomReservationSelectedSection"
              : "roomReservationSection"
          }
          onClick={() =>
            handleSectionClick(-2, props.room.items, "Hele rommet")
          }
          alt="Select the whole room"
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
        </button>

        {renderSections()}

        {CreateOwnSection()}

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

        <SubmitButton />
      </div>
    );
  };

  function SubmitButton(props) {
    let disabledStatus = false;

    if (numberOfPeople.error) {
      disabledStatus = true;
    }
    if (reservationTime[0] === undefined) {
      disabledStatus = true;
    }
    if (isCreatingOwnSection) {
      if (createOwnSectionTitle === "" && !createOwnSectionTitle) {
        disabledStatus = true;
      }
    }

    return (
      <ThemeProvider theme={theme}>
        <div className="roomReservationReserveButton">
          <Button
            onClick={() => handleReservationPost()}
            variant="contained"
            color="primary"
            disabled={disabledStatus}
            label="Reserve room"
          >
            RESERVER
          </Button>
        </div>
      </ThemeProvider>
    );
  }

  const renderSections = () => {
    let elements = [];
    props.room.sections.forEach((section) => {
      elements.push(
        <button
          className={
            selectedSection === section.id
              ? "roomReservationSelectedSection"
              : "roomReservationSection"
          }
          alt={`Select ${section.name}`}
          onClick={() =>
            handleSectionClick(section.id, section.items, section.name)
          }
        >
          <Paper
            className="roomReservationPaper"
            key={uuid()}
            elevation={selectedSection === section.id ? 10 : 5}
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
        </button>
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
        <button
          onClick={() => {
            setCreatingOwnSection(true);
            setSelectedSectionItems([]);
            setSelectedSection(-1);
          }}
          className="roomReservationSection"
        >
          <Paper className=" roomReservationPaper" elevation={3}>
            <div className="create-own-section">
              <div className="roomReservationSectionHeader">
                <Typography variant="h4" component="h4">
                  Lag egen seksjon
                </Typography>
                <ArrowDropDownIcon color="primary" />
              </div>
            </div>
          </Paper>
        </button>
      );
    } else
      return (
        <Paper className="roomReservationPaper selected-section" elevation={10}>
          <div className="create-own-section">
            <button
              className="roomReservationSectionHeader"
              onClick={() => setCreatingOwnSection(false)}
              alt="Create your own section"
            >
              <Typography variant="h4" component="h4">
                Lag egen seksjon
              </Typography>
              <ArrowDropUpIcon color="primary" />
            </button>
            <div className="roomReservationCreateOwnSectionItems">
              {renderCreateOwnSectionItems()}

              {renderSelectedItems()}
            </div>
            <div className="roomReservationCreateOwnSectionTitle">
              <TextField
                fullWidth
                error={createOwnSectionTitle ? false : true}
                id="outlined-basic"
                label="Tittel"
                variant="outlined"
                required
                value={createOwnSectionTitle}
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
              <button
                className="unselectedItem"
                key={uuidv4()}
                onClick={() => handleItemSelection(item)}
              >
                {item.name}
              </button>
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
            <button
              className="selectedItem"
              key={uuidv4()}
              onClick={() => handleItemSelection(item)}
            >
              {item.name}
              <CheckIcon fontSize="small" style={{ color: "#FFFFFF" }} />
            </button>
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
    setSectionTitle(name);
    setcreateOwnSectionTitle("");
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
    const startDate = new Date(reservationTime[2]);

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

    console.log(createOwnSectionTitle);
    const data = {
      startTime: startDate,
      endTime: endDate,
      items: selectedSectionItems,
      type: "RESERVATION",
      title:
        createOwnSectionTitle === "" ? sectionTitle : createOwnSectionTitle,
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
