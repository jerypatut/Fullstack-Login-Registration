import React, { useState } from "react";
import './index.css';
import googleGif from './assets/google-gif.gif'; // Gambar Google Gif
import logo from './assets/loogo-01.png'; // Gambar logo
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import 'react-phone-input-2/lib/style.css';

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8082/login', values)
            .then((res) => {
                if (res.data.Status === "Success") {
                    navigate('/');
                } else {
                    alert(`Error: ${res.data.Error}`);
                }
            })
            .catch((err) => console.log(err));
    };

    // Google Sign-in logic
    const googleLogin = () => {
        const redirectUri = "http://localhost:8082/auth/google/callback";
        window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=token&scope=email`;
    };

    return (
        <div className="main-container">
            <img src={logo} alt="Logo" />
            <h2>Welcome Back! - Login Now</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        onChange={(e) =>
                            setValues({ ...values, email: e.target.value })
                        }
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        onChange={(e) =>
                            setValues({ ...values, password: e.target.value })
                        }
                        required
                    />
                    <div className="forgot-password">
                        <Link to="resetpassword">Lupa Password?</Link>
                    </div>
                </div>
                <button type="submit" className="login-btn">
                    Login
                </button>
            </form>

            <div className="google-login" onClick={googleLogin}>
                <img src={googleGif} alt="Google Logo" />
                <span>Masuk dengan Google</span>
            </div>

            <div className="footer-text">
                Belum punya akun? <Link to="/register">Daftar disini</Link>
            </div>

            <footer>
                Welcome to MatchupSkills | Copyright &copy; 2024 MatchupSkills
            </footer>
        </div>
    );
}

export default Login;