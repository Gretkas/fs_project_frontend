import AdminUserList from "./adminUserList";
import { connect } from "react-redux";
import { getUsers, deleteUser } from "../../../data/actions/users";
import { withRouter } from 'react-router';
import React, { useEffect } from "react";

function AdminUserListContainer(props) {
  const {getUsers} = props
  useEffect(() => {
    getUsers()    
  }, [getUsers]) 

  return (
    <div className="landingContainer">
      <AdminUserList users={props.users} deleteUser={props.deleteUser}/>
    </div>
  );
}

const mapStateToProps = (state) => ({
  users: state.users.users
});

// const mapDispatchToProps = (dispatch) => ({ getCourses });



export default withRouter(connect(mapStateToProps, { getUsers, deleteUser }, null, {
  forwardRef: true,
})(AdminUserListContainer));
