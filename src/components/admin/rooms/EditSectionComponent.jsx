import React, {useEffect} from "react";
import {
    Card,
    CardHeader,
    Checkbox,
    FormControl, FormControlLabel,
    FormHelperText,
    Grid,
    List,
    ListItem, ListItemIcon, ListItemText,
    TextField
} from "@material-ui/core";
import {Controller} from "react-hook-form";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import DeleteIcon from '@material-ui/icons/Delete';
import { v4 as uuid } from "uuid";
import AddIcon from '@material-ui/icons/Add';
import {makeStyles} from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import {roomService} from "../../../data/services/rooms";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
    },
    cardHeader: {
        padding: theme.spacing(1, 2),
    },
    list: {
        width: 200,
        height: 230,
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto',
    },
    button: {
        margin: theme.spacing(0.5, 0),
    },
}));


const EditSectionComponent = (props) => {

    const {items: roomItems} = props.getValues();

    const classes = useStyles();

    const handleSelect = (checkedItem, sectionIndex, sectionId) => {
        // const {items: checkedItems} = props.getValues();

        const {sections: currentSections} = props.getValues();
        const {items: currentSectionItems} = currentSections[sectionIndex]

        if ((currentSectionItems?.filter(item => item.itemId === checkedItem.itemId)).length > 0) {
            return currentSections.map(s =>
                s.id === sectionId ? { ...s, items: currentSectionItems.filter(i => i.itemId !== checkedItem.itemId) } : s
            );
        } else {
            return currentSections.map(s =>
                s.id === sectionId ? { ...s, items: [...s.items, checkedItem] } : s
            );
        }
    }

    const appendSection = (section) => {
        const {sections: currentSections} = props.getValues();
        return [...(currentSections ?? []), section];
    }

    const removeSection = (section) => {
        const {sections: currentSections} = props.getValues();
        return currentSections?.filter(s => s.id !== section.id);
    }

    // const appendSectionItem = (item, sectionId) => {
    //     const {sections: currentSections} = props.getValues();
    //
    //     return currentSections.map(s =>
    //         s.id === sectionId ? { ...s, items: [...s.items, item] } : s
    //     );
    // }
    //
    // const removeSectionItem = (item, sectionIndex, sectionId) => {
    //     const {sections: currentSections} = props.getValues();
    //     const {items: currentSectionItems} = currentSections[sectionIndex]
    //
    //     return currentSections.map(s =>
    //         s.id === sectionId ? { ...s, items: currentSectionItems.filter(i => i.itemId !== item.itemId) } : s
    //     );
    // }

    const prepareEditSectionComponent = () => {
        return(
            <div>
                <Grid container spacing={2} direction="column">
                    <FormControl
                        component="fieldset"
                        error={props.errors.sections}
                    >
                        {props.errors.sections &&
                        <FormHelperText>{props.errors.sections.message}</FormHelperText>
                        }
                        <Controller
                            name="sections"
                            render={({field}) => {
                                            return(
                                                <div>
                                                    {field.value.map((section, sectionIndex) => {
                                                        return(
                                                            <div>
                                                                <Grid item xs>
                                                                    <TextField
                                                                        variant="outlined"
                                                                        fullWidth
                                                                        key={section.id}
                                                                        defaultValue={section.name}
                                                                        label="Seksjonsnavn"
                                                                        InputProps={{
                                                                            endAdornment:
                                                                                <InputAdornment position="end">
                                                                                    <IconButton
                                                                                        aria-label="toggle password visibility"
                                                                                        onClick={() => field.onChange(removeSection(section))}
                                                                                        edge="end"
                                                                                    >
                                                                                        <DeleteIcon />
                                                                                    </IconButton>
                                                                                </InputAdornment>
                                                                        }}
                                                                    />

                                                                    <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
                                                                        <Grid item>
                                                                            <Card>
                                                                                <CardHeader
                                                                                    className={classes.cardHeader}
                                                                                    title="Seksjonsutstyr"
                                                                                />
                                                                                <Divider />

                                                                                <FormControl
                                                                                    component="fieldset"
                                                                                >

                                                                                    <>
                                                                                        {props.getValues("items")?.map((item, index) => {
                                                                                            return(
                                                                                                <Grid item xs>
                                                                                                    <FormControlLabel
                                                                                                        control={
                                                                                                            <Checkbox
                                                                                                                onChange={() => field.onChange(handleSelect(item, sectionIndex, section.id))}
                                                                                                                defaultChecked={section.items.filter(i => i.itemId === item.itemId).length > 0}
                                                                                                            />
                                                                                                        }
                                                                                                        key={item.itemId}
                                                                                                        label={item.name}
                                                                                                    />
                                                                                                </Grid>
                                                                                            )
                                                                                        })}
                                                                                    </>
                                                                                </FormControl>
                                                                            </Card>
                                                                        </Grid>

                                                                    </Grid>
                                                                </Grid>
                                                            </div>
                                                        )})}
                                                        <Grid item>
                                                            <TextField
                                                                variant="outlined"
                                                                fullWidth
                                                                key={uuid()}
                                                                name="newSectionName"
                                                                // innerRef={textfieldValue}
                                                                label="Seksjonsnavn"
                                                                InputProps={{
                                                                    endAdornment:
                                                                        <InputAdornment position="end">
                                                                            <IconButton
                                                                                aria-label="toggle password visibility"
                                                                                onClick={() =>
                                                                                    field.onChange(appendSection({
                                                                                        name: document.getElementsByName("newSectionName")[0].value,
                                                                                        id: null,
                                                                                        items: []
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
                                                </div>
                                            )}}
                            control={props.control}
                        />
                    </FormControl>
                </Grid>
            </div>
        )
}

    return prepareEditSectionComponent();
};

export default EditSectionComponent;