import './admin.css';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

function Admin() {
  	return (
		<div className="App">
			Tilgang til admins brukernavn her??
			
			<Link to="/admin/users">
				<Button variant="contained" color="secondary">
					Brukere
				</Button>
			</Link>
			<Link to="/admin/rooms">
				<Button variant="contained" color="secondary">
					Rom
				</Button>
			</Link>
			<Link to="/admin/reservations">
				<Button variant="contained" color="secondary">
					Reservasjoner
				</Button>
			</Link>
		</div>
  	);
}

export default Admin;