import React, { useState } from 'react';
import UserService from '../services/UserService';
import Popup from '../Popup'; 
import HeaderComponent from './Header';
import '../css/AddUser.css'; 

import { Link } from 'react-router-dom'; 

function AddUserAdmin(props) {
    const [user, setUser] = useState({
        username: '',
        password: '',
        email: '',
        num: '',
        isadmin: 'false',
        isPopupVisible: false,
        popupMessage: '',
    });

    const changeUsernameHandler = (event) => {
        setUser({ ...user, username: event.target.value });
    };

    const changePasswordHandler = (event) => {
        setUser({ ...user, password: event.target.value });
    };

    const changeEmailHandler = (event) => {
        setUser({ ...user, email: event.target.value });
    };

    const changeNumHandler = (event) => {
        setUser({ ...user, num: event.target.value });
    };

    const changeIsadminHandler = (event) => {
        setUser({ ...user, isadmin: event.target.value });
    };

    const saveUser = (e) => {
        e.preventDefault();
        fetch('http://localhost:8080/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
        .then((response) => {
            if (response.status === 201) {
                setUser({
                    ...user,
                    isPopupVisible: true,
                    popupMessage: 'User created successfully!',
                });
                props.history.push('/users');
            } else {
                response.json().then((errorResponse) => {
                    setUser({
                        ...user,
                        isPopupVisible: true,
                        popupMessage: 'User created successfully!',
                    });
                });                    
            }
        })
        .catch((error) => {
            console.error('Error creating user:', error);
            setUser({
                ...user,
                isPopupVisible: true,
                popupMessage: 'Failed to create user. Please try again later.',
            });
        });
    };

    const handlePopupClose = () => {
        setUser({
            ...user,
            isPopupVisible: false,
            popupMessage: '',
        });
        props.history.push('/users');
    };

    const handlePopupRetry = () => {
        setUser({
            ...user,
            isPopupVisible: false,
            popupMessage: '',
        });
    };

    const navigateToUsers = () => {
        if (props.history) {
          props.history.push('/users');
        } else {
          console.error('history is not available in props');
        }
    };

    return (
        <div>
            <br />
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h3 className="text-center">Add User</h3>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label>Username:</label>
                                    <input
                                        placeholder="Username"
                                        name="username"
                                        className="form-control"
                                        value={user.username}
                                        onChange={changeUsernameHandler}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password:</label>
                                    <input
                                        placeholder="Password"
                                        name="password"
                                        className="form-control"
                                        value={user.password}
                                        onChange={changePasswordHandler}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input
                                        placeholder="Email"
                                        name="email"
                                        className="form-control"
                                        value={user.email}
                                        onChange={changeEmailHandler}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Num:</label>
                                    <input
                                        placeholder="Num"
                                        name="num"
                                        className="form-control"
                                        value={user.num}
                                        onChange={changeNumHandler}
                                    />
                                </div>

                                <div className="form-group">
                                    <div className="form-group">
                                        <label>Admin:</label>
                                        <div style={{ display: 'flex' }}>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="isadmin"
                                                    value="true"
                                                    checked={user.isadmin === "true"}
                                                    onChange={changeIsadminHandler}
                                                />{" "}
                                                True
                                            </label>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="isadmin"
                                                    value="false"
                                                    checked={user.isadmin === "false"}
                                                    onChange={changeIsadminHandler}
                                                />{" "}
                                                False
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between">
                                    <button className="btn btn-success" onClick={saveUser}>
                                        Save
                                    </button>
                                    <Link to="/users">
                                        <button className="btn btn-danger" >Cancel</button>
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {user.isPopupVisible && (
                <div className="popup">
                    <div className="popup-content">
                        <p>{user.popupMessage}</p>
                        <Link to="/users">
                            <button >OK</button>
                        </Link>
                        <button onClick={handlePopupRetry}>Retry</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddUserAdmin;
