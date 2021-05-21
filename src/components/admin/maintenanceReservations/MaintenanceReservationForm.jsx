import {useEffect} from "react";
import { connect } from "react-redux";
import { newReservation } from "../../../data/actions/reservations";
import {getSingleRoom} from "../../../data/actions/rooms"
import { removeError } from "../../../data/actions/errors";
import { useForm } from "react-hook-form";
import ReservationTitle from "./ReservationTitle";
import ReservationTime from "./ReservationTime";
import ReservationItems from "./ReservationItems";
import { Backdrop, CircularProgress } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import "./maintenance.css";

const MaintenanceReservationForm = (props) => {
  const { getSingleRoom } = props;
  useEffect(() => {
    
    getSingleRoom(window.location.href.split("/")[window.location.href.split("/").length - 2]);
  }, [getSingleRoom]);


  const {
    register,
    control,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    criteriaMode: "firstError",
    shouldFocusError: true,
    reValidateMode: "onSubmit",
    // shouldUnregister: true, // todo keep ???
    defaultValues: {
      items: props.room ? props.room.items : [],
    },
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();

    props.removeError();

    let reserv = await props.newReservation({
      title: data.title,
      startTime: data.startTime,
      endTime: data.endTime,
      items: data.items,
      type: "MAINTENANCE",
    });

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
            items={props.room ? props.room.items : []}
            register={register}
            errors={errors}
            control={control}
            getValues={getValues}
          />

          <Button
            variant="contained"
            color="primary"
            className="maintenanceFormSubmit"
            type="submit"
          >
            Reserve
          </Button>

          {isSubmitting && (
            <Backdrop open>
              <CircularProgress color="inherit" />
            </Backdrop>
          )}
        </form>
      </div>
    );
  };

  return prepareMRForm();
};

const mapStateToProps = (state) => ({
  room: state.rooms.singleRoom,
});



export default connect(mapStateToProps, { newReservation, getSingleRoom, removeError })(
  MaintenanceReservationForm
);
