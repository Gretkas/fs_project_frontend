
import { connect } from "react-redux";
import {removeError} from "../../../data/actions/errors";
import {useForm, Controller} from "react-hook-form";
import {
    Backdrop,
    CircularProgress, Container, CssBaseline,
    FormControl, FormHelperText, Grid,
    InputLabel, Link, makeStyles,
    MenuItem,
    Select,
    TextField
} from "@material-ui/core";
import {updateUser} from "../../../data/actions/users";
import {format} from "date-fns";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const EditUserForm = (props) => {

    const classes = useStyles();

    const {user, userId, onUpdateUser} = props

    const {
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

        console.log(data)

        props.removeError();

        let updatedUser = await props.updateUser(userId, {
            userName: data.userName,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            password: data.password,
            role: data.role,
            validUntil: data.validUntil
        })

        onUpdateUser(updatedUser);
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

    const prepareEditUserForm = () => {

        return (
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <form className={classes.form} onSubmit={handleSubmit(onSubmit, onErrors)}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Controller
                                        render={({field}) => {
                                            return(
                                                <TextField
                                                    {...field}
                                                    variant="outlined"
                                                    fullWidth
                                                    id="username"
                                                    label="Username"
                                                    required
                                                    error={errors.userName}
                                                    helperText={
                                                        errors.userName
                                                            ? errors.userName.message
                                                            : null
                                                    }
                                                />
                                            );
                                        }}
                                        name="userName"
                                        rules={registerOptions.userName}
                                        control={control}
                                        defaultValue={user.userName}
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
                                                    id="password"
                                                    label="Password"
                                                    required
                                                    error={errors.password}
                                                    helperText={
                                                        errors.password
                                                            ? errors.password.message
                                                            : null
                                                    }
                                                />
                                            );
                                        }}
                                        name="password"
                                        rules={registerOptions.password}
                                        control={control}
                                        defaultValue={user.password}
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
                                                    defaultValue={user.firstName}
                                                    id="firstName"
                                                    label="First Name"
                                                    required
                                                    error={errors.firstName}
                                                    helperText={
                                                        errors.firstName
                                                            ? errors.firstName.message
                                                            : null
                                                    }
                                                />
                                            );
                                        }}
                                        name="firstName"
                                        rules={registerOptions.firstName}
                                        control={control}
                                        defaultValue={user.firstName}
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
                                                    defaultValue={user.lastName}
                                                    id="lastName"
                                                    label="Last Name"
                                                    required
                                                    error={errors.lastName}
                                                    helperText={
                                                        errors.lastName
                                                            ? errors.lastName.message
                                                            : null
                                                    }
                                                />
                                            );
                                        }}
                                        name="lastName"
                                        rules={registerOptions.lastName}
                                        control={control}
                                        defaultValue={user.lastName}
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
                                                    defaultValue={user.email}
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
                                                />
                                            );
                                        }}
                                        name="email"
                                        rules={registerOptions.email}
                                        control={control}
                                        defaultValue={user.email}
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
                                                    defaultValue={user.phoneNumber}
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
                                                />
                                            );
                                        }}
                                        name="phoneNumber"
                                        rules={registerOptions.phoneNumber}
                                        control={control}
                                        defaultValue={user.phoneNumber}
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
                                                    defaultValue={user.validUntil}
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

                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <FormControl
                                        error={errors.role}
                                        required
                                        fullWidth
                                    >
                                        <InputLabel shrink>
                                            Role
                                        </InputLabel>

                                        <Controller
                                            render={({field}) => {
                                                return(
                                                    <Select {...field} value={field.value} >
                                                        <MenuItem value="USER">User</MenuItem>
                                                        <MenuItem value="ADMIN">Admin</MenuItem>
                                                    </Select>
                                                );
                                            }}
                                            name="role"
                                            rules={registerOptions.role}
                                            defaultValue={user.role}
                                            control={control}
                                        />

                                        {errors.role &&
                                        <FormHelperText>{errors.role.message}</FormHelperText>
                                        }
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <Button
                                disabled={!isValid}
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Oppdater
                            </Button>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Link href="/admin/users" variant="body2">
                                        Til alle brukere
                                    </Link>
                                </Grid>
                            </Grid>

                            {isSubmitting &&
                            <Backdrop open>
                                <CircularProgress color="inherit" />
                            </Backdrop>
                            }
                        </form>
                    </div>
                </Container>

        );
    }

    return prepareEditUserForm();
}

export default connect(null, {updateUser, removeError})(EditUserForm);