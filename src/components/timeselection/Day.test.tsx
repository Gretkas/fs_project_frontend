import {
  AVAILIBLE_HOURS,
  exampleReservationTable,
  TimeSelectionTable,
} from "./TimeSelectionTable";
import { Status } from "./TimeSelectionUnit";

let defaultTimeSelectionTable: TimeSelectionTable;

beforeEach(() => {
  defaultTimeSelectionTable = new TimeSelectionTable(
    exampleReservationTable,
    () => {}
  );
});

describe("Test disabling of unavailible days", () => {
  test("selection of first unit", () => {
    defaultTimeSelectionTable.handleInputSelection({ row: 0, column: 0 });
    expect(
      defaultTimeSelectionTable.selectionArray.days[0].hourTable[0].status
    ).toEqual(Status.SELECTED);
  });
  test("selection of second unit", () => {
    defaultTimeSelectionTable.handleInputSelection({ row: 0, column: 0 });
    defaultTimeSelectionTable.handleInputSelection({ row: 9, column: 0 });
    expect(
      defaultTimeSelectionTable.selectionArray.days[0].hourTable[9].status
    ).toEqual(Status.SELECTED);
  });
  test("selection units inbetween", () => {
    defaultTimeSelectionTable.handleInputSelection({ row: 0, column: 0 });
    defaultTimeSelectionTable.handleInputSelection({ row: 9, column: 0 });
    let i;
    for (i = 0; i < AVAILIBLE_HOURS; i++) {
      expect(
        defaultTimeSelectionTable.selectionArray.days[0].hourTable[i].status
      ).toEqual(Status.SELECTED);
    }
  });
});
