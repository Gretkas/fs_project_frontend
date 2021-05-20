import './adminReservationList.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import cancelButton from "../../../assets/cancelButton.svg"
import IconButton from '@material-ui/core/IconButton';
import { Link } from "react-router-dom";

function AdminReservationList(props) {
    const renderReservations = () => {

        const StyledTableCell = withStyles((theme) => ({
            head: {
                background: "#6200EE",
                color: theme.palette.common.white,
                fontSize: 20,
            },
            body: {
                fontSize: 15,
            },
        }))(TableCell);
          

        return (
            <TableContainer component={Paper}>
              <Table aria-label="tabell med brukere">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Id</StyledTableCell>
                    <StyledTableCell align="right">Tittel</StyledTableCell>
                    <StyledTableCell align="right">Tidsramme</StyledTableCell>
                    <StyledTableCell align="right">Brukerepost</StyledTableCell>
                    <StyledTableCell align="right">Type</StyledTableCell>
                    <StyledTableCell align="right">Romnavn</StyledTableCell> 
                    <StyledTableCell align="right"></StyledTableCell>                   
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.reservations.map(reservation => (
                    <TableRow key={reservation.id}>
                        <StyledTableCell component="th" scope="row">
                            {reservation.id}
                        </StyledTableCell>
                        <StyledTableCell align="right">{reservation.title}</StyledTableCell>
                        <StyledTableCell align="right">{reservation.startTime} - {reservation.endTime}</StyledTableCell>
                        <StyledTableCell align="right">
                            <Link to={`/admin/users/${reservation.user.id}`}>
                                {reservation.user.email}
                            </Link>
                        </StyledTableCell>
                        <StyledTableCell align="right">{reservation.type}</StyledTableCell>
                        <StyledTableCell align="right">
                        <Link to={`/admin/rooms/${reservation.roomId}`}>
                                {reservation.roomName}
                            </Link>
                        </StyledTableCell>
                        <StyledTableCell align="right">
                            Slett reservasjon:
                            <IconButton aria-label="Slett reservasjon" onClick={()=>{props.cancelReservation(reservation.id)}}>
                                <img src={cancelButton} alt="Slett reservasjon"/>
                            </IconButton>
                        </StyledTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          );
    }

    return (
        <div className="ReservationListContainer">
            {renderReservations()}
        </div>
    );
}

export default AdminReservationList;