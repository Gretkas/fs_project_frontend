import './roomCard.css';


import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import {Link} from "react-router-dom";
import { v4 as uuid } from "uuid";


function RoomCard(props) {
  

  return (
    <Card
      variant="outlined"
      elevation={5}
      className="RecommendedCard"
      key={uuid()}
    >
      <div className="RecommendedCardDetails">
        <div>
          <Typography variant="h5" component="h5">
          {props.room.name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {props.room.location}
          </Typography>
        </div>
      </div>
    
      <div className="RecommendedCardDescription">
        <Typography variant="subtitle1" color="textSecondary">
            {props.room.description}
        </Typography>
      </div>
      <div className="RecommendedCardButtons">
        <Link
            className = "cardLink"
            to={{
              pathname: `/rooms/${props.room.id}`,
              state: {
                userStatus: null,
              },
            }}
        >
          <Button
              endIcon={<MenuBookIcon />}
              className="RecommendedCardButtonReadMore"
              color="primary"
              variant="contained"
          >
           Reserver
          </Button>
        </Link>

      </div>
      <br />
    </Card>

   
  );
}

export default RoomCard;