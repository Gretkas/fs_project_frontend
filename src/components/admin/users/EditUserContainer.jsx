import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {removeError} from "../../../data/actions/errors";
import {Alert, AlertTitle} from "@material-ui/lab";
import EditUserForm from "./EditUserForm";
import { useParams } from "react-router-dom";
import {userService} from "../../../data/services/users";
import {Backdrop, CircularProgress} from "@material-ui/core";

const mapStateToProps = (state) => {
    return {
        error: state.errors.message,
    };
};

const EditUserContainer = (props) => {
    const { id } = useParams();
    const [currentUser, setCurrentUser] = useState(null);
    const [updatedUser, setUpdatedUser] = useState(null);

    useEffect(() => {
        let mounted = true;

        userService.getUser(id)
            .then(res => {
                if(mounted) {
                    setCurrentUser(res.data)
                }
            })

        // before unmount
        return () => {
            mounted = false;
            setUpdatedUser(null);
        };
    }, []);

    const prepareEditUserContainer = () => {
        if (currentUser) {
            return (
                <div>
                    <EditUserForm
                        user={currentUser}
                        userId={id}
                        onUpdateUser = {setUpdatedUser}
                    />

                    {updatedUser &&
                    <Alert severity="success">
                        <AlertTitle>Brukeren er oppdatert</AlertTitle>
                    </Alert>
                    }

                    {props.error &&
                    <Alert severity="error">
                        <AlertTitle>Feil</AlertTitle>
                        {props.error}
                    </Alert>
                    }
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

    return prepareEditUserContainer();
}

export default connect(mapStateToProps, {removeError})(EditUserContainer);