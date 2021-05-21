import './admin.css';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

function Admin() {
  	return (
		<div className="App">
			<div className="adminButtonDiv">	
				<Link to="/admin/users">
					<Button variant="contained" color="secondary" className="adminButtonMainPage">
						Brukere
					</Button>
				</Link>
			</div>	
			<div className="adminButtonDiv">	
				<Link to="/admin/rooms">
					<Button variant="contained" color="secondary" className="adminButtonMainPage">
						Rom
					</Button>
				</Link>
			</div>
			<div className="adminButtonDiv">
				<Link to="/admin/reservations">
					<Button variant="contained" color="secondary" className="adminButtonMainPage">
						Reservasjoner
					</Button>
				</Link>
			</div>
		</div>
  	);
}

export default Admin;