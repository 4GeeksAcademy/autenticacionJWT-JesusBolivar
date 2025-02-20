import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";



export const Navbar = () => {
	const { store, actions } = useContext(Context)
	return (
		<nav className="navbar navbar-dark bg-ligth">
			<div className="container">
				<Link className="name" to="/">
					<span>JWT</span>
				</Link>
				<div className="d-flex ">
						
					{!store.token ?
						<Link to="/login">
							<button className="btn boton bg'info me-2">Login</button>
						</Link> :
						<Link to="/">
							<button onClick={() => actions.close()} className="btn boton bg-danger">Logout</button>
						</Link>
					}
				</div>
			</div>
		</nav>
	);
};