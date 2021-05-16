import React from "react";
import Typography from "@material-ui/core/Typography";
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    FormLabel,
    Input,
    List,
    ListItem,
    TextField
} from "@material-ui/core";
import { useFieldArray, Controller } from "react-hook-form";

const prepareReservationItems = (props) => {
    return (
        <div>
            <h2>Items</h2>
            <Controller
                render={({ field }) => {
                    return (
                        <FormControl
                            error={props.errors.items}
                            // helperText={
                            //     props.errors.items
                            //         ? props.errors.items.message
                            //         : ""
                            // }
                            component="fieldset"
                        >
                            <FormLabel component="legend">Assign responsibility</FormLabel>

                            <FormGroup
                                className="select-reservation-items"
                                {...field}
                            >
                                {props.items.map((item) => {
                                    return (
                                        <FormControlLabel
                                        control={<Checkbox checked/>}
                                        // value={item}
                                        label={item.name}
                                    />);
                                })}
                            </FormGroup>
                            <FormHelperText>Be careful</FormHelperText>

                            {props.errors.items && (
                                <FormHelperText>
                                    {props.errors.items.message}
                                </FormHelperText>
                            )}
                        </FormControl>
                    );
                }}
                name="items"
                control={props.control}
                defaultValue={props.items}
                rules={{ required: "At least 1 is required" }}
            />

        </div>
    );
};

const ReservationItems = (props) => {
    return prepareReservationItems(props);
};

export default ReservationItems;