import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');

  // Konfigurasi axios untuk mengizinkan credentials
  axios.defaults.withCredentials = true;

  // Fetch status authentication
  useEffect(() => {
    axios
      .get('http://localhost:8082')
      .then((res) => {
        if (res.data.Status === 'Success') {
          setAuth(true);
          setName(res.data.name);
        } else {
          setAuth(false);
          setMessage(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // Handle logout
  const handleDelete = () => {
    axios
      .get('http://localhost:8082/logout')
      .then(() => {
        location.reload(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mt-4">
      {auth ? (
        <div>
          <h3>You are authorized -- {name}</h3>
          <button className="btn btn-danger" onClick={handleDelete}>
            Logout
          </button>
        </div>
      ) : (
        <div>
          <h3>{message}</h3>
          <h3>Login now</h3>
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        </div>
      )}
    </div>
  );
}

export default Home;
