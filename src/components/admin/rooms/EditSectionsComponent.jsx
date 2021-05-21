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

function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
    return [...a, ...not(b, a)];
}

const EditSectionsComponent = (props) => {

    const {items: roomItems} = props.getValues();

    useEffect(() => {
        // return () => {
        //     mounted = false;
        //     setUpdatedRoom(null);
        // };
    }, [roomItems]);

    const classes = useStyles();
    const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState(roomItems);
    const [right, setRight] = React.useState([]);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const numberOfChecked = (items) => intersection(checked, items).length;

    const handleToggleAll = (items) => () => {
        if (numberOfChecked(items) === items.length) {
            setChecked(not(checked, items));
        } else {
            setChecked(union(checked, items));
        }
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    // const handleSelect = (checkedItem) => {
    //     const {items: checkedItems} = props.getValues();
    //
    //     return includesItem(checkedItem)
    //         ? checkedItems?.filter(item => item.itemId !== checkedItem.itemId)
    //         : [...(checkedItems ?? []), checkedItem];
    // }
    //
    // const includesItem = (checkedItem) => {
    //     const {items: checkedItems} = props.getValues();
    //     return (checkedItems?.filter(item => item.itemId === checkedItem.itemId)).length > 0;
    // }

    const customList = (title, items) => (
        <Card>
            <CardHeader
                className={classes.cardHeader}
                avatar={
                    <Checkbox
                        onClick={handleToggleAll(items)}
                        checked={numberOfChecked(items) === items.length && items.length !== 0}
                        indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
                        disabled={items.length === 0}
                        inputProps={{ 'aria-label': 'all items selected' }}
                    />
                }
                title={title}
                subheader={`${numberOfChecked(items)}/${items.length} selected`}
            />
            <Divider />
            <List className={classes.list} dense component="div" role="list">
                {items.map((item) => {
                    const labelId = `transfer-list-all-item-${item.itemId}-label`;

                    return (
                        <ListItem key={item.itemId} role="listitem" button onClick={handleToggle(item)}>
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(item) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={item.name} />
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </Card>
    );

    const appendSection = (section) => {
        const {sections: currentSections} = props.getValues();
        return [...(currentSections ?? []), section];
    }

    const removeSection = (section) => {
        const {sections: currentSections} = props.getValues();
        return currentSections?.filter(s => s.id !== section.id);
    }

    const appendSectionItems = (sectionId) => {
        const {sections: currentSections} = props.getValues();

        return currentSections.map(s =>
            s.id === sectionId ? { ...s, items: [...s.items, [...left]] } : s
        );
    }

    const removeSectionItems = (sectionIndex, sectionId) => {
        const {sections: currentSections} = props.getValues();
        const {items: currentSectionItems} = currentSections[sectionIndex]

        return currentSections.map(s =>
            s.id === sectionId ? { ...s, items: currentSectionItems.filter(i => right.forEach(it => i.itemId !== it.itemId)) } : s
        );
    }

    const prepareEditSectionsComponent = () => {
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
                                return (
                                    <>
                                        {field.value.map((section, sectionIndex) => {
                                            return(
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
                                                        <Grid item>{customList('Utstyr i rommet', left)}</Grid>
                                                        <Grid item>
                                                            <Grid container direction="column" alignItems="center">
                                                                <Button
                                                                    variant="outlined"
                                                                    size="small"
                                                                    className={classes.button}
                                                                    onClick={() => field.onChange(handleCheckedRight)}
                                                                    disabled={leftChecked.length === 0}
                                                                    aria-label="move selected right"
                                                                >
                                                                    &gt;
                                                                </Button>
                                                                <Button
                                                                    variant="outlined"
                                                                    size="small"
                                                                    className={classes.button}
                                                                    onClick={() => field.onChange(handleCheckedLeft)}
                                                                    disabled={rightChecked.length === 0}
                                                                    aria-label="move selected left"
                                                                >
                                                                    &lt;
                                                                </Button>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item>
                                                            <Card>
                                                                <CardHeader
                                                                    className={classes.cardHeader}
                                                                    avatar={
                                                                        <Checkbox
                                                                            onClick={handleToggleAll(field.value[sectionIndex].items)}
                                                                            checked={numberOfChecked(field.value[sectionIndex].items) === field.value[sectionIndex].items && field.value[sectionIndex].items.length !== 0}
                                                                            indeterminate={numberOfChecked(field.value[sectionIndex].items) !== field.value[sectionIndex].items.length && numberOfChecked(field.value[sectionIndex].items) !== 0}
                                                                            disabled={field.value[sectionIndex].items.length === 0}
                                                                            inputProps={{ 'aria-label': 'all items selected' }}
                                                                        />
                                                                    }
                                                                    title="Seksjonsutstyr"
                                                                    subheader={`${numberOfChecked(field.value[sectionIndex].items)}/${field.value[sectionIndex].items.length} selected`}
                                                                />
                                                                <Divider />

                                                                <List className={classes.list} dense component="div" role="list">
                                                                    {field.value[sectionIndex].items?.map((item, index) => {

                                                                        const labelId = `transfer-list-all-item-${item.itemId}-label`;

                                                                        return (
                                                                            <ListItem key={item.itemId} role="listitem" button onClick={handleToggle(item)}>
                                                                                <ListItemIcon>
                                                                                    <Checkbox
                                                                                        checked={checked.indexOf(item) !== -1}
                                                                                        tabIndex={-1}
                                                                                        disableRipple
                                                                                        inputProps={{ 'aria-labelledby': labelId }}
                                                                                    />
                                                                                </ListItemIcon>
                                                                                <ListItemText id={labelId} primary={item.name} />
                                                                            </ListItem>
                                                                        );
                                                                    })}
                                                                    <ListItem />
                                                                </List>
                                                            </Card>
                                                        </Grid>
                                                    </Grid>

                                                    {/*<FormControl*/}
                                                    {/*    component="fieldset"*/}
                                                    {/*>*/}

                                                    {/*    <>*/}
                                                    {/*        {field.value[sectionIndex].items?.map((item, index) => {*/}
                                                    {/*            return(*/}
                                                    {/*                <Grid item xs>*/}
                                                    {/*                    <TextField*/}
                                                    {/*                        variant="outlined"*/}
                                                    {/*                        fullWidth*/}
                                                    {/*                        key={item.itemId}*/}
                                                    {/*                        defaultValue={item.name}*/}
                                                    {/*                        label="Utstyr Navn"*/}
                                                    {/*                        InputProps={{*/}
                                                    {/*                            endAdornment:*/}
                                                    {/*                                <InputAdornment position="end">*/}
                                                    {/*                                    <IconButton*/}
                                                    {/*                                        aria-label="toggle password visibility"*/}
                                                    {/*                                        onClick={() => field.onChange(removeSectionItem(item, sectionIndex, section.id))}*/}
                                                    {/*                                        edge="end"*/}
                                                    {/*                                    >*/}
                                                    {/*                                        <DeleteIcon />*/}
                                                    {/*                                    </IconButton>*/}
                                                    {/*                                </InputAdornment>*/}
                                                    {/*                        }}*/}
                                                    {/*                    />*/}
                                                    {/*                </Grid>*/}
                                                    {/*            )*/}
                                                    {/*        })}*/}

                                                    {/*        <Grid item>*/}
                                                    {/*            <TextField*/}
                                                    {/*                variant="outlined"*/}
                                                    {/*                fullWidth*/}
                                                    {/*                key={uuid()}*/}
                                                    {/*                name={`newSectionItemName${sectionIndex}`}*/}
                                                    {/*                // innerRef={textfieldValue}*/}
                                                    {/*                label="Utstyr Navn"*/}
                                                    {/*                InputProps={{*/}
                                                    {/*                    endAdornment:*/}
                                                    {/*                        <InputAdornment position="end">*/}
                                                    {/*                            <IconButton*/}
                                                    {/*                                aria-label="toggle password visibility"*/}
                                                    {/*                                onClick={() =>*/}
                                                    {/*                                    field.onChange(appendSectionItem({*/}
                                                    {/*                                        name: document.getElementsByName(`newSectionItemName${sectionIndex}`)[0].value,*/}
                                                    {/*                                        itemId: null*/}
                                                    {/*                                    }, section.id))*/}
                                                    {/*                                }*/}
                                                    {/*                                edge="end"*/}
                                                    {/*                            >*/}
                                                    {/*                                <AddIcon />*/}
                                                    {/*                            </IconButton>*/}
                                                    {/*                        </InputAdornment>*/}
                                                    {/*                }}*/}
                                                    {/*            />*/}
                                                    {/*        </Grid>*/}
                                                    {/*    </>*/}
                                                    {/*</FormControl>*/}
                                                </Grid>
                                            )
                                        })}

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
                                    </>
                                );
                            }}
                            control={props.control}
                        />
                    </FormControl>
                </Grid>

            </div>
        );
    };

    return prepareEditSectionsComponent();
};

export default EditSectionsComponent;