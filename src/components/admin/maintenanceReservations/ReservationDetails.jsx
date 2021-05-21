import React from "react";
import Typography from "@material-ui/core/Typography";
import ItemDetails from "./ItemDetails";

const ReservationDetails = (props) => {
  const prepareReservationDetails = () => {
    return (
      <Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Start Time: {props.reservation.startTime}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          End Time: {props.reservation.endTime}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Type: {props.reservation.type}
        </Typography>
        {props.reservation.result && (
          <Typography variant="subtitle1" color="textSecondary">
            Result: {props.reservation.result}
          </Typography>
        )}
        <Typography variant="subtitle1" color="textSecondary">
          Items:{" "}
          {props.reservation.items.map((item) => {
            return <ItemDetails item={item} />;
          })}
        </Typography>
      </Typography>
    );
  };

  return prepareReservationDetails();
};

export default ReservationDetails;
