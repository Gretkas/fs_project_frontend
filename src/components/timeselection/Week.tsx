import React, { FunctionComponent } from "react";
import { IDayArray, VisualDay } from "./Day";

export const VisualWeek: FunctionComponent<IVisualWeek> = (
  props: IVisualWeek
) => {
  return (
    <div className="time-grid">
      {props.week.days.map((day) => {
        return <VisualDay hourTable={day.hourTable} day={day.getDay()} />;
      })}
    </div>
  );
};

export interface IVisualWeek {
  week: IDayArray;
}
