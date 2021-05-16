import React, {
  FunctionComponent,
  ReactElement,
  useEffect,
  useState,
} from "react";
import { defaultReservationTable } from "./TimeSelectionTable.test";
import * as TimeSelectionUnit from "./TimeSelectionUnit";

export const VisualTimeSelectionTable: FunctionComponent<IVisualTimeSelectionTable> =
  (props: IVisualTimeSelectionTable) => {
    const [reservationTable, setReservationTable] = useState(
      new TimeSelectionTable(
        props.reservedArray ? props.reservedArray : undefined
      )
    );
    useEffect(() => {}, [reservationTable.reservedArray]);

    return <></>;
  };

export class TimeSelectionTable implements ITimeSelectionTable {
  reservedArray: boolean[][];
  selectionArray: IDayArray;

  constructor(reservedArray: boolean[][] = defaultReservationTable) {
    this.reservedArray = reservedArray;
    this.selectionArray = this.convertReservedTable(reservedArray);
  }

  convertReservedTable(reservationTable: boolean[][]): IDayArray {
    const currentDate = new Date();
    const timetable = new DayArray();

    let i;
    let j;
    for (i = 0; i < NUMBER_OF_AVAILIBLE_WEEKDAYS; i++) {
      const hourTable = new HourArray(
        i,
        new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() + i
        ),
        []
      );

      for (j = 0; j < AVAILIBLE_HOURS; j++) {
        const status = reservationTable[i][j]
          ? TimeSelectionUnit.Status.RESERVED
          : TimeSelectionUnit.Status.AVAILIBLE;

        const hour = new TimeSelectionUnit.TimeSelectionUnit(
          currentDate.getDay() + j,
          j + 7,
          status,
          false,
          { row: j, column: i },
          this.handleOnclick
        );

        hourTable.addHour(hour);
      }
      timetable.addDay(hourTable);
    }
    return timetable;
  }

  handleOnclick(position: TimeSelectionUnit.Position): void {}
}

export class DayArray implements IDayArray {
  table: Array<IHourArray>;
  constructor(table: Array<IHourArray> = []) {
    this.table = table;
  }
  addDay(newDay: IHourArray): void {
    this.table.push(newDay);
  }
  disableDays(position: TimeSelectionUnit.Position): void {
    throw new Error("Method not implemented.");
  }
}

export class HourArray implements IHourArray {
  id: number;
  date: Date;
  hourTable: Array<TimeSelectionUnit.ITimeSelectionUnit>;

  constructor(
    id: number,
    date: Date,
    hourTable: Array<TimeSelectionUnit.ITimeSelectionUnit> = []
  ) {
    this.id = id;
    this.date = date;
    this.hourTable = hourTable;
  }
  getDay(): string {
    return this.mapNumberToDay(this.date.getDay());
  }
  addHour(hour: TimeSelectionUnit.TimeSelectionUnit): void {
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

export const VisualDay: FunctionComponent<IVisualHourArray> = (
  props: IVisualHourArray
) => {
  return (
    <ul className="time-selection-list-row">
      <li className="time-selection-time-unit weekday">
        <p>{props.day}</p>
      </li>
      {props.hourTable.map((unit) => unit.buildJsxElement())}
    </ul>
  );
};

export const VisualWeek: FunctionComponent<IDayArray> = (props: IDayArray) => {
  return (
    <>
      {props.table.map((day) => {
        return <VisualDay hourTable={day.hourTable} day={day.getDay()} />;
      })}
    </>
  );
};

export interface IVisualHourArray {
  hourTable: Array<TimeSelectionUnit.ITimeSelectionUnit>;
  day: string;
}
export interface IVisualWeek {
  table: Array<IDayArray>;
}

export interface IHourArray {
  id: number;
  date: Date;
  hourTable: Array<TimeSelectionUnit.ITimeSelectionUnit>;
  addHour(hour: TimeSelectionUnit.TimeSelectionUnit): void;
  mapNumberToDay(day: number): string;
  getDay(): string;
}

export interface IDayArray {
  table: Array<IHourArray>;
  disableDays(position: TimeSelectionUnit.Position): void;
  addDay(newDay: IHourArray): void;
}

export interface ITimeSelectionTable {
  reservedArray: boolean[][];
  selectionArray: IDayArray;
}
export interface IVisualTimeSelectionTable {
  reservedArray?: boolean[][];
}

export const AVAILIBLE_HOURS: number = 10;
export const NUMBER_OF_AVAILIBLE_WEEKDAYS: number = 7;
