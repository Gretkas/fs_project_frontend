
import { connect } from "react-redux";
import {removeError} from "../../../../data/actions/errors";
import {useForm} from "react-hook-form";
import {
    Backdrop, 
    CircularProgress, Container, CssBaseline,
     makeStyles,
 
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {createRoom} from "../../../../data/actions/rooms";
import NewRoomComponent from "./NewRoomComponent";
import NewItemsComponent from "./NewItemsComponent";

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

const NewRoomForm = (props) => {

    const classes = useStyles();

    const {onCreateRoom} = props

    const sections = []
    const items = []

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

        let createdRoom = await props.createRoom({
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

        onCreateRoom(createdRoom);
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

    const prepareNewRoomForm = () => {

        return (
            <Container maxWidth="xs">
                <CssBaseline />
                <form className={classes.form} onSubmit={handleSubmit(onSubmit, onErrors)}>

                    <div className={classes.paper}>
                        <Typography component="h3" variant="h5">
                            Opplysninger om Rom
                        </Typography>
                        <NewRoomComponent
                            control={control}
                            errors={errors}
                        />
                    </div>

                    <div className={classes.paper}>
                        <Typography component="h3" variant="h5">
                            Opplysninger om Seksjoner og Utstyr
                        </Typography>
                        <NewItemsComponent
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
                        Opprett
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

    return prepareNewRoomForm();
}

export default connect(null, {createRoom, removeError})(NewRoomForm);