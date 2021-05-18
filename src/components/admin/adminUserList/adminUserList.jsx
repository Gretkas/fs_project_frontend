import './adminUserList.css';
import AdminUserListElement from './adminUserListElement'

function AdminUserList(props) {

    const renderUsers = () => {
        return props.users.map(user => {
            return <AdminUserListElement user={user}/>
        })
    }

    return (
        <div className="App">
            {renderUsers()}
        </div>
    );
}

export default AdminUserList;