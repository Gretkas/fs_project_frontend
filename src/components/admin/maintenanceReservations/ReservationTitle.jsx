import React from "react";
import { TextField } from "@material-ui/core";
import { Controller } from "react-hook-form";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";

const prepareReservationTitle = (props) => {
  return (
    <Controller
      render={({ field }) => {
        return (
          <>
            <h2>Title</h2>
            <TextField
              className="ReservationTitle"
              {...field}
              required
              error={props.errors.title}
              helperText={
                props.errors.title ? props.errors.title.message : null
              }
              id="standard-required"
              label="Title"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
          </>
        );
      }}
      name="title"
      control={props.control}
      defaultValue={props.title}
      rules={{
        required: "Title is required",
      }}
    />
  );
};

const ReservationTitle = (props) => {
  return prepareReservationTitle(props);
};

export default ReservationTitle;
