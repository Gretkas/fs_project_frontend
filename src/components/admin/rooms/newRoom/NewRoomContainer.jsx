import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {removeError} from "../../../../data/actions/errors";
import {Alert, AlertTitle} from "@material-ui/lab";
import {CssBaseline, Link, Paper, Toolbar, useTheme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import NewRoomForm from "./NewRoomForm";

const mapStateToProps = (state) => {
    return {
        error: state.errors.message,
    };
};

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    toolbar: theme.mixins.toolbar,
    title: {
        flexGrow: 1,
    },
}));

const NewRoomContainer = (props) => {
    const classes = useStyles();
    const theme = useTheme();

    const [createdRoom, setCreatedRoom] = useState(null);

    useEffect(() => {
        // before unmount
        return () => {
            setCreatedRoom(null);
        };
    }, []);

    const prepareNewRoomContainer = () => {
            return (
                <div >
                    <Toolbar className={classes.appBar}>
                        <Link href="/admin/rooms" variant="body2">
                            <Button className={classes.menuButton} variant="contained" color="primary">
                                Alle rom
                            </Button>
                        </Link>
                    </Toolbar>
                    <div className={classes.root}>
                        <div className={classes.toolbar} />
                        <CssBaseline />
                        <main
                            className={classes.content}
                        >
                            <NewRoomForm
                                onCreateRoom = {setCreatedRoom}
                            />

                            {createdRoom &&
                            <Alert severity="success">
                                <AlertTitle>Rommet er opprettet</AlertTitle>
                            </Alert>
                            }

                            {props.error &&
                            <Alert severity="error">
                                <AlertTitle>Feil</AlertTitle>
                                {props.error}
                            </Alert>
                            }
                        </main>
                    </div>
                </div>
            );
    }

    return prepareNewRoomContainer();
}

export default connect(mapStateToProps, {removeError})(NewRoomContainer);