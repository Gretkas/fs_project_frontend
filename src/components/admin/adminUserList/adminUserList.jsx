import './adminUserList.css';
import AdminUserListElement from './adminUserListElement'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import cancelButton from "../../../assets/cancelButton.svg"
import IconButton from '@material-ui/core/IconButton';

function AdminUserList(props) {
    const renderUsers = () => {

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
                    <StyledTableCell>Bruker nummer</StyledTableCell>
                    <StyledTableCell align="right">Brukernavn</StyledTableCell>
                    <StyledTableCell align="right">Rolle</StyledTableCell>
                    <StyledTableCell align="right">
                        <Button variant="contained" color="secondary">
                            Ny bruker
                        </Button>
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.users.map((user,index) => (
                    <TableRow key={index}>
                        <StyledTableCell component="th" scope="row">
                            {index + 1}
                        </StyledTableCell>
                        <StyledTableCell align="right">{user.userName}</StyledTableCell>
                        <StyledTableCell align="right">{user.role}</StyledTableCell>
                        <StyledTableCell align="right">
                            Slett bruker:
                            <IconButton aria-label="Slett bruker">
                                <img src={cancelButton}/>
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
        <div className="userListContainer">
            {renderUsers()}
        </div>
    );
}

export default AdminUserList;