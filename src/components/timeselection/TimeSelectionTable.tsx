import React, { FunctionComponent, ReactElement } from "react";
import * as TimeSelectionUnit from "./TimeSelectionUnit";

export default class TimeSelectionTable {}

export interface ITimeSelectionTable {}

export interface IDayHourArray {
  table: Array<ITimeSelectionDay>;
}

export interface ITimeSelectionDay {
  id: number;
  date: Date;
  hourTable: Array<TimeSelectionUnit.ITimeSelectionUnit>;
}

export const AVAILIBLE_HOURS: number = 10;
