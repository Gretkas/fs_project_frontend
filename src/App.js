import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import LandingContainer from "./components/landing/landingContainer";
import Header from "./components/header/header";
import LoginContainer from "./components/login/loginContainer";
import PrivateRoute from "./components/routes/privateroute";
import AdminRoute from "./components/routes/adminroute";
import Admin from "./components/admin/admin";
import TimeSelection from "./components/timeselection/TimeSelection";
import TimeSelectionTable from "./components/timeselection/TimeSelectionTable";

const isLoggedIn = true;
const isAdmin = true;
function App() {
  return (
    <BrowserRouter>
      <Header user={true} />
      <Route exact path="/login" component={LoginContainer} />
      <PrivateRoute
        exact
        path="/"
        component={LandingContainer}
        isLoggedIn={isLoggedIn}
      />
      <PrivateRoute
        exact
        path="/timeselection"
        component={TimeSelection}
        isLoggedIn={isLoggedIn}
      />
      <PrivateRoute
        exact
        path="/timeselection2"
        component={TimeSelectionTable}
        isLoggedIn={isLoggedIn}
      />
      <AdminRoute exact path="/admin" component={Admin} isAdmin={isAdmin} />
    </BrowserRouter>
  );
}

export default App;
