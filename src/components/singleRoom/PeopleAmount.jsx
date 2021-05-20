import { Paper } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import PeopleIcon from "@material-ui/icons/People";
import Typography from "@material-ui/core/Typography";

function PeopleAmount(props) {
  function onChange(event) {
    if (event.target.value > props.maxPeople) {
      props.setNumberOfpeople({
        error: true,
        message: "Too many people",
        amount: event.target.value,
      });
    } else if (event.target.value <= 0) {
      props.setNumberOfpeople({
        error: false,
        message: "You need atleast 1 person",
        amount: 1,
      });
    } else if (
      props.numberOfPeople.amount === undefined &&
      event.target.value < 1
    ) {
      props.setNumberOfpeople({
        error: true,
        message: "Please specify how many people",
        amount: event.target.value,
      });
    } else {
      props.setNumberOfpeople({
        error: false,
        message: "",
        amount: event.target.value,
      });
    }
  }

  return (
    <Paper className="roomReservationPaper maxpeople" elevation={3}>
      <Grid container heigth={100} spacing={1} alignItems="center">
        <Grid item xs={8}>
          <TextField
            className="amount-of-people"
            id="Amount-of-people-input"
            type="number"
            label="Amount"
            error={props.numberOfPeople.error}
            value={props.numberOfPeople.amount}
            onChange={onChange}
            helperText={props.numberOfPeople.message}
          />
        </Grid>
        <Grid item>
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <PeopleIcon />
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" gutterBottom>
                Max: {props.maxPeople}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default PeopleAmount;
