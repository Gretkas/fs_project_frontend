import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

// const mapStateToProps = (state) => {
//     return {
//
//     };
// };

const prepareMRResult = (props) => {
    return (
        <div>
            <p>MAINTENANCE RESERV RESULT</p>
        </div>
    );
}

const MaintenanceReservationResult = (props) => {
    return prepareMRResult(props);
}

export default MaintenanceReservationResult;

// export default connect(mapStateToProps, {})(MaintenanceReservationContainer);