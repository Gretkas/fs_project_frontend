import React, { FunctionComponent } from "react";
import { IDayArray, VisualDay } from "./Day";
import { v4 as uuidv4 } from "uuid";
import Button from "@material-ui/core/Button";
import { Position } from "./TimeSelectionUnit";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "80px",
    margin: "15px",
  },
});

export const VisualWeek: FunctionComponent<IVisualWeek> = (
  props: IVisualWeek
) => {
  const classes = useStyles();
  return (
    <>
      <div className="time-grid">
        {props.week.days.map((day) => {
          return (
            <VisualDay
              key={uuidv4()}
              hourTable={day.hourTable}
              day={day.getDay()}
            />
          );
        })}
      </div>
      <Paper className="time-selectors" elevation={5}>
        <TextField
          className={classes.root}
          required={true}
          size="small"
          id="startTime"
          label="Start"
          value={props.selection[0] ? props.selection[0] : ""}
          error={props.selection[0] === undefined ? true : false}
          helperText={
            props.selection[0] === undefined
              ? "pleace choose starting time"
              : ""
          }
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          className={classes.root}
          size="small"
          required={true}
          id="endTime"
          label="End"
          value={props.selection[1] ? props.selection[1] : ""}
          error={props.selection[1] === undefined ? true : false}
          helperText={
            props.selection[1] === undefined ? "pleace choose ending time" : ""
          }
          InputProps={{
            readOnly: true,
          }}
        />

        <Button
          size={"medium"}
          className={classes.root}
          onClick={() => {
            if (props.firstSelection) {
              props.week.onClick(props.firstSelection);
            }
          }}
          variant="outlined"
          color="primary"
        >
          clear
        </Button>
      </Paper>
    </>
  );
};

export interface IVisualWeek {
  week: IDayArray;
  selection: [number | undefined, number | undefined, Date | undefined];
  firstSelection: Position | undefined;
}
