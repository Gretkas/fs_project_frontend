import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {newReservation} from "../../../data/actions/reservations";
import {removeError} from "../../../data/actions/errors";
import {useForm} from "react-hook-form";
import {Link, Redirect} from "react-router-dom";
import ReservationTitle from "./ReservationTitle";
import ReservationTime from "./ReservationTime";
import ReservationItems from "./ReservationItems";
import { format, parse } from "date-fns";
import {CircularProgress} from "@material-ui/core";


// const mapStateToProps = (state) => {
//     return {
//
//     };
// };

const MaintenanceReservationForm = (props) => {
    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: {
            errors,
            isValid,
            isSubmitting,
            isSubmitSuccessful,
            isSubmitted,
        },
    } = useForm({
        mode: "onBlur",
        criteriaMode: "firstError",
        shouldFocusError: true,
        reValidateMode: "onSubmit",
        shouldUnregister: true, // todo keep ???
    });

    const onSubmit = (data, e) => {
        e.preventDefault();
        console.log("NEW MR DATA");
        console.log(data);

        let reserv = props.newReservation({
            startTime: `${format(parse(data.startTime, "yyyy-MM-dd HH:mm", new Date()), "yyyy-MM-dd HH:mm")}`,
            endTime: `${format(parse(data.endTime, "yyyy-MM-dd HH:mm", new Date()), "yyyy-MM-dd HH:mm")}`,
            items: data.items,
            type: "MAINTENANCE"
        })
        props.onNewReservation(reserv);
    };

    const onErrors = (errors) => {
        console.log("ERRORS:", errors);
    };

    const onReset = () => {
        reset();
    };

    const prepareMRForm = (props) => {

        // useEffect(() => {
        //
        //     // before unmount
        //     return () => {
        //         props.removeError();
        //     };
        // }, []);

        return (
            <div>
                <form
                    id="registerForm"
                    className="Register-form-Container"
                    onSubmit={handleSubmit(onSubmit, onErrors)}
                >
                    <ReservationTitle
                        title="test title"
                        register={register}
                        errors={errors}
                        control={control}
                    />

                    <ReservationTime
                        register={register}
                        errors={errors}
                        control={control}
                    />

                    <ReservationItems
                        items={
                            [
                                {itemId: 1, roomId: 1, name: "Koke"},
                                // {itemId: 123, roomId: 123, name: "Dunno2"}
                            ]
                        }
                        register={register}
                        errors={errors}
                        control={control}
                    />

                    <button className="maintenanceFormSubmit" type="submit">
                        {isSubmitting ?
                            <CircularProgress color="inherit" /> :
                            "Reserve"
                        }
                    </button>
                </form>

            </div>

        );
    }

    return prepareMRForm();
}

export default connect(null, {newReservation})(MaintenanceReservationForm);