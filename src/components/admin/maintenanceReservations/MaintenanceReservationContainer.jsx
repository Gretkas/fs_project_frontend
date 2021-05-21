import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import MaintenanceReservationForm from "./MaintenanceReservationForm";
import MaintenanceReservationResult from "./MaintenanceReservationResult";
import { removeError } from "../../../data/actions/errors";
import { Alert, AlertTitle } from "@material-ui/lab";

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    error: state.errors.message,
  };
};

const MaintenanceReservationContainer = (props) => {
  const [newReservation, setNewReservation] = useState(null);

  useEffect(() => {
    // before unmount
    return () => {
      setNewReservation(null);
    };
  }, []);

  const prepareMRContainer = () => {
    return (
      <div>
        <MaintenanceReservationForm onNewReservation={setNewReservation} />

        {newReservation && (
          <MaintenanceReservationResult reservation={newReservation} />
        )}

        {props.error && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {props.error}
          </Alert>
        )}
      </div>
    );
  };

  return prepareMRContainer();
};

export default connect(mapStateToProps, { removeError })(
  MaintenanceReservationContainer
);
