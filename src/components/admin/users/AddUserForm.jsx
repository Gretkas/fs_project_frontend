import React from "react";
import { connect } from "react-redux";
import {removeError} from "../../../data/actions/errors";
import {useForm} from "react-hook-form";
import {
    Backdrop,
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@material-ui/core";
import {addUser} from "../../../data/actions/users";
import {format} from "date-fns";

const AddUserForm = (props) => {

    const {
        register,
        control,
        handleSubmit,
        getValues,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm({
        mode: "onBlur",
        criteriaMode: "firstError",
        shouldFocusError: true,
        reValidateMode: "onSubmit",
        // shouldUnregister: true, // todo keep ???
    });

    const [role, setRole] = React.useState("USER");

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    const onSubmit = async (data, e) => {
        e.preventDefault();

        console.log(data)

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
        validUntil: "Required"
    };

    const prepareAddUserForm = () => {

        return (
            <div>
                <form
                    id="registerForm"
                    className="Register-form-Container"
                    onSubmit={handleSubmit(onSubmit, onErrors)}
                >
                    <TextField
                        id="username"
                        label="Username"
                        variant="outlined"
                        defaultValue="Ilonka"
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
                        variant="outlined"
                        defaultValue="Password1"
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
                        variant="outlined"
                        defaultValue="Ilona"
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
                        variant="outlined"
                        defaultValue="Podliashanyk"
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
                        variant="outlined"
                        type="email"
                        defaultValue="ilonap@ntnu.no"
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
                        variant="outlined"
                        type="tel"
                        defaultValue="92258172"
                        required
                        error={errors.phoneNumber}
                        helperText={
                            errors.phoneNumber
                                ? errors.phoneNumber.message
                                : null
                        }
                        {...register("phoneNumber", registerOptions.phoneNumber)}
                    />

                    <TextField
                        id="validUntil"
                        label="Account Expiration Date"
                        type="date"
                        min={format(new Date(), "yyyy-MM-dd")}
                        // defaultValue={format(new Date(), "yyyy-MM-dd")}
                        defaultValue="2021-06-25"
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
                        {...register("validUntil", registerOptions.validUntil)}
                    />

                    <FormControl >
                        <InputLabel shrink>
                            Role
                        </InputLabel>
                        <Select
                            id="role"
                            value={role}
                            onChange={handleRoleChange}
                            {...register("role", registerOptions.role)}
                        >
                            <MenuItem value="USER">User</MenuItem>
                            <MenuItem value="ADMIN">Admin</MenuItem>
                        </Select>
                    </FormControl>

                    <button type="submit">
                        Submit
                    </button>

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