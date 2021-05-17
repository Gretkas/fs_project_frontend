import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import LandingContainer from "./components/landing/landingContainer";
import Header from "./components/header/header"
import LoginContainer from "./components/login/loginContainer"
import RoomsContainer from "./components/rooms/roomsContainer"
import PrivateRoute from "./components/routes/privateroute";
import AdminRoute from "./components/routes/adminroute";
import Admin from './components/admin/admin';
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { authUser } from "./data/actions/auth";
import TimeSelectionTable from "./components/timeselection/TimeSelectionTable";


const isAdmin = true;
function App(props) {

  useEffect(() => {
    props.authUser();
  }, []);


  return props.isLoggedIn !== null ? (
    <BrowserRouter>
      <Header user={true} />
      <Route exact path="/login" component={LoginContainer} />
      <PrivateRoute
        exact
        path="/"
        component={LandingContainer}
        isLoggedIn={isLoggedIn}
      />
      <PrivateRoute exact path="/rooms" component={RoomsContainer} isLoggedIn={props.isLoggedIn}/>  
      <PrivateRoute
        exact
        path="/timeselection"
        component={TimeSelectionTable}
        isLoggedIn={isLoggedIn}
      />
      <AdminRoute exact path="/admin" component={Admin} isAdmin={isAdmin} />
    </BrowserRouter>
  ): (
    ""
  );

}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  user: state.auth.user,
});

export default connect(mapStateToProps, { authUser }, null, {
  forwardRef: true,
})(App);
