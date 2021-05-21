import React from "react";
import {FormControl, FormHelperText, Grid, TextField} from "@material-ui/core";
import {Controller} from "react-hook-form";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import DeleteIcon from '@material-ui/icons/Delete';
import { v4 as uuid } from "uuid";
import AddIcon from '@material-ui/icons/Add';

const EditItemsComponent = (props) => {

    const appendItem = (item) => {
        const {items: currentItems} = props.getValues();
        return [...(currentItems ?? []), item];
    }

    const removeItem = (item) => {
        const {items: currentItems} = props.getValues();
        return currentItems?.filter(i => i.itemId !== item.itemId);
    }


    const prepareEditItemsComponent = () => {
        return(
            <Grid container spacing={2} direction="column">
                <FormControl
                    component="fieldset"
                    error={props.errors.items}
                >
                    {props.errors.items &&
                    <FormHelperText>{props.errors.items.message}</FormHelperText>
                    }
                    <Controller
                        name="items"
                        render={({field}) => {
                            return (
                                <>
                                    {field.value
                                        .map((item, index) => {
                                            return(
                                                <Grid item xs>
                                                    <TextField
                                                        variant="outlined"
                                                        fullWidth
                                                        key={item.itemId}
                                                        defaultValue={item.name}
                                                        label="Utstyr Navn"
                                                        InputProps={{
                                                            endAdornment:
                                                                <InputAdornment position="end">
                                                                    <IconButton
                                                                        aria-label="toggle password visibility"
                                                                        onClick={() => field.onChange(removeItem(item))}
                                                                        edge="end"
                                                                    >
                                                                        <DeleteIcon />
                                                                    </IconButton>
                                                                </InputAdornment>
                                                        }}
                                                    />
                                                </Grid>
                                            )
                                        })}

                                    <Grid item>
                                        <TextField
                                            variant="outlined"
                                            fullWidth
                                            key={uuid()}
                                            name="newItemName"
                                            label="Utstyr Navn"
                                            InputProps={{
                                                endAdornment:
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={() =>
                                                                field.onChange(appendItem({
                                                                    name: document.getElementsByName("newItemName")[0].value,
                                                                    itemId: null
                                                                }))
                                                            }
                                                            edge="end"
                                                        >
                                                            <AddIcon />
                                                        </IconButton>
                                                    </InputAdornment>
                                            }}
                                        />
                                    </Grid>
                                </>
                            );
                        }}
                        control={props.control}
                    />
                </FormControl>
            </Grid>
        );
    };

    return prepareEditItemsComponent();
};

export default EditItemsComponent;