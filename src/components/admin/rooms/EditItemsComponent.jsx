import {FormControl, FormHelperText, Grid, TextField} from "@material-ui/core";
import {Controller} from "react-hook-form";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import DeleteIcon from '@material-ui/icons/Delete';
import { v4 as uuid } from "uuid";
import AddIcon from '@material-ui/icons/Add';

const EditItemsComponent = (props) => {
    const {errors} = props;

    const appendSection = (section) => {
        const {sections: currentSections} = props.getValues();

        return [...(currentSections ?? []), section];
    }

    const removeSection = (section) => {
        const {sections: currentSections} = props.getValues();

        return currentSections?.filter(s => s.id !== section.id);
    }

    const appendSectionItem = (item, sectionId) => {
        const {sections: currentSections} = props.getValues();

        return currentSections.map(s =>
            s.id === sectionId ? { ...s, items: [...s.items, item] } : s
        );
    }

    const removeSectionItem = (item, sectionIndex, sectionId) => {
        const {sections: currentSections} = props.getValues();
        const {items: currentSectionItems} = currentSections[sectionIndex]

        return currentSections.map(s =>
            s.id === sectionId ? { ...s, items: currentSectionItems.filter(i => i.itemId !== item.itemId) } : s
        );
    }

    const appendItem = (item) => {
        const {items: currentItems} = props.getValues();

        return [...(currentItems ?? []), item];
    }

    const removeItem = (item) => {
        const {items: currentItems} = props.getValues();

        return currentItems?.filter(i => i.itemId !== item.itemId);
    }

    /*const isItemInSection = (item) => {
        const {sections: currentSections} = props.getValues();
        const itemsInSections = currentSections?.reduce((a, s) => (s.items), [])
        if (itemsInSections.length <= 0) return false;

        return itemsInSections?.filter(i => i.itemId === item.itemId).length > 0
    }*/

        const prepareEditItemsComponent = () => {
        return(
            <Grid container spacing={2} direction="column">
                    <FormControl
                        component="fieldset"
                        error={errors.sections}
                    >
                        {errors.sections &&
                        <FormHelperText>{errors.sections.message}</FormHelperText>
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

                                                    <FormControl component="fieldset"
                                                                 error={errors.items}>
                                                        {errors.items &&
                                                        <FormHelperText>{errors.items.message}</FormHelperText>
                                                        }

                                                        <>
                                                            {field.value[sectionIndex].items?.map((item, index) => {
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
                                                                                            onClick={() => field.onChange(removeSectionItem(item, sectionIndex, section.id))}
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
                                                                    name={`newSectionItemName${sectionIndex}`}
                                                                    // innerRef={textfieldValue}
                                                                    label="Utstyr Navn"
                                                                    InputProps={{
                                                                        endAdornment:
                                                                            <InputAdornment position="end">
                                                                                <IconButton
                                                                                    aria-label="toggle password visibility"
                                                                                    onClick={() =>
                                                                                        field.onChange(appendSectionItem({
                                                                                            name: document.getElementsByName(`newSectionItemName${sectionIndex}`)[0].value,
                                                                                            itemId: null
                                                                                        }, section.id))
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
                                                    </FormControl>
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

                <FormControl
                    component="fieldset"
                    error={errors.items}
                >
                    {errors.items &&
                    <FormHelperText>{errors.items.message}</FormHelperText>
                    }
                    <Controller
                        name="items"
                        render={({field}) => {
                            console.log(field)
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
                                            // innerRef={textfieldValue}
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