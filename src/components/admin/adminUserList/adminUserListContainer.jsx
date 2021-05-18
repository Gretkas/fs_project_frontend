import AdminUserList from "./adminUserList";
import { connect } from "react-redux";
import { getUsers } from "../../../data/actions/users";
import { withRouter } from 'react-router';
import React, { useEffect } from "react";

function AdminUserListContainer(props) {
  useEffect(() => {
    props.getUsers()    
  }, []) 

  return (
    <div className="landingContainer">
      <AdminUserList users={props.users}/>
    </div>
  );
}

const mapStateToProps = (state) => ({
  users: state.users.users
});

// const mapDispatchToProps = (dispatch) => ({ getCourses });



export default withRouter(connect(mapStateToProps, { getUsers }, null, {
  forwardRef: true,
})(AdminUserListContainer));
