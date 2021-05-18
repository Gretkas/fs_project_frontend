import {
  AVAILIBLE_HOURS,
  defaultReservationTable,
  exampleReservationTable,
  NUMBER_OF_AVAILIBLE_WEEKDAYS,
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

describe("Test selection logic of TimeSelectionTable", () => {
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

describe("convert bit-matrix to TimeSelectionTable", () => {
  test("Assert that The default table has been mapped correctly", () => {
    expect(defaultTimeSelectionTable.selectionArray.days.length).toBe(
      NUMBER_OF_AVAILIBLE_WEEKDAYS
    );
    expect(
      defaultTimeSelectionTable.selectionArray.days[0].hourTable.length
    ).toBe(AVAILIBLE_HOURS);
  });

  test("TimeUnits availability should be mapped correctly with examplevalues", () => {
    expect(
      defaultTimeSelectionTable.selectionArray.days[0].hourTable[0].status
    ).toEqual(Status.AVAILIBLE);
    expect(
      defaultTimeSelectionTable.selectionArray.days[0].hourTable[9].status
    ).toEqual(Status.RESERVED);
    expect(
      defaultTimeSelectionTable.selectionArray.days[6].hourTable[9].status
    ).toEqual(Status.RESERVED);
    expect(
      defaultTimeSelectionTable.selectionArray.days[6].hourTable[0].status
    ).toEqual(Status.AVAILIBLE);
  });

  test("TimeUnits availability should be mapped correctly with default values", () => {
    defaultTimeSelectionTable = new TimeSelectionTable(
      defaultReservationTable,
      () => {}
    );
    expect(
      defaultTimeSelectionTable.selectionArray.days[0].hourTable[0].status
    ).toEqual(Status.AVAILIBLE);
    expect(
      defaultTimeSelectionTable.selectionArray.days[0].hourTable[9].status
    ).toEqual(Status.AVAILIBLE);
    expect(
      defaultTimeSelectionTable.selectionArray.days[6].hourTable[0].status
    ).toEqual(Status.AVAILIBLE);
    expect(
      defaultTimeSelectionTable.selectionArray.days[6].hourTable[9].status
    ).toEqual(Status.AVAILIBLE);
  });

  test("TimeUnits position should be mapped correctly", () => {
    expect(
      defaultTimeSelectionTable.selectionArray.days[0].hourTable[0].position
    ).toEqual({ row: 0, column: 0 });
    expect(
      defaultTimeSelectionTable.selectionArray.days[0].hourTable[9].position
    ).toEqual({ row: 9, column: 0 });
    expect(
      defaultTimeSelectionTable.selectionArray.days[6].hourTable[9].position
    ).toEqual({ row: 9, column: 6 });
    expect(
      defaultTimeSelectionTable.selectionArray.days[6].hourTable[0].position
    ).toEqual({ row: 0, column: 6 });
  });
});
