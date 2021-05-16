import React from "react";
import Typography from "@material-ui/core/Typography";
import { TextField } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {
    KeyboardDatePicker,
    KeyboardTimePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Controller } from "react-hook-form";
import { DataUsageOutlined } from "@material-ui/icons";

const prepareReservationTime = (props) => {
    return (
        <div className="single-activity-date cardish">
            <h2>Date and Time</h2>

            <MuiPickersUtilsProvider  utils={DateFnsUtils}>
                <div className="create-activity-dato-start">
                    <Controller
                        render={({ field }) => {
                            return (
                                <TextField
                                    {...field}
                                    error={props.errors.startTime}
                                    helperText={
                                        props.errors.startTime
                                            ? props.errors.startTime.message
                                            : null
                                    }
                                    id="datetime-picker"
                                    label="Start Time"
                                    type="datetime-local"
                                    // className={classes.textField}
                                    required
                                    // format = "yyyy-MM-dd HH:mm"
                                    // ampm={false}
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
                        defaultValue={new Date()}
                    />
                    <Controller
                        render={({ field }) => {
                            return (
                                <TextField
                                    {...field}
                                    error={props.errors.endTime}
                                    helperText={
                                        props.errors.endTime
                                            ? props.errors.endTime.message
                                            : null
                                    }
                                    id="datetime-picker"
                                    label="End Time"
                                    type="datetime-local"
                                    // className={classes.textField}
                                    required
                                    // format = "yyyy-MM-dd HH:mm"
                                    ampm={false}
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
                        defaultValue={new Date()}
                    />
                {/*    <Controller*/}
                {/*        render={({ field }) => {*/}
                {/*            return (*/}
                {/*                <KeyboardTimePicker*/}
                {/*                    {...field}*/}
                {/*                    error={props.errors.startTime}*/}
                {/*                    helperText={*/}
                {/*                        props.errors.startTime*/}
                {/*                            ? props.errors.startTime.message*/}
                {/*                            : null*/}
                {/*                    }*/}
                {/*                    key="time-picker-start"*/}
                {/*                    required*/}
                {/*                    margin="normal"*/}
                {/*                    id="time-picker"*/}
                {/*                    label="Start Time"*/}
                {/*                    variant="inline"*/}
                {/*                    // format="HH:mm"*/}
                {/*                    ampm={false}*/}
                {/*                    KeyboardButtonProps={{*/}
                {/*                        "aria-label": "change time",*/}
                {/*                    }}*/}
                {/*                />*/}
                {/*            );*/}
                {/*        }}*/}
                {/*        control={props.control}*/}
                {/*        {...props.register("startTime", {*/}
                {/*            required: "Required",*/}
                {/*        })}*/}
                {/*        defaultValue={new Date(props.startTime)}*/}
                {/*    />*/}
                {/*</div>*/}
                {/*<div className="create-activity-dato-end">*/}
                {/*    <Controller*/}
                {/*        render={({ field }) => {*/}
                {/*            return (*/}
                {/*                <KeyboardTimePicker*/}
                {/*                    {...field}*/}
                {/*                    error={props.errors.endTime}*/}
                {/*                    helperText={*/}
                {/*                        props.errors.endTime*/}
                {/*                            ? props.errors.endTime.message*/}
                {/*                            : null*/}
                {/*                    }*/}
                {/*                    required*/}
                {/*                    margin="normal"*/}
                {/*                    key="time-picker-end"*/}
                {/*                    id="time-picker"*/}
                {/*                    label="End Time"*/}
                {/*                    variant="inline"*/}
                {/*                    // format="HH:mm"*/}
                {/*                    ampm={false}*/}
                {/*                    KeyboardButtonProps={{*/}
                {/*                        "aria-label": "change time",*/}
                {/*                    }}*/}
                {/*                />*/}
                {/*            );*/}
                {/*        }}*/}
                {/*        control={props.control}*/}
                {/*        {...props.register("endTime", {*/}
                {/*            required: "Required",*/}
                {/*        })}*/}
                {/*        defaultValue={new Date(props.endTime)}*/}
                {/*    />*/}
                {/*</div>*/}
                {/*<div className="create-activity-dato-kalender">*/}
                {/*    <Controller*/}
                {/*        render={({ field }) => {*/}
                {/*            return (*/}
                {/*                <KeyboardDatePicker*/}
                {/*                    {...field}*/}
                {/*                    error={props.errors.startDate}*/}
                {/*                    helperText={*/}
                {/*                        props.errors.startDate*/}
                {/*                            ? props.errors.startDate.message*/}
                {/*                            : null*/}
                {/*                    }*/}
                {/*                    disableToolbar*/}
                {/*                    variant="inline"*/}
                {/*                    format="yyyy-MM-dd"*/}
                {/*                    margin="normal"*/}
                {/*                    id="date-picker-inline"*/}
                {/*                    label="Start Date"*/}
                {/*                    KeyboardButtonProps={{*/}
                {/*                        "aria-label": "change date",*/}
                {/*                    }}*/}
                {/*                />*/}
                {/*            );*/}
                {/*        }}*/}
                {/*        control={props.control}*/}
                {/*        {...props.register("startDate", {*/}
                {/*            required: "Required",*/}
                {/*        })}*/}
                {/*        defaultValue={new Date(props.startDate)}*/}
                {/*    />*/}
                </div>
            </MuiPickersUtilsProvider>
        </div>
    );
};

const ReservationTime = (props) => {
    return prepareReservationTime(props);
};

export default ReservationTime;