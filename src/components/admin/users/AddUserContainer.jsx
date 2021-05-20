import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {removeError} from "../../../data/actions/errors";
import {Alert, AlertTitle} from "@material-ui/lab";
import AddUserForm from "./AddUserForm";

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        error: state.errors.message,
    };
};

const AddUserContainer = (props) => {
    const [newUser, setNewUser] = useState(null);

    useEffect(() => {
        // before unmount
        return () => {
            setNewUser(null);
        };
    }, []);

    const prepareAddUserContainer = () => {
        return (
            <div>
                <AddUserForm
                    onAddUser = {setNewUser}
                />

                {newUser &&
                <Alert severity="success">
                    <AlertTitle>Added new user</AlertTitle>
                </Alert>
                }

                {props.error &&
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {props.error}
                </Alert>
                }
            </div>
        );
    }

    return prepareAddUserContainer();
}

export default connect(mapStateToProps, {removeError})(AddUserContainer);