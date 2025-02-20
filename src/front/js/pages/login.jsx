import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/login.css";

export const Login = () => {
    const { store, actions } = useContext(Context);
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [error, setError] = useState('');
    const [loggedIn, setLoggedIn] = useState();
    const navigate = useNavigate();

    const handleChange = (evt) => {
        setCredentials({
            ...credentials,
            [evt.target.name]: evt.target.value
        });
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        if (!credentials.username || !credentials.password) {
            setError('Ambos campos son obligatorios');
            return;
        }

        try {
            const result = await actions.login(credentials);
            if (result == 200) {
                navigate("/private");
                setLoggedIn(true);
                setTimeout(() => {
                    setLoggedIn(false);
                }, 2000);
            } else if (result == 401) {
                setError('Credenciales incorrectas. Inténtalo de nuevo.');
            } else if (result == 404) {
                setError('Usuario no registrado');
            } else {
                setError('Error en el servidor, intente más tarde');
            }
        } catch (error) {
            setError('Error en la conexión con el servidor');
        }
    };

    return (
        <div className="container d-flex flex-column traslate">
            <h1 className="fs-1 text-center">Login</h1>
            <form className="form w-50 align-self-center p-2 my-3" onSubmit={handleLogin}>
                <div className="mb-3">
                    <label htmlFor="inputUsername" className="form-label">Username</label>
                    <input
                        type="username"
                        className="form-control"
                        name="username"
                        value={credentials.username}
                        id="inputUsername"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputPassword" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={credentials.password}
                        id="inputPassword"
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="btn boton1 w-100">login</button>
                {loggedIn && <div className="alert alert-success mt-3" role="alert">
                    login success
                </div>}
            </form>

            {error && <div className="alert alert-danger w-50 align-self-center lign-bottom" role="alert">{error}</div>}

            <div className="w-50 d-flex justify-content-between align-items-center align-self-center">
                <Link className="ps-1" to="/">
                    <button className="btn btn-danger">Back</button>
                </Link>
               
            </div>
            <div className="w-50 d-flex justify-content-center align-self-center mt-4">
                <p>You don't have an account? <Link to="/register">Register</Link></p>
            </div>
        </div>
    );
};