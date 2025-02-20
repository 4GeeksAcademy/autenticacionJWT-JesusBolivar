import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/register.css"

const initialContact = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: ""
}

export const Register = () => {
    const { store, actions } = useContext(Context);
    const [contact, setContact] = useState(initialContact);
    const [save, setSave] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate()

    const handleChange = (evt) => {
        setContact({
            ...contact,
            [evt.target.name]: evt.target.value
        });
    }

    const newContact = async (event) => {
        event.preventDefault()
        if (!contact.firstName || !contact.lastName || !contact.username || !contact.email || !contact.password) {
            setError('Todos los campos son obligatorios');
            return;
        }

        const result = await actions.saveContact(contact);
        if (result == 201) {
            setSave(true);
            navigate("/login")
            setTimeout(() => {
                setSave(false);
            }, 2000);
        } else if (result == 400) {
            alert("Error de credenciales")
        }
    }

    return (
        <div className="container d-flex flex-column pt-5">
            <h1 className="fs-1 text-center">New user</h1>
            <form className="form w-50 align-self-center p-2 my-3" onSubmit={newContact}>
                <div className="mb-3">
                    <label htmlFor="inputFirstName" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        value={contact.firstName}
                        id="inputFirstName"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputLastName" className="form-label">Last name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        value={contact.lastName}
                        id="inputLastName"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputUsername" className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        name="username"
                        value={contact.username}
                        id="inputUsername"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputEmail" className="form-label">E-mail</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={contact.email}
                        id="inputEmail"
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
                        value={contact.password}
                        id="inputPassword"
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="btn boton bg-info w-100">Register</button>
                {save && <div className="alert alert-success mt-3" role="alert">
                    user added successfully
                </div>}
            </form>

            {error && <div className="alert alert-danger w-50 align-self-center" role="alert">{error}</div>}

            <div className="w-50 d-flex flex-column align-self-center">
                <Link to="/">
                    <button className="btn btn-danger">Back</button>
                </Link>
            </div>
        </div>
    );
};

