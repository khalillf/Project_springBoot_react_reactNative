import React, { useState, useEffect } from 'react';
import UserService from '../services/UserService';
import { useParams, Link } from 'react-router-dom';

function EditUserNormal(props) {
  const { id: initialId } = useParams();

  const [id, setId] = useState(initialId);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [num, setNum] = useState('');

  useEffect(() => {
        const storedId = localStorage.getItem('id');

        setId(storedId);

    UserService.getUserById(storedId)
      .then((res) => {
        const userData = res.data;
        setUsername(userData.username);
        setPassword(userData.password);
        setEmail(userData.email);
        setNum(userData.num);
      })
      .catch((error) => console.error('Error fetching user: ', error));
  }, []); 
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'username') setUsername(value);
    else if (name === 'password') setPassword(value);
    else if (name === 'email') setEmail(value);
    else if (name === 'num') setNum(value);
  };

  const updateUser = () => {
    const updatedUser = {
      id,
      username,
      password,
      email,
      num,
    };

    UserService.updateUser(updatedUser, id)
      .then(() => {
        props.navigateToUsers();
      })
      .catch((error) => console.error('Error updating user: ', error));
  };

  return (
    <div>
      <br />
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3">
            <h3 className="text-center">Edit User</h3>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label>ID:</label>
                  <input
                    type="text"
                    name="id"
                    className="form-control"
                    value={id}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label>Username:</label>
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    value={username}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={password}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Num:</label>
                  <input
                    type="text"
                    name="num"
                    className="form-control"
                    value={num}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="d-flex justify-content-between">
                  <Link to="/users">
                    <button className="btn btn-success" onClick={updateUser}>
                      Update
                    </button>
                  </Link>
                  <Link to="/users">
                    <button className="btn btn-danger">Cancel</button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditUserNormal;
