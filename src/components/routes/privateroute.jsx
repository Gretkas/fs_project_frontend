//fra sys2 prosjekt
import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isLoggedIn) {
          console.log(isLoggedIn)
          return <Redirect to="/login" />;
        }
        return <Component {...props} {...rest} />;
      }}
    />
  );
};

export default PrivateRoute;
