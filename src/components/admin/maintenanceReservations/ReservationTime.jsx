import React from "react";
import { TextField } from "@material-ui/core";
import { Controller } from "react-hook-form";
import { format } from "date-fns";

const prepareReservationTime = (props) => {
  return (
    <div className="single-activity-date cardish">
      <h2>Date and Time</h2>
      <div className="create-activity-dato-start">
        <Controller
          render={({ field }) => {
            return (
              <TextField
                {...field}
                error={props.errors.startTime}
                helperText={
                  props.errors.startTime ? props.errors.startTime.message : null
                }
                id="datetime-picker"
                label="Start Time"
                type="datetime-local"
                required
                ampm="yyyy-MM-dd HH:mm"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            );
          }}
          control={props.control}
          {...props.register("startTime", {
            required: "Required",
          })}
          defaultValue={format(new Date(), "yyyy-MM-dd'T'HH:mm")}
        />
      </div>
      <div>
        <Controller
          render={({ field }) => {
            return (
              <TextField
                {...field}
                error={props.errors.endTime}
                helperText={
                  props.errors.endTime ? props.errors.endTime.message : null
                }
                id="datetime-picker"
                label="End Time"
                type="datetime-local"
                required
                ampm="yyyy-MM-dd HH:mm"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            );
          }}
          control={props.control}
          {...props.register("endTime", {
            required: "Required",
          })}
          defaultValue={format(new Date(), "yyyy-MM-dd'T'HH:mm")}
        />
      </div>
    </div>
  );
};

const ReservationTime = (props) => {
  return prepareReservationTime(props);
};

export default ReservationTime;
