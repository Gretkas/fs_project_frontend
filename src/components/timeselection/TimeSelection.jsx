import React, { useState, useEffect } from "react";
import "./timeselection.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

/**
 *
 * @deprecated
 * @param {*} props
 * @returns WeekxHours time selection table
 */
function TimeSelection(props) {
  const [reservationTime, setReservationTime] = useState(null);
  const [firstSelection, setFirstSelection] = useState(null);
  const [secondSelection, setSecondSelection] = useState(null);
  useEffect(() => {
    if (!reservationTime) {
      setReservationTime(createEmptyTimeArray());
    }
  }, [reservationTime]);

  function handleTimeSelection(position) {
    let selected = {
      ...reservationTime[position.column].hourTable[position.row],
    };

    if (!firstSelection) {
      console.log("Adding first selection");
      setFirstSelection(position);
      setSecondSelection(null);
      if (secondSelection) {
      } else if (selected.selected) {
        selected.selected = false;
      } else if (selected.reserved) {
        selected.selected = false;
      } else {
        selected.selected = true;
      }
      const table = { ...reservationTime };
      let i;
      let j;
      for (i = 0; i < 7; i++) {
        if (i === position.column) {
        } else {
          for (j = 0; j < 10; j++) {
            console.log(j);
            let reserved = {
              ...table[i].hourTable[j],
            };
            reserved.selected = false;
            reserved.reserved = true;
            reserved.between = true;
            table[i].hourTable[j] = reserved;
          }
        }
      }

      table[position.column].hourTable[position.row] = selected;

      setReservationTime(table);
    } else if (firstSelection === position) {
      console.log("Removing first selection and clearing table");
      setFirstSelection(null);
      setSecondSelection(null);
      setReservationTime(createEmptyTimeArray());
    } else if (secondSelection === position) {
      console.log("removing second selection");
      setSecondSelection(null);
      selected.selected = false;

      const table = { ...reservationTime };

      table[position.column].hourTable[position.row] = selected;

      setReservationTime(table);
    } else {
      const table = { ...reservationTime };
      if (secondSelection) {
        console.log("Removing previous selected items");

        let i;
        for (i = 0; i < 10; i++) {
          if (i === firstSelection.row) {
          } else {
            let betweener = {
              ...reservationTime[firstSelection.column].hourTable[i],
            };
            betweener.selected = false;
            betweener.between = true;
            table[firstSelection.column].hourTable[i] = betweener;
            console.log(table[firstSelection.column].hourTable[i]);
          }
        }

        let previousSelection = {
          ...reservationTime[secondSelection.column].hourTable[
            secondSelection.row
          ],
        };
        previousSelection.selected = false;
        table[secondSelection.column].hourTable[secondSelection.row] =
          previousSelection;
        console.log(
          table[secondSelection.column].hourTable[secondSelection.row]
        );
      }

      if (selected.position.column !== firstSelection.column) {
        //console.log(selected.position.row, firstSelection.row);
        console.log("Cannot select mulitple days!");
        return;
      }
      console.log("setting second selection");
      let i;

      setSecondSelection(selected.position);

      if (selected.position.row > firstSelection.row) {
        console.log("second selection is below first selection");

        for (i = firstSelection.row; i < selected.position.row; i++) {
          let betweener = {
            ...reservationTime[firstSelection.column].hourTable[i],
          };
          betweener.selected = true;
          betweener.between = true;
          table[firstSelection.column].hourTable[i] = betweener;
          console.log(table[firstSelection.column].hourTable[i]);
        }
      } else {
        console.log("second selection is above first selection");
        for (i = firstSelection.row; i > selected.position.row; i--) {
          let betweener = {
            ...reservationTime[firstSelection.column].hourTable[i],
          };
          betweener.selected = true;
          table[firstSelection.column].hourTable[i] = betweener;
          console.log(table[firstSelection.column].hourTable[i]);
        }
      }

      selected.selected = true;

      table[position.column].hourTable[position.row] = selected;

      setReservationTime(table);
    }
  }

  return (
    <RenderReservationTime
      reservationTime={reservationTime}
      handleTimeSelection={handleTimeSelection}
    />
  );
}

function RenderReservationTime(props) {
  if (props.reservationTime) {
    return (
      <div className="time-grid">
        {createVisualTimeArray(
          props.reservationTime,
          props.handleTimeSelection
        )}
      </div>
    );
  } else {
    return <></>;
  }
}

export default TimeSelection;

const createEmptyTimeArray = () => {
  const currentDate = new Date();
  const timetable = [];
  let i;
  let j;
  for (i = 0; i < 7; i++) {
    const hourTable = [];

    for (j = 0; j < 10; j++) {
      hourTable.push({
        id: currentDate.getDay() + j,
        time: j + 7,
        reserved: false,
        selected: false,
        position: { row: j, column: i },
        between: false,
      });
    }

    timetable.push({
      id: i,
      date: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + i
      ),

      hourTable,
    });
  }
  return timetable;
};

function createVisualTimeArray(timeArray, handleTimeSelection) {
  const timetable = [];
  let i;
  let j;
  for (i = 0; i < 7; i++) {
    const hourTable = [];
    for (j = 0; j < 10; j++) {
      hourTable.push(
        <TimeSelectionTimeUnit
          className
          handleTimeSelection={handleTimeSelection}
          id={timeArray[i].hourTable[j].id}
          time={timeArray[i].hourTable[j].time}
          position={timeArray[i].hourTable[j].position}
          selected={timeArray[i].hourTable[j].selected}
          reserved={timeArray[i].hourTable[j].reserved}
          between={timeArray[i].hourTable[j].between}
        />
      );
    }

    timetable.push(
      <ul className="time-selection-list-row">
        <li className="time-selection-time-unit weekday">
          <p>{mapNumberToDay(timeArray[i].date.getDay())}</p>
        </li>
        {hourTable.map((unit) => unit)}
      </ul>
    );
  }

  return timetable;
}

function mapNumberToDay(number) {
  switch (number) {
    case 1:
      return "Mon";
    case 2:
      return "Tue";
    case 3:
      return "Wed";
    case 4:
      return "Thu";
    case 5:
      return "Fri";
    case 6:
      return "Sat";
    case 0:
      return "Sun";
    default:
      return;
  }
}

function TimeSelectionTimeUnit(props) {
  if (props.reserved) {
    return (
      <li key={props.id} className={`time-selection-time-unit`}>
        <button
          alt={`select ${props.time} o'clock`}
          className={`time-selection-time-unit-button reserved ${
            props.between ? "between" : ""
          }`}
          onClick={() => props.handleTimeSelection(props.position)}
        >
          {props.time}
        </button>
      </li>
    );
  } else if (props.selected) {
    return (
      <li key={props.id} className="time-selection-time-unit ">
        <button
          alt={`select ${props.time} o'clock`}
          className={`time-selection-time-unit-button availible selected ${
            props.between ? "between" : ""
          }`}
          onClick={() => props.handleTimeSelection(props.position)}
        >
          {props.time}
        </button>
      </li>
    );
  } else {
    return (
      <li key={props.id} className="time-selection-time-unit">
        <button
          alt={`select ${props.time} o'clock`}
          className="time-selection-time-unit-button availible"
          onClick={() => props.handleTimeSelection(props.position)}
        >
          {`${props.time}`}
        </button>
      </li>
    );
  }
}
