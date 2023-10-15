import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserService from '../services/UserService';
import '../styles.css';
import HeaderComponent from './Header';

function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        UserService.getUsers()
            .then((res) => {
                setUsers(res.data);
            })
            .catch((error) => console.error('Error fetching users: ', error));
    }, []);

    const deleteUser = (id) => {
        UserService.deleteUser(id)
            .then(() => {
                setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
            })
            .catch((error) => console.error('Error deleting user: ', error));
    };

    return (
        <div>
            <br />
            <h2 className="text-center digistyle">User List</h2>
            <div className="row">
                <Link to="/usersadmin" className="btn btn-primary">
                    Add User
                </Link>
            </div>
            <br />
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Link
                                        to={`/edit-user/${user.id}`}
                                        className="btn btn-info "
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        style={{ marginLeft: '10px' }}
                                        onClick={() => deleteUser(user.id)}
                                        className="btn btn-info delete-button"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserList;
