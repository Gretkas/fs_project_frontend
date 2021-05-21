import React from "react";
import { connect } from "react-redux";
import {removeError} from "../../../data/actions/errors";
import {useForm, Controller} from "react-hook-form";
import {
    Backdrop,
    CircularProgress,
    FormControl, FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@material-ui/core";
import {addUser} from "../../../data/actions/users";
import {format} from "date-fns";
import Button from "@material-ui/core/Button";

const AddUserForm = (props) => {

    const {
        register,
        control,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
            isValid
        },
    } = useForm({
        mode: "onBlur",
        criteriaMode: "firstError",
        shouldFocusError: true,
        reValidateMode: "onChange",
        shouldUnregister: true, // todo keep ???
    });

    const onSubmit = async (data, e) => {
        e.preventDefault();

        props.removeError();

        let newUser = await props.addUser({
            userName: data.userName,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            password: data.password,
            role: data.role,
            validUntil: data.validUntil
        })

        props.onAddUser(newUser);
    };

    const onErrors = (errors) => {
        console.log("ERRORS:", errors);
    };

    const registerOptions = {
        userName: "Required",
        firstName: "Required",
        lastName: "Required",
        email: "Required",
        phoneNumber: {
            required: "Required",
            pattern: {
                value: /[0-9]{8}/,
                message: "Digits only",
            },
            minLength: {
                value: 8,
                message: "8 digits minimum",
            },
            maxLength: {
                value: 8,
                message: "8 digits maximum",
            },
        },
        password: "Required",
        role: "Required",
        validUntil: {
            required: "Required",
            min: {
                value: format(new Date(), "yyyy-MM-dd"),
                message: "Only future dates allowed",
            },
        }
    };

    const prepareAddUserForm = () => {

        return (
            <div>
                <form
                    id="registerForm"
                    className="Register-form-Container"
                    onSubmit={handleSubmit(onSubmit, onErrors)}
                >
                    <div>
                        <TextField
                            id="username"
                            label="Username"
                            required
                            error={errors.userName}
                            helperText={
                                errors.userName
                                    ? errors.userName.message
                                    : null
                            }
                            {...register("userName", registerOptions.userName)}
                        />

                        <TextField
                            id="password"
                            label="Password"
                            required
                            error={errors.password}
                            helperText={
                                errors.password
                                    ? errors.password.message
                                    : null
                            }
                            {...register("password", registerOptions.password)}
                        />

                        <TextField
                            id="firstName"
                            label="First Name"
                            required
                            error={errors.firstName}
                            helperText={
                                errors.firstName
                                    ? errors.firstName.message
                                    : null
                            }
                            {...register("firstName", registerOptions.firstName)}
                        />

                        <TextField
                            id="lastName"
                            label="Last Name"
                            required
                            error={errors.lastName}
                            helperText={
                                errors.lastName
                                    ? errors.lastName.message
                                    : null
                            }
                            {...register("lastName", registerOptions.lastName)}
                        />

                        <TextField
                            id="email"
                            label="Email"
                            type="email"
                            required
                            error={errors.email}
                            helperText={
                                errors.email
                                    ? errors.email.message
                                    : null
                            }
                            {...register("email", registerOptions.email)}
                        />

                        <TextField
                            id="phoneNumber"
                            label="Phone Number"
                            type="tel"
                            placeholder="12345678"
                            required
                            error={errors.phoneNumber}
                            helperText={
                                errors.phoneNumber
                                    ? errors.phoneNumber.message
                                    : null
                            }
                            {...register("phoneNumber", registerOptions.phoneNumber)}
                        />

                        <Controller
                            render={({field}) => {
                                return(
                                    <TextField
                                        {...field}
                                        id="validUntil"
                                        label="Account Expiration Date"
                                        type="date"
                                        value={field.value}
                                        required
                                        error={errors.validUntil}
                                        helperText={
                                            errors.validUntil
                                                ? errors.validUntil.message
                                                : null
                                        }
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                );
                            }}
                            name="validUntil"
                            rules={registerOptions.validUntil}
                            defaultValue={`${new Date().getFullYear()}-08-31`}
                            control={control}
                        />

                        <FormControl
                            error={errors.role}
                            required
                        >
                            <InputLabel shrink>
                                Role
                            </InputLabel>

                            <Controller
                                render={({field}) => {
                                    return(
                                        <Select value={field.value}>
                                            <MenuItem value="USER">User</MenuItem>
                                            <MenuItem value="ADMIN">Admin</MenuItem>
                                        </Select>
                                    );
                                }}
                                name="role"
                                rules={registerOptions.role}
                                defaultValue="USER"
                                control={control}
                            />

                            {errors.role &&
                            <FormHelperText>{errors.role.message}</FormHelperText>
                            }
                        </FormControl>
                    </div>


                    <Button variant="contained" color="primary" disabled={!isValid} type="submit">
                        Submit
                    </Button>

                    {isSubmitting &&
                    <Backdrop open>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                    }
                </form>

            </div>

        );
    }

    return prepareAddUserForm();
}

export default connect(null, {addUser, removeError})(AddUserForm);