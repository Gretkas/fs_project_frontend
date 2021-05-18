import './adminUserListElement.css';

function AdminUserListElement(props) {
    return (
        <div>
            <p>{props.user.userName}</p>
            <p>{props.user.role}</p>
        </div>
    );
}

export default AdminUserListElement;