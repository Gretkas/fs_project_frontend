import { connect } from "react-redux";
import {removeError} from "../../../data/actions/errors";
import {useForm} from "react-hook-form";
import {
    Backdrop,
    CircularProgress, Container, CssBaseline,
    makeStyles,
    
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {updateRoom} from "../../../data/actions/rooms";
import Typography from "@material-ui/core/Typography";
import EditRoomComponent from "./EditRoomComponent";
import EditItemsComponent from "./EditItemsComponent";

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

const EditRoomForm = (props) => {

    const classes = useStyles();

    const {room, roomId, onUpdateRoom} = props

    const sections = [...room.sections]
    const items = [...room.items]


    const {
        control,
        handleSubmit,
        getValues,
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
        // shouldUnregister: true, // todo keep ???
        defaultValues: {
            sections: sections,
            items: items,
        }
    });

    const onSubmit = async (data, e) => {
        e.preventDefault();

        console.log(data)

        props.removeError();

        let updatedRoom = await props.updateRoom(roomId, {
            name: data.roomName,
            maxNumber: data.maxNumber,
            location: data.location,
            description: data.description,
            sections: data.sections,
            items: data.items,
            // phoneNumber: data.phoneNumber,
            // password: data.password,
            // role: data.role,
            // validUntil: data.validUntil
        })

        onUpdateRoom(updatedRoom);
    };

    const onErrors = (errors) => {
        console.log("ERRORS:", errors);
    };

    /*const registerOptions = {
        roomName: "Påkrevd",
        maxNumber: { required: "Påkrevd", min: { value: 1, message: "Må være større enn 0"}},
        location: "Påkrevd",
        description: "Påkrevd",
        // phoneNumber: {
        //     required: "Required",
        //     pattern: {
        //         value: /[0-9]{8}/,
        //         message: "Digits only",
        //     },
        //     minLength: {
        //         value: 8,
        //         message: "8 digits minimum",
        //     },
        //     maxLength: {
        //         value: 8,
        //         message: "8 digits maximum",
        //     },
        // },
        // password: "Required",
        // role: "Required",
        // validUntil: {
        //     required: "Required",
        //     min: {
        //         value: format(new Date(), "yyyy-MM-dd"),
        //         message: "Only future dates allowed",
        //     },
        // }
    };*/

    const prepareEditRoomForm = () => {

        return (
            <Container maxWidth="xs">
                <CssBaseline />
                <form className={classes.form} onSubmit={handleSubmit(onSubmit, onErrors)}>

                    <div className={classes.paper}>
                        <Typography component="h3" variant="h5">
                            Rediger Rom
                        </Typography>
                        <EditRoomComponent
                            room={room}
                            control={control}
                            errors={errors}
                        />
                    </div>

                    <div className={classes.paper}>
                        <Typography component="h3" variant="h5">
                            Rediger Seksjoner og Utstyr
                        </Typography>
                        <EditItemsComponent
                            room={room}
                            sections={sections}
                            items={items}
                            control={control}
                            errors={errors}
                            getValues={getValues}
                        />
                    </div>



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
                    {/*<Grid container justify="flex-end">*/}
                    {/*    <Grid item>*/}
                    {/*        <Link href="/admin/users" variant="body2">*/}
                    {/*            Til alle brukere*/}
                    {/*        </Link>*/}
                    {/*    </Grid>*/}
                    {/*</Grid>*/}

                    {isSubmitting &&
                    <Backdrop open>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                    }
                </form>
            </Container>

        );
    }

    return prepareEditRoomForm();
}

export default connect(null, {updateRoom, removeError})(EditRoomForm);