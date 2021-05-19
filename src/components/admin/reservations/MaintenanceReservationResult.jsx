import React from "react";
import {Accordion, AccordionDetails, AccordionSummary} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Alert} from "@material-ui/lab";
import ReservationDetails from "./ReservationDetails";

const prepareMRResult = (props) => {
    return (
        <Accordion>
            <Alert severity="success">
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                >
                    <Typography >Created </Typography>
                    <Typography >
                         View details
                    </Typography>
                </AccordionSummary>
            </Alert>
            <AccordionDetails>
                <ReservationDetails
                    reservation={props.reservation}
                />
            </AccordionDetails>
        </Accordion>
    );
}

const MaintenanceReservationResult = (props) => {
    return prepareMRResult(props);
}

export default MaintenanceReservationResult;