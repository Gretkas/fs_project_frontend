import React from "react";
import { connect } from "react-redux";
import {newReservation} from "../../../data/actions/reservations";
import {removeError} from "../../../data/actions/errors";
import {useForm} from "react-hook-form";
import ReservationTitle from "./ReservationTitle";
import ReservationTime from "./ReservationTime";
import ReservationItems from "./ReservationItems";
import {Backdrop, CircularProgress} from "@material-ui/core";

const MaintenanceReservationForm = (props) => {
    // todo remove when rooms are implemented
    const defaultItems = [
        {itemId: 1, name: "Koke2", roomId: 1},
        {itemId: 2, name: "Koke3", roomId: 1},
        {itemId: 3, name: "Koke4", roomId: 1},
        {itemId: 4, name: "Koke5", roomId: 1},
        {itemId: 5, name: "Koke", roomId: 1},
    ]

    const {
        register,
        control,
        handleSubmit,
        getValues,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm({
        mode: "onBlur",
        criteriaMode: "firstError",
        shouldFocusError: true,
        reValidateMode: "onSubmit",
        // shouldUnregister: true, // todo keep ???
        defaultValues: {
            items: defaultItems
        }
    });

    const onSubmit = async (data, e) => {
        e.preventDefault();

        props.removeError();

        let reserv = await props.newReservation({
            startTime: data.startTime,
            endTime: data.endTime,
            items: data.items,
            type: "MAINTENANCE"
        })

        props.onNewReservation(reserv);
    };

    const onErrors = (errors) => {
        console.log("ERRORS:", errors);
    };

    const prepareMRForm = () => {

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
                        items={defaultItems}
                        register={register}
                        errors={errors}
                        control={control}
                        getValues={getValues}
                    />

                    <button className="maintenanceFormSubmit" type="submit">
                        Reserve
                    </button>

                    {isSubmitting &&
                    <Backdrop open>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                    }
                </form>

            </div>

        );
    }

    return prepareMRForm();
}

export default connect(null, {newReservation, removeError})(MaintenanceReservationForm);