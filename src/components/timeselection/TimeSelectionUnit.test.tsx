import { render, screen } from "@testing-library/react";

import * as TimeSelectionUnit from "./TimeSelectionUnit";

let defaultTimeSelectionUnit: TimeSelectionUnit.TimeSelectionUnit;

beforeEach(() => {
  defaultTimeSelectionUnit = new TimeSelectionUnit.TimeSelectionUnit(
    "1",
    10,
    TimeSelectionUnit.Status.AVAILIBLE,
    true,
    { row: 1, column: 1 },
    () => {}
  );
});

describe("TimeSelectionUnit", () => {
  test("Should create Availible time unit react element", () => {
    const visualTimeUnit = defaultTimeSelectionUnit.buildJsxElement();
    render(visualTimeUnit);
    screen.getByTestId("availible");
  });

  test("Should create Reserved time unit react element", () => {
    defaultTimeSelectionUnit.setStatus(TimeSelectionUnit.Status.RESERVED);
    const visualTimeUnit = defaultTimeSelectionUnit.buildJsxElement();
    render(visualTimeUnit);
    screen.getByTestId("reserved");
  });
  test("Should create Selected time unit react element", () => {
    defaultTimeSelectionUnit.setStatus(TimeSelectionUnit.Status.SELECTED);
    const visualTimeUnit = defaultTimeSelectionUnit.buildJsxElement();
    render(visualTimeUnit);
    screen.getByTestId("selected");
  });
});

describe("<VisualTimeUnit />", () => {
  test("should send position when clicked", async () => {
    // ???
  });
});

describe("<VisualTimeUnitReserved />", () => {
  test("should not be able to click button when reserved", async () => {
    defaultTimeSelectionUnit.setStatus(TimeSelectionUnit.Status.RESERVED);
    const visualTimeUnit = defaultTimeSelectionUnit.buildJsxElement();
    render(visualTimeUnit);
    const visualReservedUnit = screen.getByRole("button");
    expect(visualReservedUnit.closest("button")).toBeDisabled();
  });
});
