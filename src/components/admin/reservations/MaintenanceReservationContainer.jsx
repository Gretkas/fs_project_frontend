import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import MaintenanceReservationForm from "./MaintenanceReservationForm";
import MaintenanceReservationResult from "./MaintenanceReservationResult";
import {removeError} from "../../../data/actions/errors";

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        error: state.errors.message,
    };
};

const MaintenanceReservationContainer = (props) => {
    const [newReservation, setNewReservation] = useState(null);

    useEffect(() => {
        console.log(newReservation);
        removeError();
        // before unmount
        return () => {
            setNewReservation(null);
        };
    }, [newReservation]);

    const prepareMRContainer = () => {
        return (
            <div>
                <p>MAINTENANCE RESERV CONTAINER</p>
                <MaintenanceReservationForm
                    onNewReservation = {setNewReservation}/>

                {newReservation &&
                <MaintenanceReservationResult
                    reservation={newReservation}
                />
                }

                {props.error && <div>ERROR: ${props.error}</div>}
            </div>
        );
    }

    return prepareMRContainer();
}

export default connect(mapStateToProps, {removeError})(MaintenanceReservationContainer);