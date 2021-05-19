import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import LandingContainer from "./components/landing/landingContainer";
import Header from "./components/header/header";
import LoginContainer from "./components/login/loginContainer";
import RoomsContainer from "./components/rooms/roomsContainer";
import RoomContainer from "./components/singleRoom/roomContainer";
import PrivateRoute from "./components/routes/privateroute";
import AdminRoute from "./components/routes/adminroute";
import Admin from "./components/admin/admin";
import { useEffect } from "react";
import { connect } from "react-redux";
import { authUser } from "./data/actions/auth";

const isAdmin = true;
function App(props) {
  const { authUser } = props;
  useEffect(() => {
    authUser();
  }, [authUser]);

  return props.isLoggedIn !== null ? (
    <BrowserRouter>
      <Header user={props.user} />
      <Route exact path="/login" component={LoginContainer} />
      <PrivateRoute
        exact
        path="/"
        component={LandingContainer}
        isLoggedIn={props.isLoggedIn}
      />
      <PrivateRoute
        exact
        path="/rooms"
        component={RoomsContainer}
        isLoggedIn={props.isLoggedIn}
      />
      <PrivateRoute
        exact
        path="/rooms/:id"
        component={RoomContainer}
        isLoggedIn={props.isLoggedIn}
      />
      <AdminRoute exact path="/admin" component={Admin} isAdmin={isAdmin} />
    </BrowserRouter>
  ) : (
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
