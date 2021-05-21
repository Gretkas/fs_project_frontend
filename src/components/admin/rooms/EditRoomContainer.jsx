import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {removeError} from "../../../data/actions/errors";
import {Alert, AlertTitle} from "@material-ui/lab";
import { useParams } from "react-router-dom";
import {AppBar, Backdrop, CircularProgress, CssBaseline, Link, Paper, Toolbar, useTheme} from "@material-ui/core";
import {roomService} from "../../../data/services/rooms";
import EditRoomForm from "./EditRoomForm";
import {makeStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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

const EditRoomContainer = (props) => {
    const classes = useStyles();
    const theme = useTheme();

    const { id } = useParams();
    const [currentRoom, setCurrentRoom] = useState(null);
    const [updatedRoom, setUpdatedRoom] = useState(null);

    useEffect(() => {
        let mounted = true;

        roomService.getRoom(id)
            .then(res => {
                if(mounted) {
                    setCurrentRoom(res.data)
                }
            })

        // before unmount
        return () => {
            mounted = false;
            setUpdatedRoom(null);
        };
    }, []);

    const prepareEditRoomContainer = () => {
        if (currentRoom) {
            return (
                    <div >
                            <Toolbar className={classes.appBar}>
                                <Link href="/admin/rooms" variant="body2">
                                    <Button className={classes.menuButton} variant="contained" color="primary">
                                        Alle rom
                                    </Button>
                                </Link>
                                <Link href={`/admin/rooms/${id}/maintenance`}>
                                    <Button className={classes.menuButton} variant="contained" color="secondary">
                                        Ny vedlikehold
                                    </Button>
                                </Link>
                                <Typography edge="end" className={classes.title} variant="h4" noWrap align="right">
                                    Rediger rom, seksjoner, utstyr
                                </Typography>
                            </Toolbar>
                        <div className={classes.root}>
                            <div className={classes.toolbar} />
                            <CssBaseline />
                            <main
                                className={classes.content}
                            >
                                <EditRoomForm
                                    room={currentRoom}
                                    roomId={id}
                                    onUpdateRoom = {setUpdatedRoom}
                                />

                                {updatedRoom &&
                                <Alert severity="success">
                                    <AlertTitle>Rommet er oppdatert</AlertTitle>
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
        } else {
            return(
                <Backdrop open>
                    <CircularProgress color="inherit" />
                </Backdrop>
            );
        }

    }

    return prepareEditRoomContainer();
}

export default connect(mapStateToProps, {removeError})(EditRoomContainer);