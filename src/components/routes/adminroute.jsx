import React from "react";
import { Route, Redirect } from "react-router-dom";

const AdminRoute = ({ component: Component, isAdmin, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAdmin) {
          return <Redirect to="/login" />;
        }
        return <Component {...props} {...rest} />;
      }}
    />
  );
};

export default AdminRoute;
