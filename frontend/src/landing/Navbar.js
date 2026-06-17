import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg sticky-top" style={{ backgroundColor: "#fff", minHeight: "64px" }}>
            <div className="container">
                <Link className="navbar-brand" to={"/"}>
                    <img src='media/images/logo.svg' alt='Zerodha' />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarScroll"
                    aria-controls="navbarScroll"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarScroll">
                    <ul className="navbar-nav ms-auto my-2 my-lg-0 align-items-lg-center">
                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/signup"}>Signup</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/about"}>About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/products"}>Products</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/pricing"}>Pricing</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/support"}>Support</NavLink>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/"}><i className="fa-solid fa-bars"></i></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
