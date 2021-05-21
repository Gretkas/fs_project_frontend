import React from "react";
import Typography from "@material-ui/core/Typography";

const ItemDetails = (props) => {

    const prepareItemDetails = () => {
        return (
            <Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    Item ID: {props.item.itemId}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    Room ID: {props.item.roomId}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    Item Name: {props.item.name}
                </Typography>
            </Typography>
        );
    }

    return prepareItemDetails();
}

export default ItemDetails;