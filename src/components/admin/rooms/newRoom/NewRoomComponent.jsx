import {Grid, TextField} from "@material-ui/core";
import { Controller } from "react-hook-form";

const NewRoomComponent = (props) => {
    const {control, errors} = props

    const registerOptions = {
        roomName: "Påkrevd",
        maxNumber: { required: "Påkrevd", min: { value: 1, message: "Må være større enn 0"}},
        location: "Påkrevd",
        description: "Påkrevd",
    };

    const prepareNewRoomComponent = () => {
        return(
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Controller
                        render={({field}) => {
                            return(
                                <TextField
                                    {...field}
                                    variant="outlined"
                                    fullWidth
                                    id="roomName"
                                    label="Room Name"
                                    required
                                    error={errors.roomName}
                                    helperText={
                                        errors.roomName
                                            ? errors.roomName.message
                                            : null
                                    }
                                />
                            );
                        }}
                        name="roomName"
                        rules={registerOptions.roomName}
                        control={control}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Controller
                        render={({field}) => {
                            return(
                                <TextField
                                    {...field}
                                    variant="outlined"
                                    type="number"
                                    fullWidth
                                    id="maxNumber"
                                    label="Kapasitet"
                                    required
                                    error={errors.maxNumber}
                                    helperText={
                                        errors.maxNumber
                                            ? errors.maxNumber.message
                                            : "Max antall brukere per reservasjon"
                                    }
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            );
                        }}
                        name="maxNumber"
                        rules={registerOptions.maxNumber}
                        control={control}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Controller
                        render={({field}) => {
                            return(
                                <TextField
                                    {...field}
                                    variant="outlined"
                                    fullWidth
                                    id="location"
                                    label="Lokasjon"
                                    required
                                    error={errors.location}
                                    helperText={
                                        errors.location
                                            ? errors.location.message
                                            : null
                                    }
                                />
                            );
                        }}
                        name="location"
                        rules={registerOptions.location}
                        control={control}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        render={({field}) => {
                            return(
                                <TextField
                                    {...field}
                                    required
                                    variant="outlined"
                                    error={errors.description}
                                    helperText={
                                        errors.description
                                            ? errors.description.message
                                            : null
                                    }
                                    id="standard-multiline-flexible"
                                    label="Beskrivelse"
                                    multiline
                                    rowsMax={12}
                                    fullWidth
                                />
                            );
                        }}
                        name="description"
                        rules={registerOptions.description}
                        control={control}
                    />
                </Grid>
            </Grid>
        );
    };

    return prepareNewRoomComponent();
};

export default NewRoomComponent;