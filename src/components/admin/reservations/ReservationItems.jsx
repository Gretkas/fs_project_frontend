import React from "react";
import {Checkbox, FormControl, FormControlLabel, FormHelperText,} from "@material-ui/core";
import {Controller} from "react-hook-form";


const ReservationItems = (props) => {

    const defaultItems = [...props.items]

    const handleSelect = (checkedItem) => {
        const {items: checkedItems} = props.getValues();

        return includesItem(checkedItem)
            ? checkedItems?.filter(item => item.itemId !== checkedItem.itemId)
            : [...(checkedItems ?? []), checkedItem];
    }

    const includesItem = (checkedItem) => {
        const {items: checkedItems} = props.getValues();
        return (checkedItems?.filter(item => item.itemId === checkedItem.itemId)).length > 0;
    }

    const prepareReservationItems = () => {
        return (
            <div>
                <h2>Items</h2>

                <FormControl
                    component="fieldset"
                    error={props.errors.items}
                >
                    <FormHelperText>Select items to be reserved</FormHelperText>

                    {props.errors.items &&
                    <FormHelperText>{props.errors.items.message}</FormHelperText>
                    }
                    <Controller
                        name="items"
                        render={({field}) =>
                            defaultItems.map((item, index) => (
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            onChange={() => field.onChange(handleSelect(item))}
                                            defaultChecked={defaultItems.includes(item)}
                                        />
                                    }
                                    key={item.itemId}
                                    label={item.name}
                                />
                            ))
                        }
                        control={props.control}
                        rules={{required: "Select at least 1"}}
                    />
                </FormControl>
            </div>
        );
    };

    return prepareReservationItems();
};

export default ReservationItems;