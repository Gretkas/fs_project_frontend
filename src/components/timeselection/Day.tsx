import { FunctionComponent } from "react";
import {
  NUMBER_OF_AVAILIBLE_WEEKDAYS,
  AVAILIBLE_HOURS,
} from "./TimeSelectionTable";
import TimeSelectionUnit, {
  ITimeSelectionUnit,
  Position,
  Status,
} from "./TimeSelectionUnit";

/**
 * class responsible for maintaning a single day colum
 * main functionality oif this class is to disable a row of days,
 * and remove possible invalid selections
 *
 * @author Sigmund Sandring <sigmundsgranaas@gmail.com>
 *
 *
 */
export class DayArray implements IDayArray {
  days: Array<IDay>;
  constructor(onClick: (position: Position) => void, table: Array<IDay> = []) {
    this.days = table;
    this.onClick = onClick;
  }
  onClick: (position: Position) => void;

  addDay(newDay: IDay): void {
    this.days.push(newDay);
  }

  /**
   * This method will be run upon first selection of an element to rule out all invalid reservations
   *
   * @todo separate disableDays method into smaller functions
   *
   * @param position Takes in the postion of the column which should still be enabled
   */
  disableDays(position: Position): void {
    console.info("Disabling unavailible days");
    let i;
    let j;
    for (i = 0; i < NUMBER_OF_AVAILIBLE_WEEKDAYS; i++) {
      if (i === position.column) {
        let above;
        let below;
        let reservedAbove = false;
        let reservedBelow = false;
        for (above = position.row; above < AVAILIBLE_HOURS; above++) {
          if (this.days[i].hourTable[above].status === Status.RESERVED) {
            reservedAbove = true;
          }
          if (reservedAbove) {
            const timeUnit = this.days[i].hourTable[above];

            const newTimeUnit = new TimeSelectionUnit(
              timeUnit.id,
              timeUnit.time,
              Status.RESERVED,
              false,
              position,
              timeUnit.onClick
            );
            this.days[i].hourTable[above] = newTimeUnit;
          }
        }
        for (below = position.row; below >= 0; below--) {
          if (this.days[i].hourTable[below].status === Status.RESERVED) {
            reservedBelow = true;
          }
          if (reservedBelow) {
            const timeUnit = this.days[i].hourTable[below];

            const newTimeUnit = new TimeSelectionUnit(
              timeUnit.id,
              timeUnit.time,
              Status.RESERVED,
              false,
              position,
              timeUnit.onClick
            );
            this.days[i].hourTable[below] = newTimeUnit;
          }
        }
      } else {
        for (j = 0; j < AVAILIBLE_HOURS; j++) {
          const timeUnit = this.days[i].hourTable[j];

          const newTimeUnit = new TimeSelectionUnit(
            timeUnit.id,
            timeUnit.time,
            Status.RESERVED,
            false,
            position,
            timeUnit.onClick
          );
          this.days[i].hourTable[j] = newTimeUnit;
        }
      }
    }
  }
}

export class Day implements IDay {
  id: number;
  date: Date;
  hourTable: Array<ITimeSelectionUnit>;

  constructor(
    id: number,
    date: Date,
    hourTable: Array<ITimeSelectionUnit> = []
  ) {
    this.id = id;
    this.date = date;
    this.hourTable = hourTable;
  }
  getDay(): string {
    return this.mapNumberToDay(this.date.getDay());
  }
  addHour(hour: TimeSelectionUnit): void {
    this.hourTable.push(hour);
  }

  mapNumberToDay(day: number): string {
    switch (day) {
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
        return "";
    }
  }
}

export const VisualDay: FunctionComponent<IVisualDay> = (props: IVisualDay) => {
  return (
    <ul className="time-selection-list-row">
      <li className="time-selection-time-unit weekday">
        <p>{props.day}</p>
      </li>
      {props.hourTable.map((unit) => unit.buildJsxElement())}
    </ul>
  );
};

export interface IDay {
  id: number;
  date: Date;
  hourTable: Array<ITimeSelectionUnit>;
  addHour(hour: TimeSelectionUnit): void;
  mapNumberToDay(day: number): string;
  getDay(): string;
}

export interface IDayArray {
  days: Array<IDay>;
  disableDays(position: Position): void;
  addDay(newDay: IDay): void;
  onClick: (position: Position) => void;
}

export interface IVisualDay {
  hourTable: Array<ITimeSelectionUnit>;
  day: string;
}
