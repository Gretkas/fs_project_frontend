import React, { FunctionComponent, ReactElement } from "react";

import "./timeselection.css";

/**
 * Managing and rendering Time Selection Units
 *
 * @author Sigmund Sandring <sigmundsgranaas@gmail.com>
 */

/**
 * Status enum for TimeUnits
 *
 *  @type AVAILIBLE for units that are selectable
 *  @type RESERVED for units that are reserved or unselectable
 *  @type SELECTED for units that are selected or between two selected points
 */
export enum Status {
  AVAILIBLE,
  RESERVED,
  SELECTED,
}

/**
 * Class representing a single hour unit un the weektime hour picker.
 *
 * @remarks
 * Needs to call buildJsxElement() to produce a react element
 *
 * @author Sigmund Sandring <sigmundsgranaas@gmail.com>
 */
export class TimeSelectionUnit implements ITimeSelectionUnit {
  id: number;
  time: number;
  status: Status;
  between: boolean;
  position: Position;
  onClick: (position: Position) => void;

  constructor(
    id: number,
    time: number,
    status: Status,
    between: boolean,
    position: Position,
    onClick: (position: Position) => void
  ) {
    this.id = id;
    this.time = time;
    this.status = status;
    this.between = between;
    this.position = position;
    this.onClick = onClick;
  }

  setStatus(newStatus: Status) {
    this.status = newStatus;
  }

  /**
   * Renders a react element representation of the class
   *
   *
   * @see Status
   *
   * @returns a ReactElement corresponding to the status of the object
   */
  buildJsxElement(): ReactElement<ITimeSelectionUnit> {
    switch (this.status) {
      case Status.SELECTED: {
        return (
          <VisualTimeUnitSelected
            id={this.id}
            time={this.time}
            position={this.position}
            onClick={this.onClick}
          />
        );
      }

      case Status.RESERVED: {
        return (
          <VisualTimeUnitReserved
            id={this.id}
            time={this.time}
            position={this.position}
            onClick={this.onClick}
          />
        );
      }
      default: {
        return (
          <VisualTimeUnitAvailible
            id={this.id}
            time={this.time}
            position={this.position}
            onClick={this.onClick}
          />
        );
      }
    }
  }
}

/**
 *  Functional react component representing a avalilble hour unit
 *
 *
 * @param IVisualTimeUnit
 *
 * @returns JSXElement
 */
export const VisualTimeUnitAvailible: FunctionComponent<IVisualTimeUnit> = (
  props: IVisualTimeUnit
) => {
  return (
    <li
      data-testid="availible"
      key={props.id}
      className="time-selection-time-unit"
    >
      <button
        className="time-selection-time-unit-button availible"
        onClick={() => props.onClick(props.position)}
      >
        {`${props.time}`}
      </button>
    </li>
  );
};

/**
 *  Functional react component representing a selected hour unit
 *
 *
 * @param IVisualTimeUnit
 *
 * @returns JSXElement
 */
export const VisualTimeUnitSelected: FunctionComponent<IVisualTimeUnit> = (
  props: IVisualTimeUnit
) => {
  return (
    <li
      data-testid="selected"
      key={props.id}
      className="time-selection-time-unit "
    >
      <button
        className={`time-selection-time-unit-button availible selected`}
        onClick={() => props.onClick(props.position)}
      >
        {props.time}
      </button>
    </li>
  );
};

/**
 *  Functional react component representing a reserved hour unit
 *
 *
 * @param IVisualTimeUnit
 *
 * @returns JSXElement
 */
export const VisualTimeUnitReserved: FunctionComponent<IVisualTimeUnit> = (
  props: IVisualTimeUnit
) => {
  return (
    <li
      data-testid="reserved"
      key={props.id}
      className={`time-selection-time-unit`}
    >
      <button
        className={`time-selection-time-unit-button reserved `}
        disabled={true}
      >
        {props.time}
      </button>
    </li>
  );
};

export default TimeSelectionUnit;

export interface ITimeSelectionUnit {
  id: number;
  time: number;
  status: Status;
  between: boolean;
  position: Position;
  onClick: (position: Position) => void;
  buildJsxElement: () => ReactElement<ITimeSelectionUnit>;
}

export interface IVisualTimeUnit {
  id: number;
  time: number;
  position: Position;
  onClick: (position: Position) => void;
}

/**
 * Position interface for creating positions in the week/hour grid
 */
interface Position {
  readonly row: number;
  readonly column: number;
}
