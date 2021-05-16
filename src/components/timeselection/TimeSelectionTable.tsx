/**
 * @author Sigmund Sandring <sigmundsgranaas@gmail.com>
 *
 * Managing and rendering timetables of reserved and availible a hours
 */

import React, { FunctionComponent, useEffect, useState } from "react";
import { DayArray, IDayArray, Day } from "./Day";
import TimeSelectionUnit, { Position, Status } from "./TimeSelectionUnit";
import { VisualWeek } from "./Week";

/**
 * Functional component to render a timetable of reserved and availible hours
 *
 * @param props Takes in an optional byteMatrix
 *
 * @returns JSX Element
 */
export const VisualTimeSelectionTable: FunctionComponent<IVisualTimeSelectionTable> =
  (props: IVisualTimeSelectionTable) => {
    const [reservationTable, setReservationTable] = useState(
      new TimeSelectionTable(
        props.reservedArray ? props.reservedArray : exampleReservationTable,
        handleOnclick
      )
    );

    useEffect(() => {}, [reservationTable.selectionArray]);

    function handleOnclick(position: Position): void {
      setReservationTable(reservationTable.handleInputSelection(position));
    }
    return <VisualWeek week={reservationTable.selectionArray} />;
  };

export default VisualTimeSelectionTable;

/**
 * TimeSelectionTable maintains the logic and data of the ReservationTable.
 * This class is responsible for creating and converting bytematrixes into day, week and hour objects
 * As well as updating selection and enforce selection logic
 *
 * @todo subclasses need to manage their own children. This class should not manage individual hours.
 *
 * @todo need to calculate output hours from selection
 *
 * @todo Needs to separate onClick function to the visual component
 *
 * Still relies on a visual component to handle onClick method.
 */

export class TimeSelectionTable implements ITimeSelectionTable {
  reservedArray: boolean[][];
  selectionArray: DayArray;
  onClick: (position: Position) => void;
  firstSelection: Position | undefined = undefined;
  secondSelection: Position | undefined = undefined;

  constructor(
    reservedArray: boolean[][] = defaultReservationTable,
    onClick: (position: Position) => void
  ) {
    this.onClick = onClick;
    this.reservedArray = reservedArray;
    this.selectionArray = this.convertReservedTable(reservedArray);
  }

  clearSelection(): IDayArray {
    return this.convertReservedTable(this.reservedArray);
  }

  /**
   * This function is called in the constructor to create the inital reservation structure,
   * and to clean the structure if selection is cleared.
   *
   * @param reservationTable Takes a bytematrix with reservations
   * @returns converted reservationTable with all objects filled in
   */
  convertReservedTable(reservationTable: boolean[][]): IDayArray {
    const currentDate = new Date();
    const timetable = new DayArray();

    let i;
    let j;
    for (i = 0; i < NUMBER_OF_AVAILIBLE_WEEKDAYS; i++) {
      const hourTable = new Day(
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
          ? Status.RESERVED
          : Status.AVAILIBLE;

        const hour = new TimeSelectionUnit(
          currentDate.getDay() + j,
          j + 7,
          status,
          false,
          { row: j, column: i },
          this.onClick
        );

        hourTable.addHour(hour);
      }
      timetable.addDay(hourTable);
    }
    return timetable;
  }

  /**
   * methods responsible for andling different scenarios for when a button is clicked.
   *
   * @param position takes row and column position of the element that is selected.
   * @returns
   */
  handleInputSelection(position: Position): TimeSelectionTable {
    console.log("A timeunit has been selected", position);
    if (this.firstSelection === undefined) {
      console.log("Updating first selection");
      this.updateFirstSelection(position);
      return { ...this };
    }
    if (position === this.firstSelection || position === this.secondSelection) {
      console.log("removing current selection");
      this.removeSelection();
      return { ...this };
    }
    if (!this.secondSelection) {
      console.log("Setting second selection");
      this.updateSecondSelection(position);
      return { ...this };
    } else {
      console.log("updating selection");
      const firstSelection = { ...this.firstSelection };
      this.removeSelection();
      this.updateFirstSelection(firstSelection);
      this.updateSecondSelection(position);
      return { ...this };
    }
  }
  private updateSecondSelection(position: Position) {
    this.secondSelection = position;
    let i;
    if (this.firstSelection && position.row > this.firstSelection.row) {
      console.log("second selection is below first selection");
      for (i = this.firstSelection.row; i <= position.row; i++) {
        const timeUnit: TimeSelectionUnit = {
          ...this.selectionArray.days[position.column].hourTable[i],
        };
        const newTimeUnit = new TimeSelectionUnit(
          timeUnit.id,
          timeUnit.time,
          Status.SELECTED,
          false,
          timeUnit.position,
          timeUnit.onClick
        );

        this.selectionArray.days[position.column].hourTable[i] = newTimeUnit;
      }
    } else if (this.firstSelection) {
      console.log("second selection is above first selection");
      for (i = this.firstSelection.row; i >= position.row; i--) {
        const timeUnit: TimeSelectionUnit = {
          ...this.selectionArray.days[position.column].hourTable[i],
        };
        const newTimeUnit = new TimeSelectionUnit(
          timeUnit.id,
          timeUnit.time,
          Status.SELECTED,
          false,
          timeUnit.position,
          timeUnit.onClick
        );
        this.selectionArray.days[position.column].hourTable[i] = newTimeUnit;
      }
    }
  }

  private removeSelection() {
    this.firstSelection = undefined;
    this.secondSelection = undefined;
    this.selectionArray = this.convertReservedTable(this.reservedArray);
  }

  private updateFirstSelection(position: Position) {
    this.firstSelection = position;

    const timeUnit: TimeSelectionUnit = {
      ...this.selectionArray.days[position.column].hourTable[position.row],
    };
    const newTimeUnit = new TimeSelectionUnit(
      timeUnit.id,
      timeUnit.time,
      Status.SELECTED,
      false,
      position,
      timeUnit.onClick
    );

    this.selectionArray.days[position.column].hourTable[position.row] =
      newTimeUnit;

    this.selectionArray.disableDays(position);
  }

  getReservationTIme() {}

  updateTimeTable(newTimeTable: DayArray) {
    this.selectionArray = newTimeTable;
  }
}

export interface ITimeSelectionTable {
  reservedArray: boolean[][];
  selectionArray: IDayArray;
  onClick(position: Position): void;
}
export interface IVisualTimeSelectionTable {
  reservedArray?: boolean[][];
}

export const AVAILIBLE_HOURS: number = 10;
export const NUMBER_OF_AVAILIBLE_WEEKDAYS: number = 7;

export const exampleReservationTable = [
  [false, true, true, true, true, true, true, true, true, true],
  [false, true, true, false, false, false, false, true, true, true],
  [false, true, true, true, true, true, true, true, true, true],
  [false, true, true, false, true, false, true, true, true, true],
  [false, true, true, false, false, false, true, false, false, false],
  [false, true, false, false, false, false, true, true, true, true],
  [false, false, true, true, true, false, false, false, true, true],
];

export const defaultReservationTable = [
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
];
