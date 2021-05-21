import React from "react";
import {Grid, TextField} from "@material-ui/core";
import { Controller } from "react-hook-form";

const EditRoomComponent = (props) => {
    const {room, control, errors} = props

    const registerOptions = {
        roomName: "Påkrevd",
        maxNumber: { required: "Påkrevd", min: { value: 1, message: "Må være større enn 0"}},
        location: "Påkrevd",
        description: "Påkrevd",
    };

    const prepareEditRoomComponent = () => {
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
                            defaultValue={room.name}
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
                            defaultValue={room.maxNumber}
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
                            defaultValue={room.location}
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
                            defaultValue={room.description}
                        />
                    </Grid>

                    {/*<Grid item xs={12} sm={6}>*/}
                    {/*    <Controller*/}
                    {/*        render={({field}) => {*/}
                    {/*            return(*/}
                    {/*                <TextField*/}
                    {/*                    {...field}*/}
                    {/*                    variant="outlined"*/}
                    {/*                    fullWidth*/}
                    {/*                    defaultValue={user.email}*/}
                    {/*                    id="email"*/}
                    {/*                    label="Email"*/}
                    {/*                    type="email"*/}
                    {/*                    required*/}
                    {/*                    error={errors.email}*/}
                    {/*                    helperText={*/}
                    {/*                        errors.email*/}
                    {/*                            ? errors.email.message*/}
                    {/*                            : null*/}
                    {/*                    }*/}
                    {/*                />*/}
                    {/*            );*/}
                    {/*        }}*/}
                    {/*        name="email"*/}
                    {/*        rules={registerOptions.email}*/}
                    {/*        control={control}*/}
                    {/*        defaultValue={room.email}*/}
                    {/*    />*/}
                    {/*</Grid>*/}

                    {/*<Grid item xs={12} sm={6}>*/}
                    {/*    <Controller*/}
                    {/*        render={({field}) => {*/}
                    {/*            return(*/}
                    {/*                <TextField*/}
                    {/*                    {...field}*/}
                    {/*                    variant="outlined"*/}
                    {/*                    fullWidth*/}
                    {/*                    defaultValue={user.phoneNumber}*/}
                    {/*                    id="phoneNumber"*/}
                    {/*                    label="Phone Number"*/}
                    {/*                    type="tel"*/}
                    {/*                    placeholder="12345678"*/}
                    {/*                    required*/}
                    {/*                    error={errors.phoneNumber}*/}
                    {/*                    helperText={*/}
                    {/*                        errors.phoneNumber*/}
                    {/*                            ? errors.phoneNumber.message*/}
                    {/*                            : null*/}
                    {/*                    }*/}
                    {/*                />*/}
                    {/*            );*/}
                    {/*        }}*/}
                    {/*        name="phoneNumber"*/}
                    {/*        rules={registerOptions.phoneNumber}*/}
                    {/*        control={control}*/}
                    {/*        defaultValue={room.phoneNumber}*/}
                    {/*    />*/}
                    {/*</Grid>*/}

                    {/*<Grid item xs={12} sm={6}>*/}
                    {/*    <Controller*/}
                    {/*        render={({field}) => {*/}
                    {/*            return(*/}
                    {/*                <TextField*/}
                    {/*                    {...field}*/}
                    {/*                    variant="outlined"*/}
                    {/*                    fullWidth*/}
                    {/*                    defaultValue={user.validUntil}*/}
                    {/*                    id="validUntil"*/}
                    {/*                    label="Account Expiration Date"*/}
                    {/*                    type="date"*/}
                    {/*                    value={field.value}*/}
                    {/*                    required*/}
                    {/*                    error={errors.validUntil}*/}
                    {/*                    helperText={*/}
                    {/*                        errors.validUntil*/}
                    {/*                            ? errors.validUntil.message*/}
                    {/*                            : null*/}
                    {/*                    }*/}
                    {/*                    InputLabelProps={{*/}
                    {/*                        shrink: true,*/}
                    {/*                    }}*/}
                    {/*                />*/}
                    {/*            );*/}
                    {/*        }}*/}
                    {/*        name="validUntil"*/}
                    {/*        rules={registerOptions.validUntil}*/}
                    {/*        defaultValue={`${new Date().getFullYear()}-08-31`}*/}
                    {/*        control={control}*/}
                    {/*    />*/}

                    {/*</Grid>*/}

                    {/*<Grid item xs={12} sm={6}>*/}
                    {/*    <FormControl*/}
                    {/*        error={errors.role}*/}
                    {/*        required*/}
                    {/*        fullWidth*/}
                    {/*    >*/}
                    {/*        <InputLabel shrink>*/}
                    {/*            Role*/}
                    {/*        </InputLabel>*/}

                    {/*        <Controller*/}
                    {/*            render={({field}) => {*/}
                    {/*                return(*/}
                    {/*                    <Select {...field} value={field.value} >*/}
                    {/*                        <MenuItem value="USER">User</MenuItem>*/}
                    {/*                        <MenuItem value="ADMIN">Admin</MenuItem>*/}
                    {/*                    </Select>*/}
                    {/*                );*/}
                    {/*            }}*/}
                    {/*            name="role"*/}
                    {/*            rules={registerOptions.role}*/}
                    {/*            defaultValue={room.role}*/}
                    {/*            control={control}*/}
                    {/*        />*/}

                    {/*        {errors.role &&*/}
                    {/*        <FormHelperText>{errors.role.message}</FormHelperText>*/}
                    {/*        }*/}
                    {/*    </FormControl>*/}
                    {/*</Grid>*/}
                </Grid>
        );
    };

    return prepareEditRoomComponent();
};

export default EditRoomComponent;